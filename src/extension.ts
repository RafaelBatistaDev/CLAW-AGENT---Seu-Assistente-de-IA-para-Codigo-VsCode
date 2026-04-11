/**
 * 🤖 CLAW AGENT v1.1.3 - REFATORADO
 * Agente profissional de IA focado em:
 * - analyze: encontra bugs e melhorias
 * - improve: refatora e otimiza
 * - document: gera documentação
 * - test: cria testes automáticos
 * - ask: responde perguntas sobre código
 * - status: mostra status e ajuda
 *
 * ✅ Cross-platform: Windows, macOS, Linux
 * ✅ Suporte a múltiplas IAs: OpenAI, Gemini, Claude, Ollama, LocalAI
 * ✅ Detecção automática de linguagem de programação
 * ✅ Tratamento robusto de erros com sugestões
 * ✅ Toggle ON/OFF na barra de tarefas
 */

import * as vscode from 'vscode';
import { AgentManager } from './agentManager';
import { ClawSettingsTreeProvider, ClawDataProvider } from './views/clawTreeProvider';

let agentManager: AgentManager;
let isEnabled = false;
let statusBarItem: vscode.StatusBarItem;
let lastResultTitle: string = '';
let lastResultContent: string = '';

export async function activate(context: vscode.ExtensionContext) {
    console.log('🤖 Iniciando CLAW Agent...');

    try {
        // ════════════════════════════════════════════════════════════════════════════════
        // 1️⃣ REGISTRAR TREE VIEW PROVIDERS
        // ════════════════════════════════════════════════════════════════════════════════
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

        // ════════════════════════════════════════════════════════════════════════════════
        // 2️⃣ REGISTRAR COMANDOS DO TREE VIEW
        // ════════════════════════════════════════════════════════════════════════════════
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.refresh', () => {
                settingsProvider?.refresh?.();
            })
        );

        context.subscriptions.push(
            vscode.commands.registerCommand('claw.refreshEntry', () => {
                suggestionsProvider?.refresh?.();
            })
        );

        context.subscriptions.push(
            vscode.commands.registerCommand('claw.deleteEntry', async (item) => {
                if (!item) {
                    vscode.window.showWarningMessage('Selecione uma sugestão para deletar');
                    return;
                }
                const pick = await vscode.window.showQuickPick(['Sim, deletar', 'Cancelar'], {
                    placeHolder: `Deletar: ${item.label}?`
                });
                if (pick === 'Sim, deletar') {
                    vscode.window.showInformationMessage(`Sugestão deletada: ${item.label}`);
                    suggestionsProvider?.refresh?.();
                }
            })
        );

        // ════════════════════════════════════════════════════════════════════════════════
        // 3️⃣ CRIAR STATUS BAR ITEM
        // ════════════════════════════════════════════════════════════════════════════════
        statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        statusBarItem.command = 'clawagent.showMenu';
        statusBarItem.tooltip = 'Clique para abrir o menu de comandos CLAW Agent';
        isEnabled = false;
        updateStatusBar();
        statusBarItem.show();
        context.subscriptions.push(statusBarItem);
        console.log('✅ Status Bar Item criado');

        // ════════════════════════════════════════════════════════════════════════════════
        // 4️⃣ INICIALIZAR AGENT MANAGER
        // ════════════════════════════════════════════════════════════════════════════════
        try {
            agentManager = new AgentManager();
            await agentManager.initialize();
            console.log('✅ AgentManager inicializado');
        } catch (agentError) {
            console.warn('⚠️ Aviso: AgentManager não inicializou completamente', agentError);
        }

        // ════════════════════════════════════════════════════════════════════════════════
        // 5️⃣ REGISTRAR COMANDOS PRINCIPAIS
        // ════════════════════════════════════════════════════════════════════════════════

        // COMANDO: TOGGLE ON/OFF
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.toggle', () => {
                isEnabled = !isEnabled;
                updateStatusBar();

                if (isEnabled) {
                    vscode.window.showInformationMessage('🚀 CLAW Agent: Ativado');
                } else {
                    vscode.window.showWarningMessage('🛑 CLAW Agent: Desativado');
                }
            })
        );

        // COMANDO: MOSTRAR MENU
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.showMenu', async () => {
                const items: vscode.QuickPickItem[] = [
                    {
                        label: '🔍 Analisar Código',
                        description: 'Encontra bugs e melhorias',
                        picked: false
                    },
                    {
                        label: '✨ Melhorar Código',
                        description: 'Refatora e otimiza',
                        picked: false
                    },
                    {
                        label: '📚 Gerar Documentação',
                        description: 'Cria documentação automática',
                        picked: false
                    },
                    {
                        label: '🧪 Criar Testes',
                        description: 'Gera testes unitários',
                        picked: false
                    },
                    {
                        label: '❓ Fazer Pergunta',
                        description: 'Responde perguntas sobre código',
                        picked: false
                    },
                    {
                        label: 'ℹ️ Status',
                        description: 'Mostra informações do agente',
                        picked: false
                    },
                    {
                        label: '⚙️ Configurações',
                        description: 'Abre as configurações',
                        picked: false
                    },
                    {
                        label: isEnabled ? '🔴 Desativar' : '🟢 Ativar',
                        description: isEnabled ? 'Desativa o agente' : 'Ativa o agente',
                        picked: false
                    }
                ];

                const choice = await vscode.window.showQuickPick(items, {
                    placeHolder: '🤖 Selecione um comando...',
                    matchOnDescription: true
                });

                if (!choice) return;

                switch (choice.label.split(' ')[1]) {
                    case 'Analisar':
                        vscode.commands.executeCommand('clawagent.analyze');
                        break;
                    case 'Melhorar':
                        vscode.commands.executeCommand('clawagent.improve');
                        break;
                    case 'Gerar':
                        vscode.commands.executeCommand('clawagent.document');
                        break;
                    case 'Criar':
                        vscode.commands.executeCommand('clawagent.test');
                        break;
                    case 'Fazer':
                        vscode.commands.executeCommand('clawagent.ask');
                        break;
                    case 'Status':
                        vscode.commands.executeCommand('clawagent.status');
                        break;
                    case 'Configurações':
                        vscode.commands.executeCommand('clawagent.openSettings');
                        break;
                    case 'Desativar':
                    case 'Ativar':
                        vscode.commands.executeCommand('clawagent.toggle');
                        break;
                }
            })
        );

        // COMANDO: MOSTRAR ÚLTIMO RESULTADO
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.showLastResult', () => {
                if (lastResultTitle && lastResultContent) {
                    showResultPanel(lastResultTitle, lastResultContent);
                }
            })
        );

        // COMANDO 1: ANALISAR CÓDIGO
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.analyze', async () => {
                if (!isEnabled) {
                    vscode.window.showWarningMessage('❌ CLAW Agent está desativado. Clique no botão na barra de tarefas para ativar.');
                    return;
                }

                const editor = vscode.window.activeTextEditor;
                if (!editor) {
                    vscode.window.showWarningMessage('❌ Abra um arquivo para analisar');
                    return;
                }

                const filePath = editor.document.fileName;
                const code = editor.document.getText();

                if (!code.trim()) {
                    vscode.window.showWarningMessage('❌ O arquivo está vazio');
                    return;
                }

                const progress = await vscode.window.withProgress(
                    { location: vscode.ProgressLocation.Notification, title: '🔍 Analisando código...' },
                    async () => {
                        return await agentManager.analyze(code, filePath);
                    }
                );

                if (progress) {
                    showResultPanel('Análise de Código', progress);
                }
            })
        );

        // COMANDO 2: MELHORAR CÓDIGO
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.improve', async () => {
                if (!isEnabled) {
                    vscode.window.showWarningMessage('❌ CLAW Agent está desativado. Clique no botão na barra de tarefas para ativar.');
                    return;
                }

                const editor = vscode.window.activeTextEditor;
                if (!editor) {
                    vscode.window.showWarningMessage('❌ Abra um arquivo para melhorar');
                    return;
                }

                const filePath = editor.document.fileName;
                const code = editor.document.getText();

                if (!code.trim()) {
                    vscode.window.showWarningMessage('❌ O arquivo está vazio');
                    return;
                }

                const progress = await vscode.window.withProgress(
                    { location: vscode.ProgressLocation.Notification, title: '✨ Melhorando código...' },
                    async () => {
                        return await agentManager.improve(code, filePath);
                    }
                );

                if (progress) {
                    showResultPanel('Código Melhorado', progress);
                }
            })
        );

        // COMANDO 3: GERAR DOCUMENTAÇÃO
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.document', async () => {
                if (!isEnabled) {
                    vscode.window.showWarningMessage('❌ CLAW Agent está desativado. Clique no botão na barra de tarefas para ativar.');
                    return;
                }

                const editor = vscode.window.activeTextEditor;
                if (!editor) {
                    vscode.window.showWarningMessage('❌ Abra um arquivo para documentar');
                    return;
                }

                const filePath = editor.document.fileName;
                const code = editor.document.getText();

                if (!code.trim()) {
                    vscode.window.showWarningMessage('❌ O arquivo está vazio');
                    return;
                }

                const progress = await vscode.window.withProgress(
                    { location: vscode.ProgressLocation.Notification, title: '📚 Gerando documentação...' },
                    async () => {
                        return await agentManager.document(code, filePath);
                    }
                );

                if (progress) {
                    showResultPanel('Documentação Gerada', progress);
                }
            })
        );

        // COMANDO 4: CRIAR TESTES
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.test', async () => {
                if (!isEnabled) {
                    vscode.window.showWarningMessage('❌ CLAW Agent está desativado. Clique no botão na barra de tarefas para ativar.');
                    return;
                }

                const editor = vscode.window.activeTextEditor;
                if (!editor) {
                    vscode.window.showWarningMessage('❌ Abra um arquivo para criar testes');
                    return;
                }

                const filePath = editor.document.fileName;
                const code = editor.document.getText();

                if (!code.trim()) {
                    vscode.window.showWarningMessage('❌ O arquivo está vazio');
                    return;
                }

                const progress = await vscode.window.withProgress(
                    { location: vscode.ProgressLocation.Notification, title: '🧪 Criando testes...' },
                    async () => {
                        return await agentManager.test(code, filePath);
                    }
                );

                if (progress) {
                    showResultPanel('Testes Criados', progress);
                }
            })
        );

        // COMANDO 5: FAZER PERGUNTA
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.ask', async () => {
                if (!isEnabled) {
                    vscode.window.showWarningMessage('❌ CLAW Agent está desativado. Clique no botão na barra de tarefas para ativar.');
                    return;
                }

                const question = await vscode.window.showInputBox({
                    prompt: 'Qual é sua pergunta?',
                    placeHolder: 'Ex: Como melhorar este código?'
                });

                if (!question) return;

                const editor = vscode.window.activeTextEditor;
                let code = '';

                if (editor) {
                    code = editor.document.getText();
                }

                const progress = await vscode.window.withProgress(
                    { location: vscode.ProgressLocation.Notification, title: '❓ Processando pergunta...' },
                    async () => {
                        return await agentManager.ask(question, code);
                    }
                );

                if (progress) {
                    showResultPanel('Resposta do Agent', progress);
                }
            })
        );

        // COMANDO 6: MOSTRAR STATUS
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.status', async () => {
                const status = await agentManager.getStatus();
                showResultPanel('CLAW Agent - Status', status);
            })
        );

        // COMANDO 7: ABRIR CONFIGURAÇÕES
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.openSettings', async () => {
                await vscode.commands.executeCommand('workbench.action.openSettings', 'claw-agent');
            })
        );

        console.log('✅ CLAW Agent v1.1.3 ativado com sucesso!');

    } catch (error) {
        console.error('❌ Erro ao ativar CLAW Agent:', error);
    }
}

/**
 * Atualiza o status bar visual com base no estado do agente
 */
function updateStatusBar() {
    if (isEnabled) {
        statusBarItem.text = '$(robot) CLAW On';
        statusBarItem.tooltip = 'CLAW Agent está ativo - clique para abrir o menu';
        statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
    } else {
        statusBarItem.text = '$(robot) CLAW Off';
        statusBarItem.tooltip = 'CLAW Agent está desativado - clique para abrir o menu';
        statusBarItem.backgroundColor = undefined;
    }
    statusBarItem.show();
    console.log(`📊 Status Bar atualizado: ${statusBarItem.text}`);
}

/**
 * Mostra resultado em um painel webview com suporte cross-platform
 */
function showResultPanel(title: string, content: string) {
    lastResultTitle = title;
    lastResultContent = content;

    const panel = vscode.window.createWebviewPanel(
        'clawAgentResult',
        title,
        vscode.ViewColumn.Beside,
        { enableScripts: true }
    );

    const isDark = vscode.window.activeColorTheme?.kind === vscode.ColorThemeKind.Dark;
    const bgColor = isDark ? '#1e1e1e' : '#ffffff';
    const textColor = isDark ? '#e0e0e0' : '#333333';
    const codeBg = isDark ? '#2d2d2d' : '#f5f5f5';
    const accentColor = '#4fc3f7';

    panel.webview.html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    padding: 20px;
                    line-height: 1.6;
                    color: ${textColor};
                    background-color: ${bgColor};
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                }

                h1 {
                    color: ${accentColor};
                    border-bottom: 2px solid ${accentColor};
                    padding-bottom: 10px;
                    margin-bottom: 20px;
                    font-size: 24px;
                }

                h2 {
                    color: ${accentColor};
                    margin-top: 15px;
                    margin-bottom: 10px;
                    font-size: 18px;
                }

                pre {
                    background-color: ${codeBg};
                    padding: 15px;
                    border-radius: 5px;
                    overflow-x: auto;
                    border-left: 3px solid ${accentColor};
                    margin: 10px 0;
                    max-width: 100%;
                }

                code {
                    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
                    font-size: 13px;
                    line-height: 1.5;
                }

                p {
                    margin-bottom: 10px;
                }

                ul, ol {
                    margin-left: 20px;
                    margin-bottom: 10px;
                }

                li {
                    margin-bottom: 5px;
                }

                .copy-btn {
                    background-color: ${accentColor};
                    color: ${bgColor};
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-top: 10px;
                    font-weight: bold;
                    font-size: 14px;
                    transition: all 0.3s ease;
                }

                .copy-btn:hover {
                    opacity: 0.8;
                    transform: scale(1.05);
                }

                .copy-btn:active {
                    transform: scale(0.95);
                }

                strong {
                    color: ${accentColor};
                }

                a {
                    color: ${accentColor};
                    text-decoration: none;
                }

                a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <h1>📋 ${escapeHtml(title)}</h1>
            <div id="content"></div>
            <button class="copy-btn" onclick="copyToClipboard()">📋 Copiar resultado</button>

            <script>
                function copyToClipboard() {
                    const content = document.getElementById('content').innerText;
                    navigator.clipboard.writeText(content).then(() => {
                        const btn = event.target;
                        const originalText = btn.innerText;
                        btn.innerText = '✅ Copiado!';
                        setTimeout(() => {
                            btn.innerText = originalText;
                        }, 2000);
                    }).catch(err => {
                        alert('❌ Falha ao copiar');
                        console.error(err);
                    });
                }

                const content = ${JSON.stringify(content)};
                document.getElementById('content').innerHTML = content
                    .split('\\n')
                    .map(line => {
                        if (line.startsWith('# ')) return '<h2>' + line.substring(2) + '</h2>';
                        if (line.startsWith('## ')) return '<h3>' + line.substring(3) + '</h3>';
                        if (line.trim() === '') return '<br>';
                        if (line.startsWith('  ')) return '<code>' + line + '</code><br>';
                        return '<p>' + line + '</p>';
                    })
                    .join('');
            </script>
        </body>
        </html>
    `;
}

/**
 * Escapa caracteres especiais para HTML
 */
function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export function deactivate() {}
