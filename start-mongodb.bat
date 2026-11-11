@echo off
title ApexCare - MongoDB Service
echo ================================================
echo Starting Local MongoDB Database Server...
echo Database Path: %~dp0mongodb-data
echo Port: 27017
echo ================================================

if not exist "%~dp0mongodb-data" (
    mkdir "%~dp0mongodb-data"
)

REM Check default MongoDB 8.0 installation path
if exist "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" (
    "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath "%~dp0mongodb-data" --bind_ip 127.0.0.1 --port 27017
) else (
    REM Fallback to mongod in PATH
    mongod --dbpath "%~dp0mongodb-data" --bind_ip 127.0.0.1 --port 27017
)

pause

