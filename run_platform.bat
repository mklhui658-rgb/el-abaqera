@echo off
title Al-Abaqera Chemistry Platform
echo ===================================================
echo     Starting Al-Abaqera Chemistry Platform Server
echo ===================================================
echo Server starting on http://localhost:3000 ...
echo DO NOT CLOSE THIS WINDOW while using the platform!
echo ===================================================
start "" "http://localhost:3000/index.html"
python -m http.server 3000 --directory "%~dp0."
pause
