# CLAW AGENT - Projeto VS Code Extension

## Estrutura do Projeto

```
src/
├── extension.ts              # Ponto de entrada (activate/deactivate)
├── agentManager.ts           # Lógica dos 6 comandos + chamadas às IAs
├── utils/
│   ├── httpHelper.ts         # HTTP requests, retry, sanitização
│   └── pathHelper.ts         # Caminhos cross-platform, detecção de linguagem
└── views/
    └── clawTreeProvider.ts   # TreeView providers (Configurações + Sugestões)
```

## Comandos Principais

| Comando | Método no AgentManager | Descrição |
|---|---|---|
| `clawagent.analyze` | `analyze(code, filePath)` | Análise de código |
| `clawagent.improve` | `improve(code, filePath)` | Refatoração |
| `clawagent.document` | `document(code, filePath)` | Documentação |
| `clawagent.test` | `test(code, filePath)` | Testes unitários |
| `clawagent.ask` | `ask(question, code)` | Perguntas |
| `clawagent.status` | `getStatus()` | Status do agente |

## Provedores de IA Suportados

- **OpenAI** - `clawagent.openai.*`, env: `OPENAI_API_KEY`
- **Gemini** - `clawagent.gemini.*`, env: `GOOGLE_API_KEY`
- **Claude** - `clawagent.claude.*`, env: `ANTHROPIC_API_KEY`
- **Ollama** - `clawagent.ollama.*`, env: `OLLAMA_ENDPOINT`
- **LocalAI** - `clawagent.localai.*`, env: `LOCALAI_ENDPOINT`

## Build & Test

```bash
npm install           # Instalar deps
npm run compile       # Compilar TS
npm run compile:prod  # TS + Webpack (produção)
npm run watch         # Modo watch
npm run lint          # ESLint
npm run package       # Gerar .vsix
```

## Convenções

- **Idioma**: Português-BR (código, commits, docs)
- **Modelos**: Sempre usar modelos mais recentes nas configurações padrão
- **Erros**: Usar `HTTPHelper.getHelpfulErrorMessage()` para erros de API
- **Config**: Preferir `vscode.workspace.getConfiguration('clawagent')` sobre env vars
- **Versionamento**: SemVer (atual major apenas para breaking changes)

## Atalhos de Desenvolvimento

- Para testar a extensão localmente: Pressione F5 no VS Code
- Para debug: `clawagent.debug.enabled: true` nas settings
