import * as vscode from 'vscode';
import * as path from 'path';

/**
 * 🌳 TREE VIEW API - Refatorado seguindo best practices VS Code
 *
 * Implementação otimizada com:
 * ✅ Interfáces bem definidas
 * ✅ Propriedades ricas em TreeItems
 * ✅ Context values para ações dinâmicas
 * ✅ onDidChangeTreeData para atualizações
 * ✅ Gerenciamento robusto de disposables
 * ✅ Dados dinâmicos em tempo real
 */

/**
 * Interface para nós da árvore de configurações
 */
export interface ConfigNode {
    id: string;
    label: string;
    description?: string;
    icon?: string;
    iconDark?: string;
    collapsible?: boolean;
    children?: ConfigNode[];
    command?: vscode.Command;
    tooltip?: string;
    contextValue?: string;
}

/**
 * ⚙️ TreeDataProvider para CONFIGURAÇÕES
 *
 * Renderiza uma árvore interativa com:
 * 1. STATUS E INFORMAÇÕES (Leitura em tempo real)
 * 2. COMANDOS RÁPIDOS (Com ícones e ações)
 * 3. CONFIGURAÇÕES (Editáveis com clique)
 *
 * Best practices aplicadas:
 * - Implementa getTreeItem() e getChildren()
 * - Event emitter para onDidChangeTreeData
 * - Gerenciamento adequado de disposables
 * - Context values para ações customizadas
 */
export class ClawSettingsTreeProvider implements vscode.TreeDataProvider<ConfigNode> {
    private _onDidChangeTreeData: vscode.EventEmitter<ConfigNode | undefined | null | void> =
        new vscode.EventEmitter<ConfigNode | undefined | null | void>();

    readonly onDidChangeTreeData: vscode.Event<ConfigNode | undefined | null | void> =
        this._onDidChangeTreeData.event;

    private disposables: vscode.Disposable[] = [];

    constructor() {
        // 📡 Listener: Atualizar árvore quando configurações mudam
        this.disposables.push(
            vscode.workspace.onDidChangeConfiguration((event) => {
                if (event.affectsConfiguration('clawagent')) {
                    console.log('🔄 Configurações do CLAW Agent atualizadas');
                    this.refresh();
                }
            })
        );

        // 📄 Listener: Atualizar quando arquivo ativo muda
        this.disposables.push(
            vscode.window.onDidChangeActiveTextEditor(() => {
                // Atualizar badges/indicadores baseado no arquivo
                this._onDidChangeTreeData.fire();
            })
        );
    }

    dispose(): void {
        this.disposables.forEach(d => d.dispose());
    }

    /**
     * IMPLEMENTAÇÃO OBRIGATÓRIA: getTreeItem
     * Converte um elemento do modelo em uma representação visual (TreeItem)
     */
    getTreeItem(element: ConfigNode): vscode.TreeItem {
        const treeItem = new vscode.TreeItem(
            element.label,
            element.collapsible
                ? vscode.TreeItemCollapsibleState.Collapsed
                : vscode.TreeItemCollapsibleState.None
        );

        // 🎨 Ícone com tema (light/dark)
        if (element.icon) {
            treeItem.iconPath = new vscode.ThemeIcon(element.icon);
        }

        // 📝 Descrição e dica de ferramenta
        if (element.description) {
            treeItem.description = element.description;
        }

        if (element.tooltip) {
            treeItem.tooltip = element.tooltip;
        }

        // 🎯 Context value para ações customizadas
        if (element.contextValue) {
            treeItem.contextValue = element.contextValue;
        }

        // 🔗 Comando vinculado ao item
        if (element.command) {
            treeItem.command = element.command;
        }

        return treeItem;
    }

    /**
     * IMPLEMENTAÇÃO OBRIGATÓRIA: getChildren
     * Retorna os filhos de um elemento ou os items raiz
     *
     * Padrão: getChildren(elemento) -> retorna os filhos daquele elemento
     *         getChildren(undefined) -> retorna os items raiz
     */
    getChildren(element?: ConfigNode): vscode.ProviderResult<ConfigNode[]> {
        if (!element) {
            // Nível raiz: Retornar as 3 categorias principais
            return this.getRootCategories();
        }

        // Nível profundo: Retornar filhos do elemento
        if (element.children && element.children.length > 0) {
            return element.children;
        }

        return [];
    }

    /**
     * Obtém as 3 categorias principais da árvore
     */
    private getRootCategories(): ConfigNode[] {
        const config = vscode.workspace.getConfiguration('clawagent');

        return [
            {
                id: 'status',
                label: '📊 STATUS E INFORMAÇÕES',
                icon: 'info',
                collapsible: true,
                contextValue: 'statusCategory',
                children: this.getStatusInfo(config)
            },
            {
                id: 'commands',
                label: '⚡ COMANDOS RÁPIDOS',
                icon: 'zap',
                collapsible: true,
                contextValue: 'commandsCategory',
                children: this.getQuickCommands()
            },
            {
                id: 'settings',
                label: '⚙️ CONFIGURAÇÕES',
                icon: 'settings-gear',
                collapsible: true,
                contextValue: 'settingsCategory',
                children: this.getSettingsNodes(config)
            }
        ];
    }

    /**
     * SEÇÃO 1: Status e Informações
     * Mostra status em tempo real do agente
     */
    private getStatusInfo(config: vscode.WorkspaceConfiguration): ConfigNode[] {
        const enabled = config.get<boolean>('enabled', true);
        const aiProvider = config.get<string>('aiProvider', 'auto');
        const currentFile = vscode.window.activeTextEditor?.document.fileName || 'Nenhum arquivo aberto';

        return [
            {
                id: 'status.enabled',
                label: `Status: ${enabled ? '🟢 Ativo' : '🔴 Inativo'}`,
                description: enabled ? 'Agent está funcionando' : 'Agent desativado',
                icon: enabled ? 'pass' : 'error',
                collapsible: false,
                contextValue: 'status',
                tooltip: 'Clique para ativar/desativar',
                command: {
                    command: 'clawagent.toggle',
                    title: 'Toggle CLAW Agent'
                }
            },
            {
                id: 'status.provider',
                label: `Provedor: ${this.getProviderLabel(aiProvider)}`,
                description: 'Clique para alterar',
                icon: 'broadcast',
                collapsible: false,
                contextValue: 'provider',
                tooltip: `Provedor de IA: ${aiProvider}`,
                command: {
                    command: 'workbench.action.openSettings',
                    title: 'Abrir Configuração',
                    arguments: ['clawagent.aiProvider']
                }
            },
            {
                id: 'status.version',
                label: 'Versão: 1.1.3',
                description: 'CLAW Agent v1.1.3',
                icon: 'symbol-string',
                collapsible: false,
                contextValue: 'version',
                tooltip: 'Versão do CLAW Agent',
                command: {
                    command: 'clawagent.status',
                    title: 'Ver Status'
                }
            },
            {
                id: 'status.file',
                label: `Arquivo Atual: ${path.basename(currentFile)}`,
                description: 'Arquivo aberto no editor',
                icon: 'file',
                collapsible: false,
                contextValue: 'file',
                tooltip: currentFile
            }
        ];
    }

    /**
     * SEÇÃO 2: Comandos Rápidos
     * Atalhos para as funções principais do agente
     */
    private getQuickCommands(): ConfigNode[] {
        return [
            {
                id: 'cmd.analyze',
                label: '🔍 Analisar Código',
                description: 'Encontra bugs e melhorias',
                icon: 'search',
                collapsible: false,
                contextValue: 'command',
                tooltip: 'Analisa o arquivo atual em busca de problemas',
                command: {
                    command: 'clawagent.analyze',
                    title: 'Analisar'
                }
            },
            {
                id: 'cmd.improve',
                label: '✨ Melhorar Código',
                description: 'Refatora e otimiza',
                icon: 'sparkle',
                collapsible: false,
                contextValue: 'command',
                tooltip: 'Refatora o código para melhor legibilidade e performance',
                command: {
                    command: 'clawagent.improve',
                    title: 'Melhorar'
                }
            },
            {
                id: 'cmd.document',
                label: '📚 Gerar Documentação',
                description: 'Cria documentação automática',
                icon: 'book',
                collapsible: false,
                contextValue: 'command',
                tooltip: 'Gera documentação em Markdown para o código',
                command: {
                    command: 'clawagent.document',
                    title: 'Documentar'
                }
            },
            {
                id: 'cmd.test',
                label: '🧪 Criar Testes',
                description: 'Gera testes unitários',
                icon: 'beaker',
                collapsible: false,
                contextValue: 'command',
                tooltip: 'Cria testes unitários automáticos',
                command: {
                    command: 'clawagent.test',
                    title: 'Testar'
                }
            },
            {
                id: 'cmd.ask',
                label: '❓ Fazer Pergunta',
                description: 'Responde sobre código',
                icon: 'comment',
                collapsible: false,
                contextValue: 'command',
                tooltip: 'Faça perguntas sobre o código',
                command: {
                    command: 'clawagent.ask',
                    title: 'Perguntar'
                }
            },
            {
                id: 'cmd.status',
                label: '📋 Ver Status',
                description: 'Mostra informações do agente',
                icon: 'pulse',
                collapsible: false,
                contextValue: 'command',
                tooltip: 'Exibe status completo e configuração',
                command: {
                    command: 'clawagent.status',
                    title: 'Status'
                }
            }
        ];
    }

    /**
     * SEÇÃO 3: Configurações
     * Acesso rápido às opções principais
     */
    private getSettingsNodes(config: vscode.WorkspaceConfiguration): ConfigNode[] {
        const aiProvider = config.get<string>('aiProvider', 'auto');
        const timeout = config.get<number>('requestTimeout', 30000);
        const language = config.get<string>('language', 'pt-br');
        const analyzeDepth = config.get<string>('analyze.depth', 'balanced');
        const autoFormat = config.get<boolean>('autoFormat', true);

        const nodes: ConfigNode[] = [
            {
                id: 'cfg.provider',
                label: `Provedor de IA`,
                description: this.getProviderLabel(aiProvider),
                icon: 'broadcast',
                collapsible: false,
                contextValue: 'setting',
                tooltip: `Provedor atualmente selecionado: ${aiProvider}`,
                command: {
                    command: 'workbench.action.openSettings',
                    title: 'Editar',
                    arguments: ['clawagent.aiProvider']
                }
            },
            {
                id: 'cfg.timeout',
                label: `Timeout`,
                description: `${(timeout / 1000).toFixed(1)}s`,
                icon: 'clock',
                collapsible: false,
                contextValue: 'setting',
                tooltip: `Tempo máximo de espera por resposta: ${timeout}ms`,
                command: {
                    command: 'workbench.action.openSettings',
                    title: 'Editar',
                    arguments: ['clawagent.requestTimeout']
                }
            },
            {
                id: 'cfg.language',
                label: `Idioma`,
                description: this.getLanguageName(language),
                icon: 'globe',
                collapsible: false,
                contextValue: 'setting',
                tooltip: `Idioma: ${language}`,
                command: {
                    command: 'workbench.action.openSettings',
                    title: 'Editar',
                    arguments: ['clawagent.language']
                }
            },
            {
                id: 'cfg.depth',
                label: `Profundidade de Análise`,
                description: this.getDepthLabel(analyzeDepth),
                icon: 'search',
                collapsible: false,
                contextValue: 'setting',
                tooltip: `Profundidade: ${analyzeDepth}`,
                command: {
                    command: 'workbench.action.openSettings',
                    title: 'Editar',
                    arguments: ['clawagent.analyze.depth']
                }
            },
            {
                id: 'cfg.autoformat',
                label: `Auto-formatar`,
                description: autoFormat ? 'Ativo' : 'Inativo',
                icon: autoFormat ? 'pass' : 'error',
                collapsible: false,
                contextValue: 'setting',
                tooltip: `Formatar código automaticamente: ${autoFormat}`,
                command: {
                    command: 'workbench.action.openSettings',
                    title: 'Editar',
                    arguments: ['clawagent.autoFormat']
                }
            },
            {
                id: 'cfg.all',
                label: '⚙️ Abrir Todas as Configurações',
                description: 'Clique para abrir',
                icon: 'settings',
                collapsible: false,
                contextValue: 'allSettings',
                tooltip: 'Abre painel de configurações completo',
                command: {
                    command: 'workbench.action.openSettings',
                    title: 'Abrir',
                    arguments: ['clawagent']
                }
            }
        ];

        return nodes;
    }

    /**
     * Helpers para tradução de labels
     */
    private getProviderLabel(provider: string): string {
        const labels: { [key: string]: string } = {
            'auto': 'Auto-detectado',
            'openai': 'OpenAI (GPT)',
            'gemini': 'Google Gemini',
            'claude': 'Anthropic Claude',
            'localai': 'LocalAI',
            'ollama': 'Ollama'
        };
        return labels[provider] || provider;
    }

    private getLanguageName(code: string): string {
        const languages: { [key: string]: string } = {
            'pt-br': 'Português (BR)',
            'en-us': 'English (US)',
            'es-es': 'Español',
            'fr-fr': 'Français',
            'de-de': 'Deutsch',
            'it-it': 'Italiano',
            'ja-jp': '日本語',
            'zh-cn': '简体中文'
        };
        return languages[code] || code;
    }

    private getDepthLabel(depth: string): string {
        const labels: { [key: string]: string } = {
            'quick': 'Rápida',
            'balanced': 'Balanceada',
            'deep': 'Profunda'
        };
        return labels[depth] || depth;
    }

    /**
     * Método público para refresh manual
     */
    refresh(): void {
        console.log('🔄 Atualizando árvore de configurações...');
        this._onDidChangeTreeData.fire();
    }

    /**
     * Refresh apenas de um nó específico
     */
    refreshNode(node: ConfigNode): void {
        this._onDidChangeTreeData.fire(node);
    }
}

/**
 * 📂 TreeDataProvider para SUGESTÕES
 *
 * Renderiza sugestões dinâmicas com:
 * ✅ Dados em tempo real
 * ✅ Ações customizáveis por item
 * ✅ Atualização automática
 * ✅ Context values para menus
 *
 * Segue o padrão: elemento raiz -> sugestões
 */
export class ClawDataProvider implements vscode.TreeDataProvider<ClawItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<ClawItem | undefined | null | void> =
        new vscode.EventEmitter<ClawItem | undefined | null | void>();

    readonly onDidChangeTreeData: vscode.Event<ClawItem | undefined | null | void> =
        this._onDidChangeTreeData.event;

    private disposables: vscode.Disposable[] = [];

    constructor() {
        // 📡 Listener: Atualizar sugestões quando editor muda
        this.disposables.push(
            vscode.window.onDidChangeActiveTextEditor(() => {
                this.refresh();
            })
        );

        // 📝 Listener: Atualizar quando documento muda
        this.disposables.push(
            vscode.workspace.onDidChangeTextDocument(() => {
                this.refresh();
            })
        );
    }

    dispose(): void {
        this.disposables.forEach(d => d.dispose());
    }

    /**
     * IMPLEMENTAÇÃO OBRIGATÓRIA: getTreeItem
     */
    getTreeItem(element: ClawItem): vscode.TreeItem {
        return element;
    }

    /**
     * IMPLEMENTAÇÃO OBRIGATÓRIA: getChildren
     */
    getChildren(element?: ClawItem): vscode.ProviderResult<ClawItem[]> {
        if (!element) {
            // Raiz: Retornar sugestões dinâmicas
            return this.getSuggestions();
        }

        // Sugestões não têm filhos
        return [];
    }

    /**
     * Obtém sugestões dinâmicas baseadas no arquivo aberto
     */
    private getSuggestions(): ClawItem[] {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            return [
                new ClawItem(
                    '📝 Abra um arquivo para obter sugestões',
                    vscode.TreeItemCollapsibleState.None,
                    'empty'
                )
            ];
        }

        const fileName = editor.document.fileName;
        const fileSize = editor.document.getText().length;
        const lineCount = editor.document.lineCount;
        const language = editor.document.languageId;

        const suggestions: ClawItem[] = [];

        // Item 1: Informações do arquivo
        const fileInfoItem = new ClawItem(
            `📊 Arquivo: ${this.getFileName(fileName)}`,
            vscode.TreeItemCollapsibleState.None,
            'fileInfo',
            `Arquivo: ${fileName}\nTamanho: ${this.formatBytes(fileSize)}\nLinhas: ${lineCount}`,
            `${lineCount} linhas`,
            'file',
            {
                command: 'vscode.open',
                title: 'Abrir',
                arguments: [editor.document.uri]
            }
        );
        suggestions.push(fileInfoItem);

        // Item 2: Analisar
        const analyzeItem = new ClawItem(
            '🔍 Analisar este arquivo',
            vscode.TreeItemCollapsibleState.None,
            'suggestion',
            'Clique para analisar o arquivo aberto',
            'Encontra problemas e oportunidades',
            'search',
            {
                command: 'clawagent.analyze',
                title: 'Analisar'
            }
        );
        suggestions.push(analyzeItem);

        // Item 3: Refatorar
        const improveItem = new ClawItem(
            '✨ Refatorar código',
            vscode.TreeItemCollapsibleState.None,
            'suggestion',
            'Clique para refatorar o arquivo',
            'Melhora legibilidade e performance',
            'sparkle',
            {
                command: 'clawagent.improve',
                title: 'Melhorar'
            }
        );
        suggestions.push(improveItem);

        // Item 4: Gerar testes
        const testItem = new ClawItem(
            '🧪 Gerar testes',
            vscode.TreeItemCollapsibleState.None,
            'suggestion',
            'Clique para gerar testes',
            'Cria testes unitários',
            'testing-run-all-icon',
            {
                command: 'clawagent.test',
                title: 'Testar'
            }
        );
        suggestions.push(testItem);

        // Item 5: Documentar
        const documentItem = new ClawItem(
            '📚 Documentar',
            vscode.TreeItemCollapsibleState.None,
            'suggestion',
            'Clique para gerar documentação',
            'Gera documentação Markdown',
            'book',
            {
                command: 'clawagent.document',
                title: 'Documentar'
            }
        );
        suggestions.push(documentItem);

        // Item 6: Linguagem
        const languageItem = new ClawItem(
            `🔤 Linguagem: ${this.getLanguageLabel(language)}`,
            vscode.TreeItemCollapsibleState.None,
            'language',
            `Linguagem de programação: ${language}`,
            language,
            'symbol-field'
        );
        suggestions.push(languageItem);

        return suggestions;
    }

    /**
     * Métodos auxiliares
     */
    private getFileName(fullPath: string): string {
        return fullPath.split('/').pop() || 'arquivo';
    }

    private formatBytes(bytes: number): string {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    }

    private getLanguageLabel(lang: string): string {
        const labels: { [key: string]: string } = {
            'python': 'Python 🐍',
            'typescript': 'TypeScript 📘',
            'javascript': 'JavaScript 📙',
            'java': 'Java ☕',
            'cpp': 'C++ 🔧',
            'csharp': 'C# 🎮',
            'go': 'Go 🚀',
            'rust': 'Rust 🦀',
            'php': 'PHP 🐘',
            'ruby': 'Ruby 💎',
            'markdown': 'Markdown 📝',
            'json': 'JSON 📋',
            'html': 'HTML 🌐',
            'css': 'CSS 🎨'
        };
        return labels[lang] || lang.toUpperCase();
    }

    refresh(): void {
        console.log('🔄 Atualizando sugestões do CLAW...');
        this._onDidChangeTreeData.fire();
    }
}

/**
 * 🌳 Classe para representar um item na árvore de sugestões
 *
 * Estende vscode.TreeItem com propriedades ricas:
 * - iconPath com temas
 * - tooltip informativo
 * - description customizável
 * - command vinculado ao item
 * - contextValue para ações
 */
export class ClawItem extends vscode.TreeItem {
    constructor(
        label: string,
        collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.None,
        contextValue?: string,
        tooltip?: string,
        description?: string,
        iconName?: string,
        command?: vscode.Command
    ) {
        super(label, collapsibleState);

        this.contextValue = contextValue || 'clawItem';

        if (tooltip) {
            this.tooltip = new vscode.MarkdownString(tooltip);
        }

        if (description) {
            this.description = description;
        }

        // Definir ícone usando ThemeIcon (icon name como string)
        if (iconName) {
            this.iconPath = new vscode.ThemeIcon(iconName);
        } else {
            this.iconPath = new vscode.ThemeIcon('folder');
        }

        // Definir comando se fornecido
        if (command) {
            this.command = command;
        }
    }
}
