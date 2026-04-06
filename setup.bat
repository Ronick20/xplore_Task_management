@echo off
REM Task Management System - Setup Script for Windows
REM This script helps with initial setup

echo ================================
echo Task Management System Setup
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] Node.js is not installed. Please install Node.js first.
    echo     Visit: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js found: %NODE_VERSION%
echo.

REM Navigate to backend
echo [*] Setting up Backend...
cd backend

REM Check if .env exists
if not exist .env (
    echo [!] .env file not found in backend directory
    echo     Please ensure .env exists with MongoDB connection details
)

REM Install backend dependencies
echo [*] Installing backend dependencies...
call npm install

if %ERRORLEVEL% EQU 0 (
    echo [OK] Backend dependencies installed
) else (
    echo [X] Failed to install backend dependencies
    pause
    exit /b 1
)

echo.

REM Navigate to frontend
cd ..\frontend

echo [*] Setting up Frontend...
echo [*] Installing frontend dependencies...
call npm install

if %ERRORLEVEL% EQU 0 (
    echo [OK] Frontend dependencies installed
) else (
    echo [X] Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo ================================
echo [OK] Setup Complete!
echo ================================
echo.
echo Next Steps:
echo 1. Start MongoDB
echo 2. In one terminal (backend): cd backend ^&^& npm start
echo 3. In another terminal (frontend): cd frontend ^&^& npm start
echo.
echo Admin Login:
echo   Email: admin@example.com
echo   Password: admin123
echo.
pause
