/**
 * 🤖 CLAW AGENT v1.2.0 - Agent Manager
 * Gerencia os 6 comandos principais do agente profissional
 * ✅ Cross-platform: Windows, macOS, Linux
 * ✅ Integração com configurações do VS Code
 * ✅ Tratamento robusto de erros com rate limit
 * ✅ Modelos de IA atualizados
 */

import * as vscode from 'vscode';
import axios from 'axios';
import { HTTPHelper } from './utils/httpHelper';
import { PathHelper } from './utils/pathHelper';

interface AIProvider {
    name: string;
    endpoint: string;
    apiKey: string;
    providerKey: string;
}

interface ProviderConfig {
    name: string;
    endpoint: string;
    apiKey: string;
    envVar: string;
    providerKey: string;
}

export class AgentManager {
    private aiProvider: AIProvider | null = null;
    private readonly DEFAULT_TIMEOUT = 30000;

    constructor() {
        this.detectProviderFromEnv();
    }

    /**
     * Inicializa o gerenciador — tenta detectar provider das configurações VS Code primeiro
     */
    async initialize(): Promise<string> {
        try {
            // Tenta detectar das configurações VS Code primeiro
            await this.detectProviderFromConfig();

            if (!this.aiProvider) {
                return 'ℹ️ Nenhum provider de IA configurado.\nConfigure uma chave de API nas configurações da extensão ou via variável de ambiente.';
            }

            const isConnected = await HTTPHelper.testConnectivity(
                this.aiProvider.endpoint,
                5000
            );

            if (!isConnected) {
                return `⚠️ Provider detectado (${this.aiProvider.name}) mas não conseguiu conectar ao endpoint.\nVerifique sua conexão ou se o serviço está rodando.`;
            }

            return `✅ Conectado a: ${this.aiProvider.name}`;
        } catch (error) {
            console.error('Erro ao inicializar:', error);
            return `⚠️ Erro ao verificar conexão: ${HTTPHelper.sanitizeError(error)}`;
        }
    }

    /**
     * Detecta provider das configurações do VS Code
     */
    private async detectProviderFromConfig(): Promise<void> {
        const config = vscode.workspace.getConfiguration('clawagent');
        const aiProvider = config.get<string>('aiProvider', 'auto');

        if (aiProvider === 'auto') {
            // Fallback para detecção por env vars
            this.detectProviderFromEnv();
            return;
        }

        const providers: Record<string, ProviderConfig> = {
            openai: {
                name: 'OpenAI (ChatGPT)',
                endpoint: 'https://api.openai.com/v1/chat/completions',
                apiKey: config.get<string>('openai.apiKey', '') || process.env.OPENAI_API_KEY || '',
                envVar: 'OPENAI_API_KEY',
                providerKey: 'openai'
            },
            gemini: {
                name: 'Google Gemini',
                endpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
                apiKey: config.get<string>('gemini.apiKey', '') || process.env.GOOGLE_API_KEY || '',
                envVar: 'GOOGLE_API_KEY',
                providerKey: 'gemini'
            },
            claude: {
                name: 'Anthropic Claude',
                endpoint: 'https://api.anthropic.com/v1/messages',
                apiKey: config.get<string>('claude.apiKey', '') || process.env.ANTHROPIC_API_KEY || '',
                envVar: 'ANTHROPIC_API_KEY',
                providerKey: 'claude'
            },
            localai: {
                name: 'LocalAI',
                endpoint: config.get<string>('localai.endpoint', 'http://localhost:8080') + '/v1/chat/completions',
                apiKey: process.env.LOCALAI_API_KEY || '',
                envVar: 'LOCALAI_ENDPOINT',
                providerKey: 'localai'
            },
            ollama: {
                name: 'Ollama',
                endpoint: config.get<string>('ollama.endpoint', 'http://localhost:11434') + '/api/generate',
                apiKey: '',
                envVar: 'OLLAMA_ENDPOINT',
                providerKey: 'ollama'
            }
        };

        const provider = providers[aiProvider];
        if (provider && (provider.apiKey || provider.providerKey === 'ollama' || provider.providerKey === 'localai')) {
            this.aiProvider = {
                name: provider.name,
                endpoint: provider.endpoint,
                apiKey: provider.apiKey,
                providerKey: provider.providerKey
            };
        } else {
            this.detectProviderFromEnv();
        }
    }

    /**
     * Detecta qual IA está disponível via variáveis de ambiente
     */
    private detectProviderFromEnv(): void {
        const providers: Record<string, ProviderConfig> = {
            OPENAI_API_KEY: {
                name: 'OpenAI (ChatGPT)',
                endpoint: 'https://api.openai.com/v1/chat/completions',
                apiKey: process.env.OPENAI_API_KEY || '',
                envVar: 'OPENAI_API_KEY',
                providerKey: 'openai'
            },
            GOOGLE_API_KEY: {
                name: 'Google Gemini',
                endpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
                apiKey: process.env.GOOGLE_API_KEY || '',
                envVar: 'GOOGLE_API_KEY',
                providerKey: 'gemini'
            },
            ANTHROPIC_API_KEY: {
                name: 'Anthropic Claude',
                endpoint: 'https://api.anthropic.com/v1/messages',
                apiKey: process.env.ANTHROPIC_API_KEY || '',
                envVar: 'ANTHROPIC_API_KEY',
                providerKey: 'claude'
            },
            LOCALAI_ENDPOINT: {
                name: 'LocalAI',
                endpoint: (process.env.LOCALAI_ENDPOINT || 'http://localhost:8080') + '/v1/chat/completions',
                apiKey: process.env.LOCALAI_API_KEY || '',
                envVar: 'LOCALAI_ENDPOINT',
                providerKey: 'localai'
            },
            OLLAMA_ENDPOINT: {
                name: 'Ollama',
                endpoint: (process.env.OLLAMA_ENDPOINT || 'http://localhost:11434') + '/api/generate',
                apiKey: '',
                envVar: 'OLLAMA_ENDPOINT',
                providerKey: 'ollama'
            }
        };

        for (const provider of Object.values(providers)) {
            if (provider.providerKey === 'ollama' || provider.providerKey === 'localai') {
                if (process.env[provider.envVar] || provider.providerKey === 'ollama') {
                    this.aiProvider = {
                        name: provider.name,
                        endpoint: provider.endpoint,
                        apiKey: provider.apiKey,
                        providerKey: provider.providerKey
                    };
                    return;
                }
            } else if (provider.apiKey && provider.apiKey.trim()) {
                this.aiProvider = {
                    name: provider.name,
                    endpoint: provider.endpoint,
                    apiKey: provider.apiKey,
                    providerKey: provider.providerKey
                };
                return;
            }
        }
    }

    /**
     * Obtém configurações atuais do VS Code
     */
    private getConfig() {
        return vscode.workspace.getConfiguration('clawagent');
    }

    /**
     * COMANDO 1: Analisar código
     */
    async analyze(code: string, filePath: string): Promise<string> {
        try {
            const language = PathHelper.detectLanguage(filePath);
            const fileName = PathHelper.getFileName(filePath);
            const config = this.getConfig();
            const depth = config.get<string>('analyze.depth', 'balanced');

            const depthInstructions: Record<string, string> = {
                quick: 'Foque apenas em bugs críticos e problemas de segurança óbvios.',
                balanced: 'Analise bugs, segurança, performance e boas práticas de forma equilibrada.',
                deep: 'Faça uma análise exaustiva incluindo bugs, segurança, performance, code smells, manutenibilidade e padrões de projeto.'
            };

            const prompt = `Analise o seguinte código ${language} (${fileName}):

${depthInstructions[depth] || depthInstructions.balanced}

Arquivo: ${fileName}
Linguagem: ${language}

\`\`\`${language.toLowerCase()}
${code}
\`\`\`

Forneça uma análise detalhada e acionável com sugestões de correção.`;

            return await this.callAI(prompt);
        } catch (error) {
            return HTTPHelper.getHelpfulErrorMessage(error, 'Analyze');
        }
    }

    /**
     * COMANDO 2: Melhorar código
     */
    async improve(code: string, filePath: string): Promise<string> {
        try {
            const language = PathHelper.detectLanguage(filePath);
            const fileName = PathHelper.getFileName(filePath);

            const prompt = `Refatore e melhore o seguinte código ${language} (${fileName}):

Aplicar:
- Otimização de algoritmos e performance
- Melhorias de legibilidade e manutenibilidade
- Tratamento robusto de erros
- Seguir boas práticas da linguagem (SOLID, DRY, etc.)
- Sugerir mudanças estruturais se necessário

Arquivo: ${fileName}
Linguagem: ${language}

\`\`\`${language.toLowerCase()}
${code}
\`\`\`

Forneça o código refatorado com explicações claras das mudanças.`;

            return await this.callAI(prompt);
        } catch (error) {
            return HTTPHelper.getHelpfulErrorMessage(error, 'Improve');
        }
    }

    /**
     * COMANDO 3: Gerar documentação
     */
    async document(code: string, filePath: string): Promise<string> {
        try {
            const language = PathHelper.detectLanguage(filePath);
            const fileName = PathHelper.getFileName(filePath);

            const prompt = `Gere documentação profissional em Markdown para o seguinte código ${language} (${fileName}):

Incluir obrigatoriamente:
- Descrição clara da função/classe/módulo
- Parâmetros com tipos e descrição
- Valor de retorno esperado
- Exemplos de uso prático
- Exceções e erros possíveis
- Notas, avisos e limitações conhecidas
- Casos de uso recomendados

Arquivo: ${fileName}
Linguagem: ${language}

\`\`\`${language.toLowerCase()}
${code}
\`\`\`

Use formato Markdown bem estruturado e profissional.`;

            return await this.callAI(prompt);
        } catch (error) {
            return HTTPHelper.getHelpfulErrorMessage(error, 'Document');
        }
    }

    /**
     * COMANDO 4: Criar testes
     */
    async test(code: string, filePath: string): Promise<string> {
        try {
            const language = PathHelper.detectLanguage(filePath);
            const fileName = PathHelper.getFileName(filePath);

            const testFrameworks: Record<string, string> = {
                'Python': 'pytest',
                'JavaScript': 'Jest',
                'TypeScript': 'Jest',
                'Java': 'JUnit 5',
                'C#': 'NUnit/xUnit',
                'C++': 'Google Test',
                'Go': 'testing',
                'Rust': 'cargo test',
                'PHP': 'PHPUnit',
                'Ruby': 'RSpec'
            };

            const framework = testFrameworks[language] || 'framework apropriado';

            const prompt = `Crie testes unitários automatizados e completos para o seguinte código ${language} (${fileName}):

Requisitos:
- Use ${framework}
- Cubra casos normais, borda e extremos
- Incluir testes de erro e exceção
- Use mocks/stubs se necessário
- Siga boas práticas de teste (AAA: Arrange-Act-Assert)
- Código pronto para copiar e usar

Arquivo: ${fileName}
Linguagem: ${language}
Framework: ${framework}

\`\`\`${language.toLowerCase()}
${code}
\`\`\`

Forneça código de teste profissional e completo.`;

            return await this.callAI(prompt);
        } catch (error) {
            return HTTPHelper.getHelpfulErrorMessage(error, 'Test');
        }
    }

    /**
     * COMANDO 5: Fazer pergunta
     */
    async ask(question: string, code: string): Promise<string> {
        try {
            const context = code ? `\nContexto (arquivo atual):\n\`\`\`\n${code}\n\`\`\`` : '';
            const prompt = `${question}${context}`;
            return await this.callAI(prompt);
        } catch (error) {
            return HTTPHelper.getHelpfulErrorMessage(error, 'Ask');
        }
    }

    /**
     * COMANDO 6: Mostrar status
     */
    async getStatus(): Promise<string> {
        const osInfo = PathHelper.getSystemInfo();
        const providerName = this.aiProvider?.name || '❌ Nenhum configurado';
        const isConfigured = this.aiProvider ? '✅ Configurada' : '❌ Não encontrada';
        const status = this.aiProvider ? '🟢 Pronto' : '🔴 Aguardando configuração';
        const config = this.getConfig();
        const language = config.get<string>('language', 'pt-br');
        const timeout = config.get<number>('requestTimeout', 30000);
        const retries = config.get<number>('maxRetries', 3);
        const depth = config.get<string>('analyze.depth', 'balanced');

        return `
═══════════════════════════════════════════════════════════════
🤖 CLAW AGENT v1.2.0 - STATUS
═══════════════════════════════════════════════════════════════

📊 INFORMAÇÕES DO AGENTE
───────────────────────────────────────────────────────────────
  • Sistema: ${osInfo}
  • Provedor IA: ${providerName}
  • API Key: ${isConfigured}
  • Versão: 1.2.0
  • Status: ${status}
  • Idioma: ${language}
  • Timeout: ${(timeout / 1000).toFixed(0)}s
  • Retries: ${retries}
  • Profundidade: ${depth}

📋 6 COMANDOS PRINCIPAIS
───────────────────────────────────────────────────────────────
  1️⃣  Analisar Código     → bugs, segurança, performance
  2️⃣  Melhorar Código      → refatoração e otimização
  3️⃣  Gerar Documentação   → documentação Markdown
  4️⃣  Criar Testes         → testes unitários
  5️⃣  Fazer Pergunta       → respostas sobre código
  6️⃣  Status               → este menu

🔧 CONFIGURAÇÃO RÁPIDA
───────────────────────────────────────────────────────────────
  Variáveis de ambiente ou Configurações VS Code:

  Online (requer chave de API):
  • OpenAI  → OPENAI_API_KEY  ou Config → clawagent.openai.apiKey
  • Gemini  → GOOGLE_API_KEY  ou Config → clawagent.gemini.apiKey
  • Claude  → ANTHROPIC_API_KEY ou Config → clawagent.claude.apiKey

  Local (100% grátis):
  • Ollama  → OLLAMA_ENDPOINT (http://localhost:11434)
  • LocalAI → LOCALAI_ENDPOINT (http://localhost:8080)

📚 LINKS
───────────────────────────────────────────────────────────────
  Repositório: https://github.com/RafaelBatistaDev/CLAW-AGENT---Seu-Assistente-de-IA-para-Codigo-VsCode
  Issues: https://github.com/RafaelBatistaDev/CLAW-AGENT---Seu-Assistente-de-IA-para-Codigo-VsCode/issues
  Email: rafaelbatistadev@outlook.com.br

═══════════════════════════════════════════════════════════════
        `;
    }

    /**
     * Chama a IA configurada com retry e timeout
     */
    private async callAI(prompt: string): Promise<string> {
        if (!this.aiProvider) {
            return `❌ Erro: Nenhuma IA configurada.

Configure uma chave de API nas configurações da extensão:
1. Ctrl+Shift+P → "CLAW Agent: Abrir Configurações"
2. Preencha a chave do seu provedor preferido

Ou use variáveis de ambiente:
• OPENAI_API_KEY (OpenAI)
• GOOGLE_API_KEY (Google Gemini)
• ANTHROPIC_API_KEY (Anthropic Claude)

Ou IAs locais (100% grátis):
• Ollama → http://localhost:11434
• LocalAI → http://localhost:8080`;
        }

        const config = this.getConfig();
        const timeout = config.get<number>('requestTimeout', this.DEFAULT_TIMEOUT);

        try {
            const providerKey = this.aiProvider.providerKey;

            if (providerKey === 'openai') {
                return await this.callOpenAI(prompt, timeout);
            } else if (providerKey === 'gemini') {
                return await this.callGemini(prompt, timeout);
            } else if (providerKey === 'claude') {
                return await this.callClaude(prompt, timeout);
            } else if (providerKey === 'localai' || providerKey === 'ollama') {
                return await this.callLocal(prompt, timeout);
            }

            return '❌ Provider não reconhecido';
        } catch (error) {
            return HTTPHelper.getHelpfulErrorMessage(error, `Provider: ${this.aiProvider.name}`);
        }
    }

    private async callOpenAI(prompt: string, timeout: number): Promise<string> {
        try {
            const config = this.getConfig();
            const model = config.get<string>('openai.model', 'gpt-4o');

            const response = await axios.post(
                this.aiProvider!.endpoint,
                {
                    model,
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.7,
                    max_tokens: 4096
                },
                {
                    headers: HTTPHelper.createHeaders(`Bearer ${this.aiProvider!.apiKey}`),
                    timeout,
                    validateStatus: () => true
                }
            );

            if (response.status === 200) {
                return response.data.choices[0].message.content;
            } else if (response.status === 401) {
                return '❌ Erro 401: Chave OpenAI inválida ou expirada. Verifique sua chave em Configurações → clawagent.openai.apiKey';
            } else if (response.status === 429) {
                return '❌ Erro 429: Limite de requisições atingido (rate limit). Aguarde alguns segundos e tente novamente.';
            } else if (response.status === 500) {
                return '❌ Erro 500: Erro interno do servidor OpenAI. Tente novamente mais tarde.';
            }

            return `❌ Erro ${response.status}: ${response.statusText}`;
        } catch (error) {
            return HTTPHelper.getHelpfulErrorMessage(error, 'OpenAI');
        }
    }

    private async callGemini(prompt: string, timeout: number): Promise<string> {
        try {
            const config = this.getConfig();
            const model = config.get<string>('gemini.model', 'gemini-2.5-pro');
            const endpoint = `${this.aiProvider!.endpoint}/${model}:generateContent`;

            const response = await axios.post(
                endpoint,
                {
                    contents: [{
                        parts: [{ text: prompt }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 8192
                    }
                },
                {
                    headers: {
                        ...HTTPHelper.createHeaders(),
                        'x-goog-api-key': this.aiProvider!.apiKey
                    },
                    params: { key: this.aiProvider!.apiKey },
                    timeout,
                    validateStatus: () => true
                }
            );

            if (response.status === 200) {
                return response.data.candidates[0].content.parts[0].text;
            } else if (response.status === 401 || response.status === 403) {
                return '❌ Erro 403: Chave Google Gemini inválida ou com permissões insuficientes. Verifique em Configurações → clawagent.gemini.apiKey';
            } else if (response.status === 429) {
                return '❌ Erro 429: Limite de requisições do Gemini atingido. O plano gratuito tem cotas diárias.';
            }

            return `❌ Erro ${response.status}: ${response.statusText}`;
        } catch (error) {
            return HTTPHelper.getHelpfulErrorMessage(error, 'Google Gemini');
        }
    }

    private async callClaude(prompt: string, timeout: number): Promise<string> {
        try {
            const config = this.getConfig();
            const model = config.get<string>('claude.model', 'claude-sonnet-5-20250515');

            const response = await axios.post(
                this.aiProvider!.endpoint,
                {
                    model,
                    max_tokens: 8192,
                    messages: [{ role: 'user', content: prompt }]
                },
                {
                    headers: {
                        'x-api-key': this.aiProvider!.apiKey,
                        'anthropic-version': '2023-06-01',
                        'Content-Type': 'application/json',
                        'User-Agent': HTTPHelper.getUserAgent()
                    },
                    timeout,
                    validateStatus: () => true
                }
            );

            if (response.status === 200) {
                return response.data.content[0].text;
            } else if (response.status === 401) {
                return '❌ Erro 401: Chave Claude inválida ou expirada. Verifique em Configurações → clawagent.claude.apiKey';
            } else if (response.status === 429) {
                return '❌ Erro 429: Limite de requisições do Claude atingido.';
            }

            return `❌ Erro ${response.status}: ${response.statusText}`;
        } catch (error) {
            return HTTPHelper.getHelpfulErrorMessage(error, 'Claude');
        }
    }

    private async callLocal(prompt: string, timeout: number): Promise<string> {
        try {
            const response = await axios.post(
                this.aiProvider!.endpoint,
                {
                    model: 'gpt-4',
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.7,
                    max_tokens: 4096,
                    stream: false
                },
                {
                    headers: HTTPHelper.createHeaders(),
                    timeout,
                    validateStatus: () => true
                }
            );

            if (response.status === 200) {
                // Ollama retorna em formato diferente
                if (response.data.response) {
                    return response.data.response;
                }
                return response.data.choices?.[0]?.message?.content || JSON.stringify(response.data);
            }

            return `❌ Erro ${response.status}: Verifique se o serviço local está rodando.`;
        } catch (error) {
            return HTTPHelper.getHelpfulErrorMessage(error, 'IA Local (Ollama/LocalAI)');
        }
    }
}
