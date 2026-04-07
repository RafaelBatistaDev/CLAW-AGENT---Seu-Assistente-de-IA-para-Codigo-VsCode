#!/bin/bash

# 📦 Script de Compilação VSIX para CLAW AGENT
# Uso: bash build.sh

set -e

echo "═══════════════════════════════════════════════════════════"
echo "🔨 CLAW AGENT v1.1.0 - Build Script"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ ERRO: Node.js não encontrado"
    echo "   Instale Node.js v20+ de: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version)
echo "✅ Node.js: $NODE_VERSION"

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo "❌ ERRO: npm não encontrado"
    echo "   Instale npm com: sudo apt install npm"
    exit 1
fi

NPM_VERSION=$(npm --version)
echo "✅ npm: $NPM_VERSION"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📥 Passo 1: Instalar Dependências"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -d "node_modules" ]; then
    echo "⚠️  node_modules já existe, pulando instalação..."
else
    echo "⏳ Instalando dependências (isto pode levar alguns minutos)..."
    npm install
    echo "✅ Dependências instaladas"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔨 Passo 2: Compilar TypeScript e Webpack"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo "⏳ Compilando (isto pode levar 30-60 segundos)..."
npm run compile:prod

if [ -f "dist/extension.js" ]; then
    DIST_SIZE=$(du -h dist/extension.js | cut -f1)
    echo "✅ Compilação concluída"
    echo "   Arquivo: dist/extension.js ($DIST_SIZE)"
else
    echo "❌ ERRO: dist/extension.js não foi criado"
    exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 Passo 3: Gerar Arquivo VSIX"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo "⏳ Criando pacote VSIX..."
npm run package

if ls claw-agent-*.vsix 1> /dev/null 2>&1; then
    VSIX_FILE=$(ls -lt claw-agent-*.vsix | head -1 | awk '{print $NF}')
    VSIX_SIZE=$(du -h "$VSIX_FILE" | cut -f1)
    echo "✅ VSIX criado com sucesso!"
    echo "   Arquivo: $VSIX_FILE ($VSIX_SIZE)"
else
    echo "❌ ERRO: VSIX não foi criado"
    exit 1
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "✅ BUILD CONCLUÍDO COM SUCESSO!"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "📝 Próximos Passos:"
echo ""
echo "  1. Verificar VSIX:"
echo "     unzip -l $VSIX_FILE | head -20"
echo ""
echo "  2. Para PUBLICAR no VS Code Marketplace:"
echo "     npm run publish"
echo ""
echo "     Ou com VSCE diretamente:"
echo "     vsce publish -p <seu-token>"
echo ""
echo "  3. Para INSTALAR localmente (para teste):"
echo "     code --install-extension $VSIX_FILE"
echo ""
echo "═══════════════════════════════════════════════════════════"
echo "🎉 Obrigado por usar CLAW AGENT!"
echo "📧 Dúvidas? Contate: rafaelbatistadev@outlook.com.br"
echo "═══════════════════════════════════════════════════════════"
