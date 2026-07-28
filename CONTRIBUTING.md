# 🤝 Contribuindo para CLAW AGENT

> **Bem-vindo! 👋** Este documento explica como contribuir para o CLAW AGENT. Adoramos receber contribuições da comunidade!

## 📋 Índice

- [Código de Conduta](#-código-de-conduta)
- [Como Começar](#-como-começar)
- [Configurando o Ambiente](#-configurando-o-ambiente)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Padrões de Código](#-padrões-de-código)
- [Como Contribuir](#-como-contribuir)
- [Enviando Pull Requests](#-enviando-pull-requests)
- [Reportando Bugs](#-reportando-bugs)
- [Sugestões de Melhorias](#-sugestões-de-melhorias)
- [Roadmap e Ideias](#-roadmap-e-ideias)

---

## 🎯 Código de Conduta

### Nossos Valores

- **Respeito**: Tratamos todos com respeito e profissionalismo
- **Inclusão**: Valorizamos perspectivas diversas
- **Transparência**: Comunicação clara e honesta
- **Colaboração**: Juntos somos mais fortes

### Comportamento Esperado

✅ **SIM**:
- Ser amável e construtivo
- Aceitar críticas constructivas
- Focar no código, não na pessoa
- Ajudar outros contribuidores

❌ **NÃO**:
- Assédio ou discriminação
- Ataques pessoais
- Comportamento abusivo
- Conteúdo explícito

**Violações:** Reporte para [rafaelbatistadev@outlook.com.br](mailto:rafaelbatistadev@outlook.com.br)

---

## 🚀 Como Começar

### Pré-requisitos

Antes de começar, certifique-se que você tem:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/))
- **VS Code** 1.85+ ([Download](https://code.visualstudio.com/))
- **Conhecimento em:** TypeScript, VS Code API (básica)

### Passos Iniciais

#### 1. Fork do Repositório

```bash
# No GitHub, clique no botão "Fork"
# Abre uma cópia do projeto na sua conta
```

#### 2. Clone seu Fork

```bash
git clone https://github.com/SEU_USERNAME/CLAW-AGENT---Seu-Assistente-de-IA-para-Codigo-VsCode.git
cd "CLAW AGENT - Seu Assistente de IA para Código VsCode"
```

#### 3. Configure o Remote Upstream

```bash
# Adicione o repositório original como remote
git remote add upstream https://github.com/RafaelBatistaDev/CLAW-AGENT---Seu-Assistente-de-IA-para-Codigo-VsCode.git

# Verifique os remotes
git remote -v
# origin   → seu fork
# upstream → repositório original
```

#### 4. Crie uma Branch

```bash
# Sempre trabalhe em uma branch separada
git checkout -b feature/sua-feature-aqui
# ou
git checkout -b fix/seu-bug-aqui
```

---

## ⚙️ Configurando o Ambiente

### 1. Instale as Dependências

```bash
npm install
```

### 2. Compile o Projeto

```bash
# Compilação única (produção)
npm run compile

# Ou watch mode (recompila ao salvar)
npm run watch
```

### 3. Execute os Testes

```bash
npm test
```

### 4. Inicie o Debugger

```bash
# Pressione F5 no VS Code
# Ou: npm run debug

# Isso abrirá uma nova janela VS Code com a extensão rodando
```

### 5. Verificar Linting

```bash
npm run lint
npm run lint:fix  # Corrige problemas automáticos
```

---

## 📁 Estrutura do Projeto

```
CLAW AGENT/
├── src/                          # 📝 Código-fonte TypeScript
│   ├── extension.ts              # ⭐ Ponto de entrada principal
│   ├── agentManager.ts           # 🤖 Gerenciador do agente IA
│   ├── utils/
│   │   ├── httpHelper.ts         # 🌐 Requisições HTTP
│   │   └── pathHelper.ts         # 📂 Manipulação de caminhos
│   └── views/
│       └── clawTreeProvider.ts   # 🌳 Interface de Tree View
│
├── dist/                         # 🔨 Saída compilada (gerada)
├── media/                        # 🖼️ Ícones e assets
├── package.json                  # 📦 Dependências e scripts
├── tsconfig.json                 # ⚙️ Config TypeScript
├── webpack.config.js             # 🔧 Config Webpack
├── .eslintrc.json                # ✨ Regras de linting
├── README.md                      # 📖 Para usuários finais
└── CONTRIBUTING.md               # 👥 Este arquivo
```

### Descrição dos Principais Arquivos

#### `src/extension.ts`
- Ponto de entrada da extensão
- Ativa/desativa a extensão
- Registra comandos

#### `src/agentManager.ts`
- Lógica do agente IA
- Integração com APIs (OpenAI, Gemini, etc)
- Processamento de requisições

#### `src/utils/httpHelper.ts`
- Auxilia chamadas HTTP
- Gerencia timeouts
- Tradução de erros

#### `src/views/clawTreeProvider.ts`
- Interface visual (Tree View)
- Interação com usuário

---

## 📐 Padrões de Código

### TypeScript

```typescript
// ✅ BOM: tipos explícitos
function analyzeCode(filePath: string, language: string): Promise<AnalysisResult> {
  // ...
}

// ❌ RUIM: tipos implícitos
function analyzeCode(filePath, language) {
  // ...
}
```

### Nomes

```typescript
// ✅ BOM: nomes descritivos
const maxTokensForAnalysis = 4000;
function validateApiKeyFormat(key: string): boolean { }

// ❌ RUIM: abreviações confusas
const mxTk = 4000;
function valKey(k) { }
```

### Comentários

```typescript
// ✅ BOM: explica o "por quê"
// Limitamos a 4k tokens porque Gemini gratuito tem esse limite
const MAX_TOKENS = 4000;

// ❌ RUIM: comenta o óbvio
// Incrementa contador
counter++;
```

### Tratamento de Erros

```typescript
// ✅ BOM: erro específico
try {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
} catch (error) {
  if (error instanceof TypeError) {
    console.error('Network error:', error);
  } else {
    console.error('Unexpected error:', error);
  }
  throw error;
}

// ❌ RUIM: genérico
try {
  return fetch(apiUrl).then(r => r.json());
} catch (e) {
  console.log('Error');
}
```

### Formatação

```typescript
// Usamos Prettier + ESLint para formatação automática
// Rodando antes de commit em husky hooks
npm run lint:fix
```

---

## 🔧 Como Contribuir

### 1. Encontre algo para fazer

**Opções:**
- 🐛 Corrija um bug (veja [Issues](https://github.com/RafaelBatistaDev/CLAW-AGENT---Seu-Assistente-de-IA-para-Codigo-VsCode/issues))
- ✨ Implemente uma feature (veja [Roadmap](#-roadmap-e-ideias))
- 📚 Melhore documentação
- 🧪 Adicione testes
- 🎨 Melhore UI/UX

### 2. Faça suas mudanças

```bash
# Abra em seu editor preferido
code .

# Faça as mudanças
# Teste localmente (F5 ou npm run debug)
# Rode linting
npm run lint:fix
```

### 3. Commit com mensagens claras

```bash
# Formato recomendado: tipo(escopo): descrição
git commit -m "feat(agentManager): add support for Claude API"
git commit -m "fix(httpHelper): timeout not working correctly"
git commit -m "docs: update configuration guide"
git commit -m "refactor(extension): simplify command registration"
git commit -m "test: add tests for API error handling"

# Tipos válidos:
# - feat:     Nova funcionalidade
# - fix:      Correção de bug
# - docs:     Documentação
# - style:    Formatação (sem alterar código)
# - refactor: Reorganizar código
# - perf:     Melhoria de performance
# - test:     Adicionar/alterar testes
# - chore:    Tarefas (deps, config, etc)
```

### 4. Mantenha seu fork atualizado

```bash
# Busque as atualizações do repositório original
git fetch upstream

# Rebase sua branch se necessário
git rebase upstream/main

# Push para seu fork
git push origin feature/sua-feature-aqui
```

---

## 📤 Enviando Pull Requests

### Checklist pre-PR

- [ ] Código testado localmente
- [ ] ESLint passou (`npm run lint`)
- [ ] TypeScript sem erros
- [ ] Commits com mensagens claras
- [ ] Branch atualizada com `upstream/main`
- [ ] Nenhum arquivo de debug/temporário incluído

### Criar o PR

1. **Push sua branch:**
```bash
git push origin feature/sua-feature-aqui
```

2. **Abra um PR no GitHub:**
   - Clique em "New Pull Request"
   - Selecione seu fork e branch
   - Escreva uma descrição clara

### Template de PR

```markdown
## 📝 Descrição
Breve resumo do que você fez.

## 🎯 Tipo de Mudança
- [ ] Bug fix
- [ ] Novo recurso
- [ ] Breaking change
- [ ] Documentação

## ✅ Checklist
- [ ] Testado localmente
- [ ] Sem erros de lint
- [ ] Testes adicionados/atualizados

## 📸 Screenshots (se aplicável)
Adicione capturas de tela ou GIFs.

## 🔗 Relacionados
Relacione issues: Fixes #123
```

### O que esperamos

✅ **Será bem-vindo:**
- Código limpo e testado
- Documentação atualizada
- Testes para novas features
- Discussão construtiva

❌ **Será rejeitado:**
- Código sem testes
- Documentação faltante
- Violações de padrão de código
- Breaking changes sem discussão

---

## 🐛 Reportando Bugs

### Como Reportar

1. **Procure issues existentes** para evitar duplicatas
2. **Abra uma [nova issue](https://github.com/RafaelBatistaDev/CLAW-AGENT---Seu-Assistente-de-IA-para-Codigo-VsCode/issues/new)**
3. **Use este template:**

```markdown
## 📋 Describir o Bug
Descrição clara e concisa.

## 🔄 Passos para Reproduzir
1. Fiz isso
2. Depois aquilo
3. E então
4. O bug ocorreu

## 🤔 Comportamento Esperado
O que deveria ter acontecido.

## 💻 Ambiente
- OS: Windows 10 / macOS 14 / Ubuntu 22.04
- VS Code: 1.85.0
- Node.js: 18.14
- CLAW AGENT: 1.1.3
- API: OpenAI / Gemini / Ollama

## 🔗 Logs / Screenshots
Cole logs de erro ou screenshots.

## ℹ️ Contexto Adicional
Informações adicionais (alternativas tentadas, etc).
```

---

## 💡 Sugestões de Melhorias

### Como Sugerir

1. **Abra uma [nova issue](https://github.com/RafaelBatistaDev/CLAW-AGENT---Seu-Assistente-de-IA-para-Codigo-VsCode/issues/new)**
2. **Etiquete como `enhancement`**
3. **Use este template:**

```markdown
## 📝 É uma melhoria de uma feature existente ou um novo recurso?
- [ ] Melhoria
- [ ] Novo recurso

## ✨ Descreva a Solução Desejada
O que você quer que seja adicionado/melhorado.

## 🤔 Descreva Alternativas Consideradas
Outras soluções possíveis.

## 📚 Contexto Adicional
Por que essa mudança seria útil?

## 🔗 Exemplos / Mockups
Imagens, links ou exemplos.
```

---

## 🗺️ Roadmap e Ideias

### 🎯 Funcionalidades Planejadas

#### Curto Prazo (v1.2)
- [ ] Cache inteligente de análises
- [ ] Suporte a mais linguagens de programação
- [ ] Configuração de temperature/tokens via UI
- [ ] Histórico de análises

#### Médio Prazo (v1.3)
- [ ] Batch analysis (múltiplos arquivos)
- [ ] Integração com GitHub Actions
- [ ] Custom prompts personalizados
- [ ] Suporte a WebAssembly models

#### Longo Prazo (v2.0)
- [ ] Plugin marketplace
- [ ] Colaboração em tempo real
- [ ] Análise de performance/memory
- [ ] Integração com ferramentas externas

### 🆘 Ajuda Procurada

**Áreas onde buscamos colaboradores:**

| Área | Experiência | Tarefas |
|------|------------|---------|
| 💻 **Backend** | TypeScript, Node.js | Otimizar IA, novos providers, cache |
| 🎨 **Frontend** | TypeScript, VS Code API | Melhorar UI, Tree View, temas |
| 📚 **Documentação** | Markdown, técnico | Guias, exemplos, FAQs |
| 🧪 **QA/Testes** | Testes automatizados | Aumentar cobertura, cenários |
| 🌍 **Localização** | Multilíngue | Traduzir strings, docs |
| 🐍 **Python** | Integração | Scripts de build/deploy |

### Como Começar

1. **Escolha uma área** onde quer contribuir
2. **Procure issues com **`good first issue`** ou **`help wanted`** tags**
3. **Comente na issue** que quer trabalhar nela
4. **Faça um PR** com sua solução

---

## 📦 Dependências Principais

Entenda o que usamos no projeto:

```json
{
  "vscode": "^1.85.0",           // API do VS Code
  "typescript": "^5.0.0",         // Linguagem principal
  "webpack": "^5.0.0",            // Bundler
  "eslint": "^8.0.0",             // Linting
  "@types/node": "^20.0.0"        // Tipos do Node.js
}
```

### Adicionar Novas Dependências

```bash
# Apenas dependências de produção
npm install nome-do-pacote

# Apenas desenvolvimento
npm install --save-dev nome-do-pacote

# Sempre justifique no PR por que precisa dessa dep
```

---

## 🔍 Debug e Troubleshooting

### Problema: Extensão não carrega

```bash
# Limpe cache e recompile
rm -rf dist/ node_modules/
npm install
npm run compile
# Pressione F5 no VS Code
```

### Problema: Erros de TypeScript

```bash
# Verifique tipos
npx tsc --noEmit

# Corrija automaticamente
npm run lint:fix
```

### Problema: API não responde

1. Verifique se chave de API está configurada
2. Verifique conexão com internet
3. Limite de taxa atingido? Aguarde alguns minutos
4. Abra uma issue com detalhes

---

## 📞 Contato e Suporte

### Precisa de Ajuda?

- 💬 **Issues**: Para bugs e sugestões
- 📧 **Email**: [rafaelbatistadev@outlook.com.br](mailto:rafaelbatistadev@outlook.com.br)
- 🌐 **GitHub**: [RafaelBatistaDev](https://github.com/RafaelBatistaDev)

### Comunidade

- ⭐ **Dê uma estrela** se gostou do projeto!
- 🔄 **Compartilhe** com outros devs
- 🤝 **Colabore** com melhorias

---

## 📜 Licença

Este projeto é licenciado sob **MIT License** - veja [LICENSE](LICENSE) para detalhes.

Ao contribuir, você concorda que suas contribuições também serão sob a mesma licença.

---

## ✨ Agradecimentos

Obrigado a todos que contribuem! 🙏

Cada PR, bug report, documentação ou feature sugerida nos ajuda a melhorar.

**Você é fantástico! 🚀**

---

<div align="center">

### Made with ❤️ by Rafael Batista

⭐ **Gostou? Deixe uma estrela!** ⭐

[Ver Repositório](https://github.com/RafaelBatistaDev/CLAW-AGENT---Seu-Assistente-de-IA-para-Codigo-VsCode) • [Reportar Bug](https://github.com/RafaelBatistaDev/CLAW-AGENT---Seu-Assistente-de-IA-para-Codigo-VsCode/issues) • [Sugerir Feature](https://github.com/RafaelBatistaDev/CLAW-AGENT---Seu-Assistente-de-IA-para-Codigo-VsCode/issues)

</div>
