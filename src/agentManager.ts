/**
 * 🤖 CLAW AGENT v1.0.2 - Agent Manager
 * Gerencia os 6 comandos principais do agente profissional
 */

import axios from 'axios';

interface AIProvider {
    name: string;
    endpoint: string;
    apiKey: string;
}

export class AgentManager {
    private aiProvider: AIProvider | null = null;

    constructor() {
        this.detectProvider();
    }

    /**
     * Inicializa o gerenciador
     */
    async initialize(): Promise<string> {
        if (!this.aiProvider) {
            return 'ℹ️ Nenhum provider de IA configurado. Use: agent status';
        }
        return `✅ Conectado a: ${this.aiProvider.name}`;
    }

    /**
     * Detecta qual IA está disponível
     */
    private detectProvider(): void {
        const providers = {
            OPENAI_API_KEY: {
                name: 'OpenAI (ChatGPT)',
                endpoint: 'https://api.openai.com/v1/chat/completions',
                apiKey: process.env.OPENAI_API_KEY || ''
            },
            GOOGLE_API_KEY: {
                name: 'Google Gemini',
                endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
                apiKey: process.env.GOOGLE_API_KEY || ''
            },
            ANTHROPIC_API_KEY: {
                name: 'Anthropic Claude',
                endpoint: 'https://api.anthropic.com/v1/messages',
                apiKey: process.env.ANTHROPIC_API_KEY || ''
            },
            LOCALAI_API_KEY: {
                name: 'LocalAI',
                endpoint: process.env.LOCALAI_ENDPOINT || 'http://localhost:8080/v1/chat/completions',
                apiKey: process.env.LOCALAI_API_KEY || 'localai'
            },
            OLLAMA_ENDPOINT: {
                name: 'Ollama',
                endpoint: process.env.OLLAMA_ENDPOINT || 'http://localhost:11434/api/generate',
                apiKey: process.env.OLLAMA_ENDPOINT || 'ollama'
            }
        };

        for (const provider of Object.values(providers)) {
            if (provider.apiKey) {
                this.aiProvider = provider;
                return;
            }
        }
    }

    /**
     * COMANDO 1: Analisar código
     */
    async analyze(code: string, filePath: string): Promise<string> {
        const prompt = `Analise o seguinte código e identifique:
1. Bugs potenciais
2. Problemas de segurança
3. Ineficiências de performance
4. Melhorias de legibilidade

Arquivo: ${filePath}

\`\`\`
${code}
\`\`\`

Forneça uma análise detalhada e acionável.`;

        return await this.callAI(prompt);
    }

    /**
     * COMANDO 2: Melhorar código
     */
    async improve(code: string, filePath: string): Promise<string> {
        const prompt = `Refatore e melhore o seguinte código:
- Otimize algoritmos
- Melhore legibilidade
- Adicione tratamento de erros
- Siga boas práticas
- Sugira mudanças estruturais

Arquivo: ${filePath}

\`\`\`
${code}
\`\`\`

Forneça o código refatorado com explicações.`;

        return await this.callAI(prompt);
    }

    /**
     * COMANDO 3: Gerar documentação
     */
    async document(code: string, filePath: string): Promise<string> {
        const prompt = `Gere documentação profissional (Markdown) para o seguinte código:
- Descrição da função/classe
- Parâmetros com tipos
- Retorno esperado
- Exemplos de uso
- Exceções possíveis
- Notas e avisos

Arquivo: ${filePath}

\`\`\`
${code}
\`\`\`

Use formato Markdown bem estruturado.`;

        return await this.callAI(prompt);
    }

    /**
     * COMANDO 4: Criar testes
     */
    async test(code: string, filePath: string): Promise<string> {
        const prompt = `Crie testes unitários automatizados para o seguinte código:
- Use framework apropriado
- Cubra casos normais e extremos
- Inclua mocks se necessário
- Siga boas práticas

Arquivo: ${filePath}

\`\`\`
${code}
\`\`\`

Forneça código de teste pronto para usar.`;

        return await this.callAI(prompt);
    }

    /**
     * COMANDO 5: Fazer pergunta
     */
    async ask(question: string, code: string): Promise<string> {
        const context = code ? `\nArquivo atual:\n\`\`\`\n${code}\n\`\`\`` : '';
        const prompt = `${question}${context}`;
        return await this.callAI(prompt);
    }

    /**
     * COMANDO 6: Mostrar status
     */
    async getStatus(): Promise<string> {
        return `
═══════════════════════════════════════════════════════════════
🤖 CLAW AGENT v1.0.2 - STATUS
═══════════════════════════════════════════════════════════════

📊 AGENTE PROFISSIONAL - 6 COMANDOS PRINCIPAIS
───────────────────────────────────────────────────────────────

  1️⃣  \`agent analyze <arquivo>\`
      Encontra bugs, problemas de segurança e ineficiências

  2️⃣  \`agent improve <arquivo>\`
      Refatora e otimiza código automaticamente

  3️⃣  \`agent document <arquivo>\`
      Gera documentação profissional em Markdown

  4️⃣  \`agent test <arquivo>\`
      Cria testes unitários completos

  5️⃣  \`agent ask "PERGUNTA"\`
      Responde qualquer pergunta sobre código

  6️⃣  \`agent status\`
      Mostra este menu de ajuda

───────────────────────────────────────────────────────────────

✅ STATUS DO AGENTE
─ IA Provider: ${this.aiProvider?.name || '❌ Nenhum configurado'}
─ API Key: ${this.aiProvider?.apiKey ? '✅ Configurada' : '❌ Não encontrada'}
─ Versão: 1.0.2
─ Status: ${this.aiProvider ? '🟢 Pronto' : '🔴 Aguardando configuração'}

───────────────────────────────────────────────────────────────

📖 GUIA RÁPIDO

  Variáveis de ambiente suportadas:
  • OPENAI_API_KEY      → Usar OpenAI (ChatGPT)
  • GOOGLE_API_KEY      → Usar Google Gemini
  • ANTHROPIC_API_KEY   → Usar Claude
  • LOCALAI_ENDPOINT    → Usar LocalAI (local)
  • OLLAMA_ENDPOINT     → Usar Ollama (local)

  Exemplo de uso:
  $ export OPENAI_API_KEY="sk-..."
  $ agent status

───────────────────────────────────────────────────────────────

🔗 LINKS ÚTEIS

  Documentação: https://github.com/claw-agent/
  Issues: https://github.com/claw-agent/issues
  Email: rafaelbatistadev@outlook.com.br

═══════════════════════════════════════════════════════════════
        `;
    }

    /**
     * Chama a IA configurada
     */
    private async callAI(prompt: string): Promise<string> {
        if (!this.aiProvider) {
            return `❌ Erro: Nenhuma IA configurada.
            
Configure uma variável de ambiente:
- OPENAI_API_KEY (OpenAI)
- GOOGLE_API_KEY (Gemini)
- ANTHROPIC_API_KEY (Claude)
- LOCALAI_ENDPOINT (LocalAI)
- OLLAMA_ENDPOINT (Ollama)

Após configurar, execute: agent status`;
        }

        try {
            if (this.aiProvider.name.includes('OpenAI')) {
                return await this.callOpenAI(prompt);
            } else if (this.aiProvider.name.includes('Gemini')) {
                return await this.callGemini(prompt);
            } else if (this.aiProvider.name.includes('Claude')) {
                return await this.callClaude(prompt);
            } else if (this.aiProvider.name.includes('LocalAI') || this.aiProvider.name.includes('Ollama')) {
                return await this.callLocal(prompt);
            }

            return '❌ Provider não reconhecido';
        } catch (error) {
            return `❌ Erro ao chamar IA: ${error}`;
        }
    }

    private async callOpenAI(prompt: string): Promise<string> {
        const response = await axios.post(
            this.aiProvider!.endpoint,
            {
                model: 'gpt-4',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7,
                max_tokens: 4000
            },
            {
                headers: {
                    'Authorization': `Bearer ${this.aiProvider!.apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data.choices[0].message.content;
    }

    private async callGemini(prompt: string): Promise<string> {
        const response = await axios.post(
            `${this.aiProvider!.endpoint}?key=${this.aiProvider!.apiKey}`,
            {
                contents: [{
                    parts: [{ text: prompt }]
                }]
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        return response.data.candidates[0].content.parts[0].text;
    }

    private async callClaude(prompt: string): Promise<string> {
        const response = await axios.post(
            this.aiProvider!.endpoint,
            {
                model: 'claude-3-opus-20240229',
                max_tokens: 4000,
                messages: [{ role: 'user', content: prompt }]
            },
            {
                headers: {
                    'x-api-key': this.aiProvider!.apiKey,
                    'anthropic-version': '2023-06-01',
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data.content[0].text;
    }

    private async callLocal(prompt: string): Promise<string> {
        const response = await axios.post(
            this.aiProvider!.endpoint,
            {
                model: 'gpt-4',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7,
                max_tokens: 4000
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        return response.data.choices[0].message.content;
    }
}
