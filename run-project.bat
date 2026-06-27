@echo off
echo Starting Backend Server...
start "Techbaazar Backend" cmd /k "cd backend && npm.cmd run dev"

echo Starting Frontend Server...
start "Techbaazar Frontend" cmd /k "cd frontend && npm.cmd run dev"

echo Both servers are starting in separate windows!
pause
