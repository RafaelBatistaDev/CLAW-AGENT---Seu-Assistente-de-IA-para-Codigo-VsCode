# Changelog

## [1.2.0] - 2026-07-28

### ✨ Melhorias Profissionais e Integração com VS Code Settings

**NOVO - Integração com Configurações do VS Code:**
- 🎛️ Provedores de IA agora configuráveis via Settings UI (`clawagent.*`)
- ⚙️ Suporte a `clawagent.autoFormat` para formatação automática
- 🔧 Modelos de IA podem ser selecionados nas configurações

**MELHORIAS - Modelos de IA Atualizados:**
- 🤖 OpenAI: `gpt-4o` e `gpt-4o-mini` como padrão
- 🤖 Gemini: `gemini-2.5-pro` como padrão
- 🤖 Claude: `claude-sonnet-5-20250515`, `claude-opus-5-20250515`, `claude-haiku-4-5-20251001`
- 🔒 Gemini: API Key agora enviada via header `x-goog-api-key` (mais seguro)
- ⏱️ Timeout e retries configuráveis

**MELHORIAS - Código:**
- 🛡️ Content-Security-Policy no painel WebView (previne XSS)
- 🔗 Mapeamento de menu mais robusto (label completo em vez de split)
- 🏗️ `getEditorContent()` - função extraída para evitar repetição
- 📦 `noUncheckedIndexedAccess` ativado no TS para mais segurança

**MELHORIAS - Infraestrutura:**
- 📦 TypeScript target atualizado para ES2022
- 🔧 Webpack config melhorada (ecma 2022, 2 passes de compressão)
- 🧹 `.gitignore` e `.vscodeignore` limpos (sem duplicatas)
- 🏷️ ESLint, Webpack e Terser nas devDependencies

**MELHORIAS - Documentação:**
- 📖 README reescrito profissionalmente (sem duplicações)
- 📖 Índice navegável e estrutura coesa
- 📖 CHANGELOG atualizado com todas as mudanças

---

## [1.1.3] - 2026-04-10

### 🌍 Compatibilidade Cross-Platform Completa (Windows, macOS, Linux)

**NOVO - Suporte Total a Múltiplas Plataformas:**

- ✅ **PathHelper** (`src/utils/pathHelper.ts`) - Utilidade para caminhos cross-platform
  - Normalização automática de caminhos para Windows, macOS, Linux
  - Detecção de SO e ajuste automático de comportamento
  - Detecção de linguagem de programação pela extensão do arquivo
  - Formatação de caminho para exibição legível

- ✅ **HTTPHelper** (`src/utils/httpHelper.ts`) - Requisições HTTP robustas
  - Timeout automático (30 segundos por padrão)
  - Retry inteligente em caso de falha
  - Tratamento de erro robusto com sugestões úteis
  - Sanitização de erros (remove informações sensíveis)
  - Validação de URL e API Key
  - User-Agent cross-platform
  - Teste de conectividade

**MELHORIAS - AgentManager v1.1.3:**

- 🔍 **Analyze** - Detecta linguagem e ajusta prompt
- ✨ **Improve** - Inclui framework de teste específico por linguagem
- 📚 **Document** - Gera documentação em Markdown profissional
- 🧪 **Test** - Mapeia framework de teste correto por linguagem
- ❓ **Ask** - Maior contexto e processamento robusto
- ℹ️ **Status** - Mostra informações do SO e compatibilidade

**MELHORIAS - Extension v1.1.3:**

- 🎨 Detecção automática do tema (light/dark) do VS Code
- 📱 Webview responsiva para qualquer resolução
- ⏱️ Timeout em requisições (nunca fica pendurado)
- 🔄 Retry automático em falhas de rede
- 📋 Melhor formatação de resultados no painel
- 🖥️ Suporte completo a Windows, macOS, Linux

**MELHORIAS - Documentation:**

- 📖 README com instruções específicas para Windows
- 📖 README com instruções para macOS/Linux
- 📖 Tabela de compatibilidade cross-platform
- 📖 Explicação de melhorias v1.1.3
- 📖 Badges de cross-platform

**IMPROVEMENTS - Package.json:**

- 📦 Descrição atualizada: agora menciona Windows/macOS/Linux
- 🔑 Keywords adicionadas: cross-platform, windows, macos, linux
- 📂 Categoria "AI" adicionada

**FIXES:**

- ✅ Tratamento uniforme de environment variables
- ✅ Mensagens de erro consistentes em qualquer SO
- ✅ Suporte a variáveis de ambiente do Windows (setx)
- ✅ Suporte a variáveis de ambiente do Linux/macOS (export)
- ✅ Detecção correta do modelo Gemini (gemini-2.0-flash)
- ✅ Modelos de IA atualizados para mais recentes

**TECHNICAL:**

- 📁 Nova estrutura: `src/utils/` para helpers reutilizáveis
- 🔧 Melhor typings do TypeScript
- ⚡ Melhor performance com helpers otimizados
- 📊 Logging melhorado para debug cross-platform

---

## [1.1.2] - 2026-04-09

### 🔧 Melhorias de Estabilidade

**NOVO:**

- ✨ Suporte aprimorado a múltiplos providers
- ✨ Melhor tratamento de timeout

**MELHORADO:**

- 📖 Documentação de uso melhorada
- 🔗 Links de repositório atualizados

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
- ✅ Versão agora fica somente em package.json
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
