/**
 * 🌐 HTTPHelper - Requisições HTTP com timeout e tratamento de erro melhorado
 * Funciona em qualquer SO com configuração automática de proxy
 */

import axios, { AxiosError } from 'axios';

interface RequestConfig {
    headers?: Record<string, string>;
    timeout?: number;
    retries?: number;
}

interface AIResponse {
    success: boolean;
    data?: string;
    error?: string;
    statusCode?: number;
}

export class HTTPHelper {
    private static readonly DEFAULT_TIMEOUT = 30000; // 30 segundos
    private static readonly DEFAULT_RETRIES = 3;
    private static readonly RETRY_DELAY = 1000; // 1 segundo

    /**
     * Faz requisição POST com retry automático
     */
    static async post(
        url: string,
        data: any,
        config?: RequestConfig
    ): Promise<AIResponse> {
        const timeout = config?.timeout || this.DEFAULT_TIMEOUT;
        const retries = config?.retries ?? this.DEFAULT_RETRIES;
        const headers = config?.headers || {};

        let lastError: Error | null = null;

        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const response = await axios.post(url, data, {
                    headers,
                    timeout,
                    validateStatus: () => true // Não lance erro em status 4xx/5xx
                });

                if (response.status >= 200 && response.status < 300) {
                    return {
                        success: true,
                        data: JSON.stringify(response.data),
                        statusCode: response.status
                    };
                } else if (response.status >= 400) {
                    return {
                        success: false,
                        error: `HTTP ${response.status}: ${response.statusText}`,
                        statusCode: response.status
                    };
                }
            } catch (error) {
                lastError = error as Error;

                if (attempt < retries) {
                    // Espera antes de tentar novamente
                    await new Promise(resolve =>
                        setTimeout(resolve, this.RETRY_DELAY * attempt)
                    );
                }
            }
        }

        return {
            success: false,
            error: `Falha após ${retries} tentativas: ${lastError?.message || 'Desconhecido'}`
        };
    }

    /**
     * Valida se URL é válida
     */
    static isValidURL(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Valida se API Key existe e tem formato válido
     */
    static isValidAPIKey(apiKey: string | undefined | null): boolean {
        if (!apiKey) return false;

        // Deve ter pelo menos 10 caracteres
        return apiKey.trim().length > 10;
    }

    /**
     * Sanitiza erro para não expor informações sensíveis
     */
    static sanitizeError(error: any): string {
        if (error instanceof AxiosError) {
            if (error.code === 'ECONNABORTED') {
                return 'Timeout: conexão expirou (o servidor não respondeu a tempo)';
            } else if (error.code === 'ECONNREFUSED') {
                return 'Conexão recusada (verifique endpoint e se o servidor está ativo)';
            } else if (error.code === 'ERR_TLS_CERT_ALTNAME_INVALID') {
                return 'Erro SSL/TLS: certificado inválido';
            } else if (error.response?.status === 401) {
                return 'Erro 401: Chave de API inválida ou expirada';
            } else if (error.response?.status === 403) {
                return 'Erro 403: Acesso negado';
            } else if (error.response?.status === 429) {
                return 'Erro 429: Muitas requisições (rate limit atingido)';
            } else if (error.response?.status === 500) {
                return 'Erro 500: Erro interno do servidor';
            }
        }

        // Remove informações sensíveis da mensagem
        let message = error?.message || 'Erro desconhecido';
        message = message.replace(/sk-[a-zA-Z0-9]+/g, 'sk-***');
        message = message.replace(/AIzaSy[a-zA-Z0-9-_]+/g, 'AIzaSy***');
        message = message.replace(/Bearer\s+[a-zA-Z0-9]+/g, 'Bearer ***');

        return message;
    }

    /**
     * Registra requisição para debug
     */
    static logRequest(
        method: string,
        url: string,
        headers: Record<string, string>,
        sanitize: boolean = true
    ): void {
        const logHeaders = sanitize ? this.sanitizeHeaders(headers) : headers;
        console.log(`[HTTP] ${method} ${url}`, logHeaders);
    }

    /**
     * Sanitiza headers para não expor chaves
     */
    private static sanitizeHeaders(headers: Record<string, string>): Record<string, string> {
        const sanitized = { ...headers };

        const sensitiveKeys = [
            'Authorization',
            'X-API-Key',
            'x-api-key',
            'API-Key',
            'api-key'
        ];

        sensitiveKeys.forEach(key => {
            if (sanitized[key]) {
                sanitized[key] = '***REDACTED***';
            }
        });

        return sanitized;
    }

    /**
     * Detecta erro de conexão (proxy, firewall, etc)
     */
    static isConnectionError(error: any): boolean {
        if (error instanceof AxiosError) {
            return !error.response; // Se não há resposta, é erro de conexão
        }
        return false;
    }

    /**
     * Gera mensagem amigável de erro com sugestões
     */
    static getHelpfulErrorMessage(error: any, context?: string): string {
        const sanitized = this.sanitizeError(error);

        let message = `❌ Erro${context ? ` (${context})` : ''}: ${sanitized}`;

        if (this.isConnectionError(error)) {
            message += `\n\n💡 Sugestões:
- Verifique sua conexão com internet
- Teste o endpoint manualmente com curl
- Verifique firewall/proxy
- Se local (Ollama/LocalAI), certifique que está rodando`;
        }

        return message;
    }

    /**
     * Obtém user agent compatível com todos os SOs
     */
    static getUserAgent(): string {
        const platform = process.platform === 'win32' ? 'Windows'
                       : process.platform === 'darwin' ? 'macOS'
                       : 'Linux';
        const nodeVersion = process.version;

        return `ClawAgent/1.1.3 (${platform}) Node${nodeVersion}`;
    }

    /**
     * Cria headers seguros e cross-platform
     */
    static createHeaders(authorization?: string): Record<string, string> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'User-Agent': this.getUserAgent(),
            'Accept': 'application/json'
        };

        if (authorization) {
            headers['Authorization'] = authorization;
        }

        return headers;
    }

    /**
     * Testa conectividade com um endpoint
     */
    static async testConnectivity(url: string, timeoutMs: number = 5000): Promise<boolean> {
        try {
            await axios.get(url, {
                timeout: timeoutMs,
                validateStatus: () => true
            });
            return true;
        } catch {
            return false;
        }
    }
}
