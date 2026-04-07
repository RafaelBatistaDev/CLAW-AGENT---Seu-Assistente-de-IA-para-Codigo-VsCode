#!/bin/bash

# 🚀 COMPILAR CLAW AGENT v1.1.0 - SCRIPT COMPLETO
# Este script compilará e gerará o arquivo VSIX pronto para publicação
# 
# Pré-requisito: Node.js v20+ instalado
# Uso: bash compile.sh

set -e

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║          🔨 COMPILANDO CLAW AGENT v1.1.0                      ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ ERRO: Node.js não encontrado!"
    echo ""
    echo "Instale Node.js v20+ de: https://nodejs.org/"
    echo ""
    exit 1
fi

NODE_VERSION=$(node --version)
echo "✅ Node.js encontrado: $NODE_VERSION"


# Verificar npm
if ! command -v npm &> /dev/null; then
    echo "❌ ERRO: npm não encontrado!"
    echo ""
    echo "npm vem com Node.js. Reinstale de: https://nodejs.org/"
    echo ""
    exit 1
fi

NPM_VERSION=$(npm --version)
echo "✅ npm encontrado: $NPM_VERSION"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📥 PASSO 1: Instalar Dependências"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ -d "node_modules" ]; then
    echo "⚠️  node_modules já existe. Pulando instalação..."
else
    echo "⏳ Instalando dependências (2-3 minutos)..."
    npm install --legacy-peer-deps
    echo "✅ Dependências instaladas!"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔨 PASSO 2: Compilar TypeScript"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "⏳ Compilando TypeScript (30-60 segundos)..."
npm run compile:prod

if [ -f "dist/extension.js" ]; then
    DIST_SIZE=$(du -h dist/extension.js | cut -f1)
    echo "✅ TypeScript compilado com sucesso!"
    echo "   Arquivo: dist/extension.js ($DIST_SIZE)"
else
    echo "❌ ERRO: dist/extension.js não foi criado"
    exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 PASSO 3: Gerar Arquivo VSIX"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "⏳ Criando pacote VSIX (15-30 segundos)..."
npm run package

if ls claw-agent-*.vsix 1> /dev/null 2>&1; then
    VSIX_FILE=$(ls -lt claw-agent-*.vsix | head -1 | awk '{print $NF}')
    VSIX_SIZE=$(du -h "$VSIX_FILE" | cut -f1)
    VSIX_DATE=$(ls -lt "$VSIX_FILE" | head -1 | awk '{print $6, $7, $8}')
    echo "✅ VSIX CRIADO COM SUCESSO!"
    echo ""
    echo "📋 Informações do arquivo:"
    echo "   Nome: $VSIX_FILE"
    echo "   Tamanho: $VSIX_SIZE"
    echo "   Data: $VSIX_DATE"
else
    echo "❌ ERRO: VSIX não foi criado"
    exit 1
fi

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║  ✅ BUILD CONCLUÍDO COM SUCESSO!                              ║"
echo "║                                                                ║"
echo "║  🎉 Seu arquivo está pronto para publicar!                    ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

echo "📝 PRÓXIMAS AÇÕES:"
echo ""
echo "  1. Para PUBLICAR no VS Code Marketplace:"
echo "     npm run publish"
echo ""
echo "  2. Para TESTAR localmente:"
echo "     code --install-extension $VSIX_FILE"
echo ""
echo "  3. Para VER O ARQUIVO:"
echo "     ls -lh $VSIX_FILE"
echo ""
echo "  4. Para ENVIAR para alguém:"
echo "     Arquivo localizado em: $(pwd)/$VSIX_FILE"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📧 Dúvidas? Entre em contato:"
echo "   Email: rafaelbatistadev@outlook.com.br"
echo ""
echo "🚀 Status: PRONTO PARA PUBLICAÇÃO"
echo ""
