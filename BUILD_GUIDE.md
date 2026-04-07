# 📦 Guia Completo de Build e Publicação VSIX

## Estado Atual do Projeto

✅ **Todos os arquivos necessários estão prontos para compilação**

```
CLAW_Agent_v1.1.0/
├── src/                          # Código TypeScript
│   ├── extension.ts              # Entry point da extensão
│   ├── agentManager.ts           # Gerenciamento de IA
│   ├── aiProbe.ts                # Detecção de APIs
│   ├── aiSelector.ts             # Seleção inteligente
│   ├── inlineCompletionProvider.ts  # Sugestões
│   ├── pathResolver.ts           # Resolução de caminhos
│   ├── smartFallback.ts          # Fallback automático
│   ├── tokenCache.ts             # Cache de tokens
│   └── logger.ts                 # Logging
├── package.json                  # Manifest + deps (✅ Correto)
├── package-lock.json             # Lock file (✅ Presente)
├── tsconfig.json                 # Config TypeScript (✅ Correto)
├── webpack.config.js             # Bundler config (✅ Correto)
├── .eslintrc.json                # Linter config (✅ Presente)
├── icon.png                      # Ícone da extensão (✅ 1.25 MiB)
├── LICENSE                       # MIT License (✅ Presente)
├── README.md                     # README principal (✅ Presente)
├── README-GITHUB.md              # README GitHub (✅ Presente)
├── README-MARKETPLACE.md         # README Marketplace (✅ Presente)
├── CHANGELOG.md                  # Histórico (✅ Criado)
└── .gitignore                    # Git ignore (✅ Presente)
```

---

## 🔍 Verificação da Configuração

### ✅ package.json - Validado

```json
{
  "name": "claw-agent",
  "displayName": "CLAW AGENT",
  "version": "1.1.0",
  "publisher": "RafaelBatista",
  "icon": "icon.png",
  "repository": {
    "type": "git",
    "url": "https://github.com/RafaelBatistaDev/CLAW_AGENT_EXTESION"
  },
  "engines": {
    "vscode": "^1.85.0"
  },
  "main": "./dist/extension.js",
  "scripts": {
    "vscode:prepublish": "npm run compile:prod",
    "compile": "tsc -p ./",
    "compile:prod": "tsc -p ./ && webpack --config webpack.config.js",
    "package": "vsce package --no-update-package-json",
    "publish": "vsce publish"
  }
}
```

**Status**: ✅ CORRETO

### ✅ Dependências

**DevDependencies**:
- typescript: ^5.3.3
- @types/vscode: ^1.85.0
- webpack: ^5.89.0
- vsce: ^2.15.0

**Dependencies**:
- axios: ^1.6.2

**Status**: ✅ CORRETO

---

## 🛠️ Instruções de Compilação

### Pré-requisitos

```bash
# Instalar Node.js 20+ ou superior
node --version  # Deve ser >= v20.0.0

# Instalar npm 10+ ou superior
npm --version   # Deve ser >= 10.0.0
```

### Passo 1: Instalar Dependências

```bash
cd /home/recifecrypto/Documentos/CLAW_VSCode_Extension

# Instalar todas as dependências
npm install
```

**Tempo esperado**: 2-3 minutos
**Espaço necessário**: ~500 MB

### Passo 2: Compilar TypeScript

```bash
# Compilar TypeScript para JavaScript
npm run compile

# Ou para produção (com webpack):
npm run compile:prod
```

**Saída esperada**:
```
✓ Compilação concluída
✓ Arquivos gerados em ./dist/
```

**Tempo esperado**: 30–60 segundos

### Passo 3: Verificar Build

```bash
# Verificar se dist/extension.js foi gerado
ls -lh dist/extension.js

# Saída esperada:
# -rw-r--r-- 1 user group XXX dist/extension.js
```

### Passo 4: Gerar Arquivo VSIX

```bash
# Criar arquivo .vsix para publicação
npm run package

# Saída esperada:
# claw-agent-1.1.0.vsix gerado
```

**Arquivo gerado**: `claw-agent-1.1.0.vsix`
**Tamanho estimado**: 1-2 MiB
**Tempo esperado**: 15–30 segundos

### Passo 5: Verificar VSIX

```bash
# Listar arquivo gerado
ls -lh *.vsix

# Unzip para validar conteúdo (opcional)
unzip -l claw-agent-1.1.0.vsix | head -20
```

---

## 📋 Checklist Completo

Antes de publicar, verificar:

- [ ] Node.js v20+ instalado (`node --version`)
- [ ] npm instalado (`npm --version`)
- [ ] Todos os arquivos presentes (20 arquivos)
- [ ] `package.json` correto com v1.1.0
- [ ] `dist/` gerado após compile
- [ ] `claw-agent-1.1.0.vsix` gerado
- [ ] Arquivo VSIX > 900 KiB
- [ ] `CHANGELOG.md` presente
- [ ] `icon.png` presente e válido
- [ ] Licença MIT presente

---

## 🚀 Publicação no VS Code Marketplace

### Setup Inicial (Uma única vez)

1. **Criar Conta ou Login**
   - Ir para: https://marketplace.visualstudio.com/
   - Sign in com GitHub ou Microsoft Account

2. **Criar Personal Access Token (PAT)**
   ```bash
   # No terminal ou VS Code:
   vsce login RafaelBatista
   
   # Ou manualmente ir para:
   # https://dev.azure.com/RafaelBatista/_usersSettings/tokens
   ```

3. **Gerar PAT com Permissões**
   - Full scopes → Marketplace → Manage

### Publicar Versão

```bash
# Verificar se está logado
vsce ls-publishers

# Publicar extensão
npm run publish

# Ou manualmente:
vsce publish
```

**Primeira publicação**: Leva ~10 minutos para aparecer no Marketplace

---

## 📝 Versionamento

### Versão Atual
- **v1.1.0** — Production Ready

### Próximas Versões

Para lançar v1.2.0:

```bash
# 1. Atualizar package.json
# "version": "1.2.0"

# 2. Atualizar CHANGELOG.md
# Adicionar seção [1.2.0]

# 3. Compilar
npm run compile:prod

# 4. Gerar VSIX
npm run package

# 5. Publicate
npm run publish
```

---

## 🐛 Troubleshooting

### Erro: "npm: comando não encontrado"

```bash
# Solução: Instalar Node.js
# Ubuntu/Debian:
sudo apt update && sudo apt install -y nodejs npm

# macOS (com Homebrew):
brew install node

# Windows: Baixar de https://nodejs.org/
```

### Erro: "tsc: comando não encontrado"

```bash
# Solução: TypeScript não está no PATH
# Usar versão local:
npx tsc -p ./
```

### Erro: "vsce: comando não encontrado"

```bash
# Solução: VSCE não instalado
npm install -g vsce

# Ou usar localmente:
npx vsce package
```

### Erro: "Extension not valid (icon.png)"

```bash
# Solução: Ícone com formato errado
# Verificar:
- Formato: PNG (✅ Correto)
- Dimensões: 128x128 ou 256x256px
- Tamanho: < 32 MB
- Caminho: Exatamente "icon.png" em package.json
```

### VSIX gerado mas muito pequeno (<100 KiB)

```bash
# Solução: Provavelmente falta dist/
npm run compile:prod  # Compilar com webpack
npm run package       # Gerar VSIX novamente
```

---

## 📊 Comparação: Versão Esperada vs Atual

| Item | Esperado | Atual | Status |
|------|----------|-------|--------|
| Nome | CLAW AGENT | CLAW AGENT | ✅ |
| Versão | 1.1.0 | 1.1.0 | ✅ |
| Publisher | RafaelBatista | RafaelBatista | ✅ |
| Autor | Rafael Batista | Rafael Batista | ✅ |
| Icon | icon.png | icon.png | ✅ |
| VS Code | ^1.85.0 | ^1.85.0 | ✅ |
| Linguagem | TypeScript | TypeScript | ✅ |
| Build | Webpack 5 | Webpack 5 | ✅ |
| Arquivos | 20 | 20 | ✅ |
| CHANGELOG | Presente | Presente | ✅ |
| README | 3 arquivos | 3 arquivos | ✅ |
| Licença | MIT | MIT | ✅ |

---

## 📚 Recursos Adicionais

- 📖 [VS Code Extension API](https://code.visualstudio.com/api)
- 📦 [VSCE Documentation](https://github.com/microsoft/vscode-vsce)
- 🎯 [Marketplace Guidelines](https://code.visualstudio.com/api/references/extension-manifest)
- 🔐 [VS Code Publishing](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

---

## ✅ Próximos Passos

1. **Em Ambiente com Node.js**:
   ```bash
   npm install
   npm run compile:prod
   npm run package
   ```

2. **Verificar VSIX**:
   ```bash
   ls -lh claw-agent-1.1.0.vsix
   ```

3. **Publicar** (com conta no Marketplace):
   ```bash
   npm run publish
   ```

4. **Verificar Publicação**:
   ```
   https://marketplace.visualstudio.com/items?itemName=RafaelBatista.claw-agent
   ```

---

**Status**: ✅ PRONTO PARA COMPILAÇÃO E PUBLICAÇÃO

**Versão**: 1.1.0
**Data**: 7 de abril de 2026
**Autor**: Rafael Batista

Qualquer dúvida: rafaelbatistadev@outlook.com.br
