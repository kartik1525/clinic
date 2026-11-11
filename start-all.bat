@echo off
title ApexCare Clinic MVP Launcher
echo ==========================================================
echo    ApexCare Medical Clinic - Functional Demo Launcher
echo ==========================================================
echo.
echo [1/3] Ensuring Database is seeded and ready...
cd /d "%~dp0server"
call npm run seed

echo.
echo [2/3] Starting Express Backend Server (Port 5000)...
start "ApexCare Backend API" cmd /k "cd /d %~dp0server && npm run dev"

echo.
echo [3/3] Starting Vite Frontend App (Port 5173)...
start "ApexCare Frontend" cmd /k "cd /d %~dp0client && npm run dev"

echo.
echo ==========================================================
echo  All services started!
echo  Frontend UI:  http://localhost:5173
echo  Backend API:  http://localhost:5000
echo  Demo Admin:   http://localhost:5173/admin
echo ==========================================================
pause

