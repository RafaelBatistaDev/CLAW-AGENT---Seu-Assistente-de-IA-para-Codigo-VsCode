# CLAW AGENT - Seu Assistente de IA para Código

**Agente profissional de IA para análise, refatoração, documentação e testes automáticos**

> Versão focada: 6 comandos principais. Sem complexidade desnecessária. Puro profissionalismo.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Version: 1.1.1](https://img.shields.io/badge/Version-1.1.1-blue.svg)](.)
[![Status: Production Ready](https://img.shields.io/badge/Status-Production%20Ready-brightgreen.svg)](.)

---

## ⚡ Início Rápido (3 minutos)

```bash
# 1. Configurar IA (escolha UMA):

#    A) OpenAI (recomendado):
export OPENAI_API_KEY="sk-..."

#    B) Google Gemini (grátis):
export GOOGLE_API_KEY="AIzaSy..."

#    C) Ollama (100% local, grátis):
export OLLAMA_ENDPOINT="http://localhost:11434"

# 2. Abrir VS Code
# 3. Abrir qualquer arquivo de código
# 4. Usar: Clique direito → escolha ação OU Ctrl+Shift+P
```

---

## 📊 6 Comandos Principais

### 1️⃣ **ANALISAR** 🔍

Encontra bugs, problemas de segurança e ineficiências.

```
🔍 Clique direito no editor → "🔍 CLAW Agent: Analisar Código"
Ou: Ctrl+Shift+P → CLAW Agent: Analyze
```

**Detecta:**
- ✅ Bugs potenciais
- ✅ Problemas de segurança
- ✅ Ineficiências de performance
- ✅ Código smell

---

### 2️⃣ **MELHORAR** ✨

Refatora e otimiza código automaticamente.

```
✨ Clique direito no editor → "✨ CLAW Agent: Melhorar Código"
Ou: Ctrl+Shift+P → CLAW Agent: Improve
```

**Otimiza:**
- ✅ Algoritmos e performance
- ✅ Legibilidade
- ✅ Tratamento de erros
- ✅ Boas práticas

---

### 3️⃣ **DOCUMENTAR** 📚

Cria documentação profissional em Markdown.

```
📚 Clique direito no editor → "📚 CLAW Agent: Gerar Documentação"
Ou: Ctrl+Shift+P → CLAW Agent: Document
```

**Gera:**
- ✅ Descrições de funções/classes
- ✅ Parâmetros com tipos
- ✅ Exemplos de uso
- ✅ Exceções possíveis

---

### 4️⃣ **TESTAR** 🧪

Cria testes unitários completos.

```
🧪 Clique direito no editor → "🧪 CLAW Agent: Criar Testes"
Ou: Ctrl+Shift+P → CLAW Agent: Test
```

**Testes:**
- ✅ Cobertura completa
- ✅ Casos extremos
- ✅ Mocks automáticos
- ✅ Ready to use

---

### 5️⃣ **PERGUNTAR** ❓

Responde qualquer pergunta sobre código.

```
❓ Clique direito → "❓ CLAW Agent: Fazer Pergunta"
Ou: Ctrl+Shift+P → CLAW Agent: Ask Question
```

**Pode perguntar:**
- "Como otimizar este código?"
- "Qual é a melhor prática?"
- Qualquer coisa sobre código!

---

### 6️⃣ **STATUS** ℹ️

Verifica configuração e mostra ajuda.

```
ℹ️ Ctrl+Shift+P → "ℹ️ CLAW Agent: Status"
```

**Mostra:**
- ℹ️ IA Provider (OpenAI, Gemini, etc)
- ℹ️ Status da API Key
- ℹ️ Versão: 1.0.2
- ℹ️ Menu de comandos

---

## 🔧 Configuração Completa

### Passo 1: Instalar

**Opção A: VS Code Marketplace (em breve)**
```
Será publicada em breve no VS Code Marketplace
```

**Opção B: Compilar Localmente**
```bash
git clone https://github.com/claw-agent/vscode-extension
cd vscode-extension
npm install
npm run compile
npm run vscode:prepublish
```

### Passo 2: Configurar IA

**For Linux/macOS:**
```bash
# Temporário (sessão atual):
export OPENAI_API_KEY="sk-..."

# Permanente (~/.bashrc):
echo 'export OPENAI_API_KEY="sk-..."' >> ~/.bashrc
source ~/.bashrc
```

**For Windows:**
```cmd
setx OPENAI_API_KEY sk-...
# Depois reabra o terminal
```

### Passo 3: Testar

```bash
# No VS Code:
# Ctrl+Shift+P → CLAW Agent: Status

# Deve mostrar: ✅ Conexão com: OpenAI
```

---

## 🤖 Providers de IA

| Provider | Setup | Grátis | Recomendado |
|----------|-------|--------|--|
| **OpenAI** | `OPENAI_API_KEY=sk-...` | ❌ | ⭐⭐⭐⭐⭐ |
| **Google Gemini** | `GOOGLE_API_KEY=AIzaSy...` | ✅ Plano Free | ⭐⭐⭐⭐ |
| **Claude** | `ANTHROPIC_API_KEY=sk-ant-...` | ❌ | ⭐⭐⭐⭐ |
| **Ollama** | `OLLAMA_ENDPOINT=http://localhost:11434` | ✅ 100% | ⭐⭐⭐ |
| **LocalAI** | `LOCALAI_ENDPOINT=http://localhost:8080` | ✅ 100% | ⭐⭐ |

---

## 📚 Documentação Completa

| Documento | Para Quem |
|-----------|-----------|
| [BUILD_GUIDE.md](BUILD_GUIDE.md) | Como compilar a extensão |
| [CHANGELOG.md](CHANGELOG.md) | Histórico de versões |

---

## 🎯 Fluxo de Trabalho

**Workflow típico:**

1. Abra arquivo em VS Code
2. Clique direito no editor
3. Escolha ação (analyze, improve, document, test)
4. Aguarde resposta da IA
5. Veja resultado em painel lateral
6. Copie e cole no código

---

## 💡 Use Cases

### Code Review Automático
```
Analisar pull requests com CLAW Agent
Antes de merge: sempre executar "analyze"
```

### Documentação Seca
```
Código novo sem docs? 
Execute "document" e pronto!
```

### Cobertura de Testes
```
Novo módulo? Execute "test"
Testes já criados e prontos
```

### Refatoração
```
Código legado? Execute "improve"
Melhoria automática + explicações
```

### Aprendizado
```
Dúvida sobre código?
Execute "ask" com sua pergunta
```

---

## 🔐 Privacidade

✅ Nenhuma chave API no repositório  
✅ Secrets via variáveis de ambiente  
✅ Suporta uso 100% offline (Ollama)  
✅ MIT License — Uso comercial permitido  

---

## 📊 Linguagens Suportadas

✅ Python  
✅ JavaScript / TypeScript  
✅ C# / Java / C++  
✅ Go / Rust / Ruby  
✅ PHP / SQL  

---

## 🚀 Recursos

- ✅ **6 Comandos Profissionais** - Focado em produtividade
- ✅ **Multi-Provider** - OpenAI, Gemini, Claude, LocalAI, Ollama
- ✅ **Auto-Detect** - Detecta qual IA você tem configurada
- ✅ **Menu Contextual** - Clique direito = acesso rápido
- ✅ **Paleta de Comandos** - Ctrl+Shift+P = completo
- ✅ **Interface Clara** - Resultados em painel lateral
- ✅ **Zero Complexidade** - Versão 1.0.2: focada e simples

---

## 🐛 Troubleshooting

### "Nenhuma IA configurada"
```bash
# Verificar variável:
echo $OPENAI_API_KEY

# Configurar:
export OPENAI_API_KEY="sk-sua-chave"
source ~/.bashrc

# Testar:
# Ctrl+Shift+P → CLAW Agent: Status
```

### "Timeout esperando resposta"
- Verificar internet
- Tentar com Ollama (local)
- Usar arquivo menor para testar

### "API Key inválida"
- Verificar chave
- Gerar nova se necessário
- Testar em console provider

---

## 📱 Desenvolvimento

### Compilar

```bash
npm install
npm run watch        # Modo watch
npm run compile:prod # Build final
```

### Criar Extension (.vsix)

```bash
npm install -g vsce
vsce package

# Resultado: claw-agent-1.0.2.vsix
```

### Instalar Localmente

```bash
code --install-extension claw-agent-1.0.2.vsix
```

---

## 📈 Roadmap Futuro

- [ ] Integração com GitHub (PR comments)
- [ ] Upload para VS Code Marketplace
- [ ] Suporte a mais modelos locais
- [ ] Cache de respostas
- [ ] Histórico de análises
- [ ] Estatísticas de uso
- [ ] CLI standalone (não apenas VS Code)

---

## 📄 Licença

MIT © 2026 Rafael Batista

Você é livre para usar, modificar e distribuir. Veja [LICENSE](LICENSE)

---

## 🤝 Contribuir

Issues, PRs e feedback bem-vindos!

→ https://github.com/claw-agent/vscode-extension

---

## 📧 Contato

- **Email**: rafaelbatistadev@outlook.com.br
- **GitHub**: https://github.com/RafaelBatistaDev
- **Issues**: https://github.com/claw-agent/vscode-extension/issues

---

## 🎊 Stats

- **v1.0.2**: Release focada em profissionalismo
- **6 comandos**: Simples, poderoso eficiente
- **5 providers de IA**: Máxima compatibilidade
- **MIT License**: Uso comercial permitido

---

**Made with ❤️ for developers by Rafael Batista**
- **100% Python** puro

---

## 📞 Precisa de Ajuda?

- Instalar? → [SETUP.md](SETUP.md)
- Comandos? → [QUICKSTART.md](QUICKSTART.md)
- Arquivos? → [INSTALLATION_PATHS.md](INSTALLATION_PATHS.md)
- Problemas? → [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- Bug? → [Issues](https://github.com/claw-agent/vscode-extension/issues)

---

## 📜 License

MIT — Livre para uso pessoal, acadêmico e comercial!

---

**Feito com ❤️ para devs que amam código limpo.**

**v1.1.0** • **Production Ready** ✅ • **MIT License**
