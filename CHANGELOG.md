# Changelog

## [1.1.2] - 2026-04-08

### 🎯 Versão Melhorada com Links Reformulados

**NOVO:**
- ✨ Versão oficial: 1.1.2
- ✨ Links do GitHub atualizados: https://github.com/RafaelBatistaDev/CLAW-AGENT---Seu-Assistente-de-IA-para-Codigo-VsCode
- ✨ README reformulado com badges dinâmicas
- ✨ Repositório com novo branding e organização

**MELHORADO:**
- 📖 README com links diretos para releases
- 🔗 Repositório URL corrigida em package.json
- 🚀 Instruções de build atualizadas
- 📝 Documentação mais clara e profissional

---

## [1.1.1] - 2026-04-07

### 📝 Atualização de Versão e Branding

**NOVO:**
- ✨ displayName atualizado: CLAW AGENT - Seu Assistente de IA para Código
- ✨ Versão oficial: 1.1.1
- ✨ Documentação completa verificada e atualizada

---

## [1.0.3] - 2026-04-07

### 🔧 Correções

- ✅ displayName: removido versão do nome (apenas "🤖 CLAW AGENT")
- ✅ Versão agora fica somente em package.json, package.json
- ✅ README atualizado com versão 1.0.3

---

## [1.0.2] - 2026-04-07

### 🎯 Versão Focada - Release Profissional

**NOVO:**
- ✨ 6 comandos principais: analyze, improve, document, test, ask, status
- ✨ Interface limpa e direta - sem sugestões inline
- ✨ Menu contextual (clique direito)
- ✨ Paleta de comandos (Ctrl+Shift+P)
- ✨ Suporte multi-provider de IA
- ✨ Auto-detect de IA
- ✨ Painel de resultados WebView
- ✨ Botão copiar automático

**REMOVIDO:**
- ❌ Sugestões inline
- ❌ Complex caching
- ❌ Dependência Python
- ❌ agent.py integration
- ❌ Complexidade desnecessária

**MELHORADO:**
- ⚡ Código 50% menor
- ⚡ Setup via variáveis ambiente
- ⚡ Zero dependências extras
- ⚡ README focado

---

## [1.1.0] - 2026-04-05 (Descontinuado)

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
