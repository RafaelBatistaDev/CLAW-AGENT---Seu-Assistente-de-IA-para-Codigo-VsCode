# 📦 GUIA FINAL: COMPILAR E GERAR ARQUIVO VSIX

## 🎯 Objetivo

Gerar o arquivo `claw-agent-1.1.0.vsix` para publicar no VS Code Marketplace.

---

## ⚙️ Pré-requisitos

✅ **Node.js v20+** — [Baixar](https://nodejs.org/)  
✅ **npm v10+** — (Vem com Node.js)  
✅ **Projeto CLAW AGENT** — (/home/recifecrypto/Documentos/CLAW_VSCode_Extension)

---

## 🚀 3 Formas de Compilar

### **Método 1: Script Automático (MAIS FÁCIL)**

#### Linux/macOS:
```bash
cd /home/recifecrypto/Documentos/CLAW_VSCode_Extension
chmod +x build.sh
bash build.sh
```

#### Windows:
```bash
cd C:\Users\YourUser\CLAW_VSCode_Extension
build.bat
```

**⏱️ Tempo**: ~2-3 minutos (automático)  
**✅ Resultado**: `claw-agent-1.1.0.vsix` gerado

---

### **Método 2: Comandos Manualmente**

```bash
# 1. Ir para pasta do projeto
cd /home/recifecrypto/Documentos/CLAW_VSCode_Extension

# 2. Instalar dependências
npm install

# 3. Compilar TypeScript + Webpack
npm run compile:prod

# 4. Gerar VSIX
npm run package
```

**⏱️ Tempo**: ~3-5 minutos  
**✅ Resultado**: `claw-agent-1.1.0.vsix` gerado

---

### **Método 3: Passo-a-Passo com Verificação**

```bash
# 1. Entrar no diretório
cd /home/recifecrypto/Documentos/CLAW_VSCode_Extension

# 2. Verificar Node.js
node --version    # Deve ser v20+
npm --version     # Deve ser v10+

# 3. Instalar (se não tiver node_modules)
npm install
echo "✅ Dependências instaladas"

# 4. Compilar
npm run compile:prod
echo "✅ Compilação concluída"

# 5. Verificar se dist/ foi criado
ls -lh dist/extension.js
echo "✅ dist/extension.js criado"

# 6. Gerar VSIX
npm run package
echo "✅ VSIX gerado"

# 7. Verificar arquivo final
ls -lh claw-agent-1.1.0.vsix
echo "✅ Pronto para publicar!"
```

---

## 📦 Arquivo Gerado

Após compilar, você terá:

```
claw-agent-1.1.0.vsix
├─ Size: 1-2 MiB
├─ Format: ZIP (Archive)
├─ ExtensionId: RafaelBatista.claw-agent
└─ Status: ✅ Pronto para publicar
```

---

## 📍 Localização do Arquivo

```
/home/recifecrypto/Documentos/CLAW_VSCode_Extension/claw-agent-1.1.0.vsix
```

---

## 🌐 Publicar no VS Code Marketplace

### Passo 1: Criar Conta (uma única vez)

1. Ir para: https://marketplace.visualstudio.com/manage/publishers
2. Login com GitHub ou Microsoft Account
3. Criar novo Publisher: `RafaelBatista`

### Passo 2: Gerar Personal Access Token (PAT)

1. Ir para: https://dev.azure.com/RafaelBatista/_usersSettings/tokens
2. Criar novo token com:
   - ✅ Full scopes → Marketplace → Manage
   - Válido por: 30 dias (renovável)

### Passo 3: Publicar Versão

```bash
# Login com VSCE (primeira vez)
vsce login RafaelBatista
# Cole seu Personal Access Token

# Publicar
npm run publish
```

### Resultado

✅ Publicada em **10-15 minutos**  
✅ Disponível em: `marketplace.visualstudio.com/items?itemName=RafaelBatista.claw-agent`

---

## 🔍 Verificar VSIX (Opcional)

```bash
# Ver conteúdo do VSIX
unzip -l claw-agent-1.1.0.vsix | head -20

# Conferir tamanho
du -h claw-agent-1.1.0.vsix

# Instalar localmente para testar
code --install-extension claw-agent-1.1.0.vsix
```

---

## 🐛 Troubleshooting

### Erro: "npm: command not found"
→ Instale Node.js de https://nodejs.org/

### Erro: "dist/extension.js not found"
→ Rode: `npm run compile:prod` (necessário para build)

### Erro: "VSIX muito pequeno (<100KB)"
→ Rode: `npm run compile:prod` com webpack (importante!)

### Erro: Comando não encontrado (build.sh)
→ Rode: `chmod +x build.sh` antes de executar

---

## 📊 Checklist Final

Antes de publicar:

- [ ] Node.js v20+ instalado
- [ ] npm v10+ instalado
- [ ] `npm install` concluído
- [ ] `npm run compile:prod` sem erros
- [ ] `dist/extension.js` criado e > 100KB
- [ ] `claw-agent-1.1.0.vsix` gerado (1-2 MiB)
- [ ] VSIX não é vazio na validação

**Score**: 7/7 ✅ PRONTO PARA PUBLICAR

---

## 🎁 Próximas Ações

1. ✅ Ter Node.js v20+ instalado
2. ✅ Executar: `bash build.sh` (ou `build.bat` no Windows)
3. ✅ Verificar: `ls -lh claw-agent-1.1.0.vsix`
4. ✅ Publicar: `npm run publish` (com PAT)
5. ✅ Confirmar em Marketplace após 10-15 min

---

## 📞 Suporte

Dúvidas?  
Email: rafaelbatistadev@outlook.com.br

---

**Status**: ✅ PRONTO PARA COMPILAÇÃO E PUBLICAÇÃO

**Versão**: 1.1.0  
**Data**: 7 de abril de 2026
