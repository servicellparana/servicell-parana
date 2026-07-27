@echo off
set "PATH=C:\Users\julian\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;C:\Users\julian\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback;%PATH%"
cd /d "%~dp0"
echo Servicell Parana
echo.
echo Abri esta direccion en tu navegador:
echo http://localhost:3000
echo.
pnpm dev
pause
