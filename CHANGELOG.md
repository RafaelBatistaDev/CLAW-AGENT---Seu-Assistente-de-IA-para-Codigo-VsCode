# Changelog

## [1.1.0] - 2026-04-07

### ✨ Features
- **Inline Code Completion** — Sugestões de IA em tempo real enquanto você digita
- **Auto AI Detection** — Detecta automaticamente qual IA está disponível (Gemini, OpenAI, Claude, Ollama)
- **Smart Fallback** — Se uma IA falhar, tenta automaticamente a próxima
- **Multi-Language Support** — Suporta 10+ linguagens (Python, JS, TS, Rust, Go, C#, Java, etc)
- **Cache System** — Cache local para sugestões frequentes
- **Token Management** — Controle automático de tokens para economizar quota
- **Offline Support** — Funciona com Ollama/LocalAI sem internet

### 🎯 Commands
- `clawrafaelia.toggleSuggestions` — Ativar/desativar sugestões
- `clawrafaelia.clearCache` — Limpar cache local
- `clawrafaelia.showStatus` — Mostrar status e diagnóstico

### ⚙️ Configuration
- `clawrafaelia.enabled` — Ativar/desativar sugestões (padrão: true)
- `clawrafaelia.debounceMs` — Intervalo de disparo em ms (padrão: 500)
- `clawrafaelia.agentPythonPath` — Caminho para agent.py (padrão: ~/.local/bin/agent.py)
- `clawrafaelia.maxTokens` — Máximo de tokens por sugestão (padrão: 150)
- `clawrafaelia.enableLocalAI` — Usar LocalAI para tarefas simples (padrão: true)
- `clawrafaelia.logLevel` — Nível de logging (padrão: info)

### 🔐 Security
- ✅ Sem armazenamento de chaves API em repositório
- ✅ Cache local apenas (~/.claw/)
- ✅ Suporte a variáveis de ambiente
- ✅ MIT License — Uso comercial permitido

### 📚 Documentation
- README-MARKETPLACE.md — Para VS Code Marketplace
- README-GITHUB.md — Para GitHub (detalhado)
- README.md — Principal

### 🏗️ Architecture
- TypeScript 5.3+
- VS Code 1.85.0+
- Webpack 5 para bundling
- ESLint para code quality

### 🚀 Primeira Release
- Initial commit com funcionalidade completa
- Pronto para produção
- Código profissional de 2000+ linhas
- Testes e documentação inclusos

---

## Roadmap

### v1.2.0 (Planejado)
- [ ] Suporte a mais linguagens de programação
- [ ] Integração com GitHub Copilot
- [ ] Editor de prompts visual
- [ ] Histórico de sugestões

### v1.3.0 (Planejado)
- [ ] Integração com GitHub/GitLab
- [ ] Pull Request analyzers
- [ ] Métricas de código
- [ ] Dashboard de analytics

### v1.4.0 (Planejado)
- [ ] Web IDE support
- [ ] Cloud sync de configurações
- [ ] Marketplace de prompts
- [ ] API pública

---

## Versionamento

Este projeto segue [Semantic Versioning](https://semver.org/):
- MAJOR = mudanças incompatíveis
- MINOR = novas funcionalidades compatíveis
- PATCH = correções de bugs

---

## Como Contribuir

Veja [README-GITHUB.md](README-GITHUB.md) para instruções de contribuição.

---

## Links Úteis

- 🐛 [Reportar Bug](https://github.com/RafaelBatistaDev/CLAW_AGENT_EXTESION/issues)
- 💬 [Comunidade](https://github.com/RafaelBatistaDev/CLAW_AGENT_EXTESION/discussions)
- 📧 [Contato](mailto:rafaelbatistadev@outlook.com.br)

---

**v1.1.0** • **Production Ready** ✅ • **MIT License**
