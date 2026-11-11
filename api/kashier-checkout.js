const crypto = require("crypto");

const DEFAULT_KASHIER_MERCHANT_ID = "MID-43119-740";
const DEFAULT_KASHIER_API_KEY = "ded74f2b-df3b-4a8e-92a4-3198ee0a18c7";
const DEFAULT_KASHIER_MODE = "test";

function formatKashierAmount(rawAmount) {
  const num = parseFloat(String(rawAmount || "0").replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(num) || num <= 0) return null;
  return num.toFixed(2);
}

function generateKashierOrderHash({ merchantId, orderId, amount, currency, apiKey }) {
  const path = `/?payment=${merchantId}.${orderId}.${amount}.${currency}`;
  return crypto.createHmac("sha256", apiKey).update(path).digest("hex");
}

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const merchantId = String(process.env.KASHIER_MERCHANT_ID || body.merchantId || DEFAULT_KASHIER_MERCHANT_ID).trim();
    const apiKey = String(process.env.KASHIER_API_KEY || body.apiKey || DEFAULT_KASHIER_API_KEY).trim();
    const secretKey = String(process.env.KASHIER_SECRET_KEY || body.secretKey || "").trim();
    const mode = String(process.env.KASHIER_MODE || body.mode || DEFAULT_KASHIER_MODE).trim().toLowerCase() === "live" ? "live" : "test";
    const currency = String(body.currency || "EGP").trim().toUpperCase();
    const orderId = String(body.orderId || `ABQ-${Date.now()}`).trim();
    const amount = formatKashierAmount(body.amount);
    const merchantRedirect = String(body.merchantRedirect || "").trim();
    const courseTitle = String(body.courseTitle || "كورس الكيمياء - منصة العباقرة").trim();
    const customerName = String(body.customerName || "طالب منصة العباقرة").trim();
    const customerPhone = String(body.customerPhone || "").trim();
    const customerEmail = String(body.customerEmail || "").trim();

    if (!merchantId) {
      return res.status(400).json({
        success: false,
        code: "MISSING_MERCHANT_ID",
        error: "Kashier Merchant ID (MID-...) is not configured. Please add it in Admin Settings or KASHIER_MERCHANT_ID env var."
      });
    }

    if (!apiKey) {
      return res.status(400).json({
        success: false,
        code: "MISSING_API_KEY",
        error: "Kashier Payment API Key is missing."
      });
    }

    if (!amount) {
      return res.status(400).json({
        success: false,
        code: "INVALID_AMOUNT",
        error: "Invalid payment amount."
      });
    }

    if (!merchantRedirect) {
      return res.status(400).json({
        success: false,
        code: "MISSING_REDIRECT",
        error: "Missing merchantRedirect URL."
      });
    }

    // Optional: Kashier v3 Payment Sessions API when Secret Key is provided
    if (secretKey) {
      try {
        const apiBase = mode === "live" ? "https://api.kashier.io" : "https://test-api.kashier.io";
        const sessionRes = await fetch(`${apiBase}/v3/payment/sessions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": secretKey,
            "api-key": apiKey
          },
          body: JSON.stringify({
            paymentType: "credit",
            amount,
            currency,
            order: orderId,
            merchantId,
            merchantRedirect,
            display: "ar",
            allowedMethods: "card,wallet,bank_installments",
            metaData: {
              courseTitle,
              customerName,
              customerPhone,
              customerEmail
            }
          })
        });

        const sessionData = await sessionRes.json().catch(() => ({}));
        const sessionUrl = sessionData.sessionUrl || (sessionData.data && sessionData.data.sessionUrl);
        if (sessionRes.ok && sessionUrl) {
          return res.status(200).json({
            success: true,
            via: "v3_session",
            checkoutUrl: sessionUrl,
            orderId,
            amount,
            currency,
            mode
          });
        }
      } catch (sessionErr) {
        console.warn("Kashier v3 session fallback to HPP:", sessionErr.message);
      }
    }

    // Standard Kashier Hosted Payment Page (HPP) with HMAC-SHA256 order hash
    const hash = generateKashierOrderHash({ merchantId, orderId, amount, currency, apiKey });
    const params = new URLSearchParams({
      merchantId,
      orderId,
      amount,
      currency,
      hash,
      mode,
      merchantRedirect,
      allowedMethods: "card,wallet,bank_installments",
      defaultMethod: "card",
      display: "ar",
      metaData: JSON.stringify({ courseTitle, customerName, customerPhone })
    });

    const checkoutUrl = `https://checkout.kashier.io/?${params.toString()}`;
    return res.status(200).json({
      success: true,
      via: "hpp",
      checkoutUrl,
      orderId,
      amount,
      currency,
      mode
    });
  } catch (err) {
    console.error("Kashier checkout error:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Internal Kashier checkout initialization error"
    });
  }
};
