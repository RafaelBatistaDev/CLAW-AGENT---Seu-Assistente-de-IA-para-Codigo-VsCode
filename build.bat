@echo off
REM 📦 Script de Compilação VSIX para CLAW AGENT (Windows)
REM Uso: build.bat

setlocal enabledelayedexpansion

echo.
echo ═══════════════════════════════════════════════════════════
echo 🔨 CLAW AGENT v1.1.0 - Build Script (Windows)
echo ═══════════════════════════════════════════════════════════
echo.

REM Verificar Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERRO: Node.js não encontrado
    echo    Instale de: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js: %NODE_VERSION%

REM Verificar npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERRO: npm não encontrado
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm: %NPM_VERSION%

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 📥 Passo 1: Instalar Dependências
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

if exist "node_modules" (
    echo ⚠️  node_modules já existe, pulando instalação...
) else (
    echo ⏳ Instalando dependências (isto pode levar alguns minutos)...
    call npm install
    if errorlevel 1 (
        echo ❌ ERRO na instalação de dependências
        pause
        exit /b 1
    )
    echo ✅ Dependências instaladas
)

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🔨 Passo 2: Compilar TypeScript e Webpack
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

echo ⏳ Compilando (isto pode levar 30-60 segundos)...
call npm run compile:prod
if errorlevel 1 (
    echo ❌ ERRO na compilação
    pause
    exit /b 1
)

if exist "dist\extension.js" (
    echo ✅ Compilação concluída
    echo    Arquivo: dist\extension.js
) else (
    echo ❌ ERRO: dist\extension.js não foi criado
    pause
    exit /b 1
)

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 📦 Passo 3: Gerar Arquivo VSIX
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

echo ⏳ Criando pacote VSIX...
call npm run package
if errorlevel 1 (
    echo ❌ ERRO na geração do VSIX
    pause
    exit /b 1
)

for %%F in (claw-agent-*.vsix) do (
    set VSIX_FILE=%%F
)

if defined VSIX_FILE (
    echo ✅ VSIX criado com sucesso!
    echo    Arquivo: %VSIX_FILE%
) else (
    echo ❌ ERRO: VSIX não foi criado
    pause
    exit /b 1
)

echo.
echo ═══════════════════════════════════════════════════════════
echo ✅ BUILD CONCLUÍDO COM SUCESSO!
echo ═══════════════════════════════════════════════════════════
echo.
echo 📝 Próximos Passos:
echo.
echo   1. Para PUBLICAR no VS Code Marketplace:
echo      npm run publish
echo.
echo   2. Para INSTALAR localmente (para teste):
echo      code --install-extension %VSIX_FILE%
echo.
echo ═══════════════════════════════════════════════════════════
echo 🎉 Obrigado por usar CLAW AGENT!
echo 📧 Dúvidas? Contate: rafaelbatistadev@outlook.com.br
echo ═══════════════════════════════════════════════════════════
echo.

pause
