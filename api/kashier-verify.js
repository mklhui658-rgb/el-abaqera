const crypto = require("crypto");

const DEFAULT_KASHIER_API_KEY = "ded74f2b-df3b-4a8e-92a4-3198ee0a18c7";

function safeHexEqual(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(a, "utf8"), Buffer.from(b, "utf8"));
  } catch (e) {
    return false;
  }
}

function buildKashierCanonicalCandidates(rawQuery, paramsObj) {
  const candidates = [];

  if (rawQuery && typeof rawQuery === "string") {
    const clean = rawQuery.startsWith("?") ? rawQuery.slice(1) : rawQuery;
    const pairs = clean.split("&").filter(Boolean);
    const decodedParts = [];
    const rawParts = [];

    for (const pair of pairs) {
      const idx = pair.indexOf("=");
      if (idx === -1) continue;
      const rawKey = pair.slice(0, idx);
      const rawVal = pair.slice(idx + 1);
      const key = decodeURIComponent(rawKey);
      if (key === "signature" || key === "mode") continue;
      const decodedVal = decodeURIComponent(rawVal.replace(/\+/g, " "));
      decodedParts.push(`${key}=${decodedVal}`);
      rawParts.push(`${rawKey}=${rawVal}`);
    }

    if (decodedParts.length) candidates.push(decodedParts.join("&"));
    if (rawParts.length) candidates.push(rawParts.join("&"));
  }

  if (paramsObj && typeof paramsObj === "object") {
    const keys = Object.keys(paramsObj).filter(k => k !== "signature" && k !== "mode");
    if (keys.length) {
      candidates.push(keys.map(k => `${k}=${paramsObj[k]}`).join("&"));
      candidates.push([...keys].sort().map(k => `${k}=${paramsObj[k]}`).join("&"));
    }
  }

  return [...new Set(candidates)];
}

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ valid: false, error: "Method Not Allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const rawQuery = body.rawQuery || "";
    const params = body.params || {};
    const apiKey = String(process.env.KASHIER_API_KEY || body.apiKey || DEFAULT_KASHIER_API_KEY).trim();
    const receivedSignature = String(params.signature || "").trim().toLowerCase();

    if (!receivedSignature || !apiKey) {
      return res.status(400).json({
        valid: false,
        error: "Missing signature or API key"
      });
    }

    const candidates = buildKashierCanonicalCandidates(rawQuery, params);
    const valid = candidates.some(str => {
      const computed = crypto.createHmac("sha256", apiKey).update(str).digest("hex").toLowerCase();
      return safeHexEqual(computed, receivedSignature);
    });

    return res.status(200).json({
      valid,
      paymentStatus: params.paymentStatus || "",
      orderId: params.merchantOrderId || params.orderId || "",
      transactionId: params.transactionId || "",
      amount: params.amount || "",
      currency: params.currency || "EGP"
    });
  } catch (err) {
    console.error("Kashier verify error:", err);
    return res.status(500).json({
      valid: false,
      error: err.message || "Internal signature verification error"
    });
  }
};
