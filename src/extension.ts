/**
 * 🤖 CLAW AGENT v1.2.0
 * Agente profissional de IA para VS Code
 *
 * Comandos:
 * - analyze: encontra bugs e melhorias
 * - improve: refatora e otimiza
 * - document: gera documentação
 * - test: cria testes automáticos
 * - ask: responde perguntas sobre código
 * - status: mostra status e ajuda
 *
 * ✅ Cross-platform: Windows, macOS, Linux
 * ✅ Suporte a múltiplas IAs: OpenAI, Gemini, Claude, Ollama, LocalAI
 * ✅ Detecção automática de linguagem
 * ✅ Tratamento robusto de erros
 * ✅ Toggle ON/OFF na barra de status
 */

import * as vscode from 'vscode';
import { AgentManager } from './agentManager';
import { ClawSettingsTreeProvider, ClawDataProvider } from './views/clawTreeProvider';

let agentManager: AgentManager;
let isEnabled = false;
let statusBarItem: vscode.StatusBarItem;
let lastResultTitle = '';
let lastResultContent = '';

export async function activate(context: vscode.ExtensionContext) {
    console.log('🤖 Iniciando CLAW Agent v1.2.0...');

    try {
        // ═══════════════════════════════════════════════════════════════════
        // 1. REGISTRAR TREE VIEW PROVIDERS
        // ═══════════════════════════════════════════════════════════════════
        const settingsProvider = new ClawSettingsTreeProvider();
        context.subscriptions.push(
            vscode.window.registerTreeDataProvider('clawagent.settings', settingsProvider)
        );
        console.log('✅ Provider de Configurações registrado');

        const suggestionsProvider = new ClawDataProvider();
        context.subscriptions.push(
            vscode.window.registerTreeDataProvider('clawSuggestions', suggestionsProvider)
        );
        console.log('✅ Provider de Sugestões registrado');

        // ═══════════════════════════════════════════════════════════════════
        // 2. REGISTRAR COMANDOS DOS TREE VIEWS
        // ═══════════════════════════════════════════════════════════════════
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.refresh', () => {
                settingsProvider.refresh();
            })
        );

        context.subscriptions.push(
            vscode.commands.registerCommand('claw.refreshEntry', () => {
                suggestionsProvider.refresh();
            })
        );

        context.subscriptions.push(
            vscode.commands.registerCommand('claw.deleteEntry', async (item) => {
                if (!item) {
                    vscode.window.showWarningMessage('❌ Selecione uma sugestão para deletar');
                    return;
                }
                const pick = await vscode.window.showQuickPick(['Sim, deletar', 'Cancelar'], {
                    placeHolder: `Deletar: ${item.label}?`
                });
                if (pick === 'Sim, deletar') {
                    vscode.window.showInformationMessage(`🗑️ Sugestão deletada: ${item.label}`);
                    suggestionsProvider.refresh();
                }
            })
        );

        // ═══════════════════════════════════════════════════════════════════
        // 3. CRIAR STATUS BAR ITEM
        // ═══════════════════════════════════════════════════════════════════
        statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        statusBarItem.command = 'clawagent.showMenu';
        statusBarItem.tooltip = 'Clique para abrir o menu de comandos CLAW Agent';
        isEnabled = false;
        updateStatusBar();
        statusBarItem.show();
        context.subscriptions.push(statusBarItem);
        console.log('✅ Status Bar Item criado');

        // ═══════════════════════════════════════════════════════════════════
        // 4. INICIALIZAR AGENT MANAGER
        // ═══════════════════════════════════════════════════════════════════
        try {
            agentManager = new AgentManager();
            await agentManager.initialize();
            console.log('✅ AgentManager inicializado');
        } catch (agentError) {
            console.warn('⚠️ AgentManager não inicializou completamente:', agentError);
        }

        // ═══════════════════════════════════════════════════════════════════
        // 5. REGISTRAR COMANDOS PRINCIPAIS
        // ═══════════════════════════════════════════════════════════════════

        // TOGGLE ON/OFF
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.toggle', () => {
                isEnabled = !isEnabled;
                updateStatusBar();

                if (isEnabled) {
                    vscode.window.showInformationMessage('🚀 CLAW Agent ativado');
                } else {
                    vscode.window.showWarningMessage('🛑 CLAW Agent desativado');
                }
            })
        );

        // MOSTRAR MENU
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.showMenu', async () => {
                const items: vscode.QuickPickItem[] = [
                    { label: '🔍 Analisar Código', description: 'Encontra bugs e melhorias' },
                    { label: '✨ Melhorar Código', description: 'Refatora e otimiza' },
                    { label: '📚 Gerar Documentação', description: 'Cria documentação automática' },
                    { label: '🧪 Criar Testes', description: 'Gera testes unitários' },
                    { label: '❓ Fazer Pergunta', description: 'Responde perguntas sobre código' },
                    { label: 'ℹ️ Status', description: 'Mostra informações do agente' },
                    { label: '⚙️ Configurações', description: 'Abre as configurações' },
                    { label: isEnabled ? '🔴 Desativar' : '🟢 Ativar', description: isEnabled ? 'Desativa o agente' : 'Ativa o agente' }
                ];

                const choice = await vscode.window.showQuickPick(items, {
                    placeHolder: '🤖 Selecione um comando...',
                    matchOnDescription: true
                });

                if (!choice) return;

                const commandMap: Record<string, string> = {
                    '🔍 Analisar Código': 'clawagent.analyze',
                    '✨ Melhorar Código': 'clawagent.improve',
                    '📚 Gerar Documentação': 'clawagent.document',
                    '🧪 Criar Testes': 'clawagent.test',
                    '❓ Fazer Pergunta': 'clawagent.ask',
                    'ℹ️ Status': 'clawagent.status',
                    '⚙️ Configurações': 'clawagent.openSettings',
                    '🔴 Desativar': 'clawagent.toggle',
                    '🟢 Ativar': 'clawagent.toggle'
                };

                const cmd = commandMap[choice.label];
                if (cmd) {
                    vscode.commands.executeCommand(cmd);
                }
            })
        );

        // MOSTRAR ÚLTIMO RESULTADO
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.showLastResult', () => {
                if (lastResultTitle && lastResultContent) {
                    showResultPanel(lastResultTitle, lastResultContent);
                } else {
                    vscode.window.showInformationMessage('ℹ️ Nenhum resultado anterior encontrado');
                }
            })
        );

        // ANALISAR CÓDIGO
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.analyze', async () => {
                if (!ensureEnabled()) return;

                const editor = vscode.window.activeTextEditor;
                const { code, filePath } = getEditorContent(editor, 'analisar');
                if (!code) return;

                const progress = await vscode.window.withProgress(
                    { location: vscode.ProgressLocation.Notification, title: '🔍 Analisando código...' },
                    async () => agentManager.analyze(code, filePath)
                );

                if (progress) showResultPanel('Análise de Código', progress);
            })
        );

        // MELHORAR CÓDIGO
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.improve', async () => {
                if (!ensureEnabled()) return;

                const editor = vscode.window.activeTextEditor;
                const { code, filePath } = getEditorContent(editor, 'melhorar');
                if (!code) return;

                const progress = await vscode.window.withProgress(
                    { location: vscode.ProgressLocation.Notification, title: '✨ Melhorando código...' },
                    async () => agentManager.improve(code, filePath)
                );

                if (progress) showResultPanel('Código Melhorado', progress);
            })
        );

        // GERAR DOCUMENTAÇÃO
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.document', async () => {
                if (!ensureEnabled()) return;

                const editor = vscode.window.activeTextEditor;
                const { code, filePath } = getEditorContent(editor, 'documentar');
                if (!code) return;

                const progress = await vscode.window.withProgress(
                    { location: vscode.ProgressLocation.Notification, title: '📚 Gerando documentação...' },
                    async () => agentManager.document(code, filePath)
                );

                if (progress) showResultPanel('Documentação Gerada', progress);
            })
        );

        // CRIAR TESTES
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.test', async () => {
                if (!ensureEnabled()) return;

                const editor = vscode.window.activeTextEditor;
                const { code, filePath } = getEditorContent(editor, 'criar testes');
                if (!code) return;

                const progress = await vscode.window.withProgress(
                    { location: vscode.ProgressLocation.Notification, title: '🧪 Criando testes...' },
                    async () => agentManager.test(code, filePath)
                );

                if (progress) showResultPanel('Testes Criados', progress);
            })
        );

        // FAZER PERGUNTA
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.ask', async () => {
                if (!ensureEnabled()) return;

                const question = await vscode.window.showInputBox({
                    prompt: '❓ Qual é sua pergunta sobre o código?',
                    placeHolder: 'Ex: Como posso melhorar a performance deste código?'
                });

                if (!question) return;

                const code = vscode.window.activeTextEditor?.document.getText() || '';

                const progress = await vscode.window.withProgress(
                    { location: vscode.ProgressLocation.Notification, title: '❓ Processando pergunta...' },
                    async () => agentManager.ask(question, code)
                );

                if (progress) showResultPanel('Resposta', progress);
            })
        );

        // MOSTRAR STATUS
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.status', async () => {
                if (!agentManager) {
                    vscode.window.showErrorMessage('❌ AgentManager não inicializado');
                    return;
                }
                const status = await agentManager.getStatus();
                showResultPanel('CLAW Agent - Status', status);
            })
        );

        // ABRIR CONFIGURAÇÕES
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.openSettings', async () => {
                await vscode.commands.executeCommand('workbench.action.openSettings', '@ext:claw-agent');
            })
        );

        console.log('✅ CLAW Agent v1.2.0 ativado com sucesso!');

    } catch (error) {
        console.error('❌ Erro ao ativar CLAW Agent:', error);
        vscode.window.showErrorMessage('❌ Erro ao ativar CLAW Agent. Veja o console para detalhes.');
    }
}

/**
 * Verifica se o agente está habilitado
 */
function ensureEnabled(): boolean {
    if (!isEnabled) {
        vscode.window.showWarningMessage('❌ CLAW Agent está desativado. Clique no ícone 🤖 na barra de status para ativar.');
        return false;
    }
    if (!agentManager) {
        vscode.window.showErrorMessage('❌ CLAW Agent não foi inicializado corretamente. Recarregue a janela.');
        return false;
    }
    return true;
}

/**
 * Obtém conteúdo do editor ativo
 */
function getEditorContent(editor: vscode.TextEditor | undefined, action: string): { code: string; filePath: string } {
    if (!editor) {
        vscode.window.showWarningMessage(`❌ Abra um arquivo no editor para ${action}`);
        return { code: '', filePath: '' };
    }

    const code = editor.document.getText();
    if (!code.trim()) {
        vscode.window.showWarningMessage('❌ O arquivo está vazio');
        return { code: '', filePath: '' };
    }

    return { code, filePath: editor.document.fileName };
}

/**
 * Atualiza o status bar visual com base no estado do agente
 */
function updateStatusBar() {
    if (isEnabled) {
        statusBarItem.text = '$(robot) CLAW On';
        statusBarItem.tooltip = 'CLAW Agent está ativo — clique para abrir o menu';
        statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
    } else {
        statusBarItem.text = '$(robot) CLAW Off';
        statusBarItem.tooltip = 'CLAW Agent está desativado — clique para abrir o menu';
        statusBarItem.backgroundColor = undefined;
    }
    statusBarItem.show();
}

/**
 * Mostra resultado em um painel webview
 */
function showResultPanel(title: string, content: string) {
    lastResultTitle = title;
    lastResultContent = content;

    const panel = vscode.window.createWebviewPanel(
        'clawAgentResult',
        `🤖 CLAW - ${title}`,
        vscode.ViewColumn.Beside,
        { enableScripts: true }
    );

    const isDark = vscode.window.activeColorTheme?.kind === vscode.ColorThemeKind.Dark;
    const bgColor = isDark ? '#1e1e1e' : '#ffffff';
    const textColor = isDark ? '#e0e0e0' : '#333333';
    const codeBg = isDark ? '#2d2d2d' : '#f5f5f5';
    const accentColor = '#4fc3f7';

    // Sanitiza conteúdo para evitar XSS
    const sanitizedLines = content
        .split('\n')
        .map(line => escapeHtml(line))
        .map(line => {
            if (line.startsWith('#')) {
                const level = line.match(/^#+/)[0].length;
                const text = line.replace(/^#+\s*/, '');
                return `<h${Math.min(level + 1, 4)}>${text}</h${Math.min(level + 1, 4)}>`;
            }
            if (line.trim() === '') return '<br>';
            if (line.startsWith('  ') || line.startsWith('\t')) {
                return `<code>${line}</code><br>`;
            }
            return `<p>${line}</p>`;
        })
        .join('');

    panel.webview.html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline';">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            padding: 24px; line-height: 1.6; color: ${textColor};
            background-color: ${bgColor}; word-wrap: break-word; overflow-wrap: break-word;
            max-width: 100vw;
        }
        h1 {
            color: ${accentColor}; border-bottom: 2px solid ${accentColor};
            padding-bottom: 10px; margin-bottom: 20px; font-size: 24px;
        }
        h2 { color: ${accentColor}; margin-top: 20px; margin-bottom: 10px; font-size: 20px; }
        h3 { color: ${accentColor}; margin-top: 16px; margin-bottom: 8px; font-size: 16px; }
        h4 { color: ${accentColor}; margin-top: 14px; margin-bottom: 6px; font-size: 14px; }
        pre {
            background-color: ${codeBg}; padding: 16px; border-radius: 6px;
            overflow-x: auto; border-left: 3px solid ${accentColor};
            margin: 12px 0; max-width: 100%;
        }
        code {
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 13px; line-height: 1.5;
        }
        p { margin-bottom: 10px; }
        ul, ol { margin-left: 24px; margin-bottom: 12px; }
        li { margin-bottom: 4px; }
        .copy-btn {
            background-color: ${accentColor}; color: ${bgColor}; border: none;
            padding: 10px 20px; border-radius: 4px; cursor: pointer;
            margin-top: 12px; font-weight: bold; font-size: 14px;
            transition: all 0.2s ease;
        }
        .copy-btn:hover { opacity: 0.85; transform: scale(1.03); }
        .copy-btn:active { transform: scale(0.97); }
        strong { color: ${accentColor}; }
        a { color: ${accentColor}; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <h1>📋 ${escapeHtml(title)}</h1>
    <div id="content">${sanitizedLines}</div>
    <button class="copy-btn" onclick="copyContent()">📋 Copiar resultado</button>
    <script>
        function copyContent() {
            const content = document.getElementById('content').innerText;
            navigator.clipboard.writeText(content).then(() => {
                const btn = document.querySelector('.copy-btn');
                const original = btn.innerText;
                btn.innerText = '✅ Copiado!';
                btn.disabled = true;
                setTimeout(() => { btn.innerText = original; btn.disabled = false; }, 2000);
            }).catch(() => {
                alert('❌ Não foi possível copiar. Copie manualmente.');
            });
        }
    </script>
</body>
</html>`;

    // Limpar o painel quando fechado
    panel.onDidDispose(() => {
        console.log('📋 Painel de resultado fechado');
    });
}

/**
 * Escapa caracteres especiais para HTML (previne XSS)
 */
function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export function deactivate() {
    console.log('👋 CLAW Agent desativado');
}
