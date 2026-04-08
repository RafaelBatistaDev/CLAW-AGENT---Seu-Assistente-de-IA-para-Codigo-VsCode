/**
 * 🤖 CLAW AGENT v1.1.2
 * Agente profissional de IA focado em:
 * - analyze: encontra bugs e melhorias
 * - improve: refatora e otimiza
 * - document: gera documentação
 * - test: cria testes automáticos
 * - ask: responde perguntas sobre código
 * - status: mostra status e ajuda
 */

import * as vscode from 'vscode';
import { AgentManager } from './agentManager';

let agentManager: AgentManager;

export async function activate(context: vscode.ExtensionContext) {
    try {
        console.log('🤖 Ativando CLAW Agent v1.1.2...');

        // Inicializar gerenciador de agentes
        agentManager = new AgentManager();
        await agentManager.initialize();

        // ════════════════════════════════════════════════════════════════════════════════
        // COMANDO 1: ANALISAR CÓDIGO
        // ════════════════════════════════════════════════════════════════════════════════
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.analyze', async () => {
                const editor = vscode.window.activeTextEditor;
                if (!editor) {
                    vscode.window.showWarningMessage('❌ Abra um arquivo para analisar');
                    return;
                }

                const filePath = editor.document.fileName;
                const code = editor.document.getText();
                
                vscode.window.showInformationMessage('🔍 Analisando código...');
                const result = await agentManager.analyze(code, filePath);
                
                if (result) {
                    showResultPanel('Análise de Código', result);
                }
            })
        );

        // ════════════════════════════════════════════════════════════════════════════════
        // COMANDO 2: MELHORAR CÓDIGO
        // ════════════════════════════════════════════════════════════════════════════════
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.improve', async () => {
                const editor = vscode.window.activeTextEditor;
                if (!editor) {
                    vscode.window.showWarningMessage('❌ Abra um arquivo para melhorar');
                    return;
                }

                const filePath = editor.document.fileName;
                const code = editor.document.getText();
                
                vscode.window.showInformationMessage('✨ Melhorando código...');
                const result = await agentManager.improve(code, filePath);
                
                if (result) {
                    showResultPanel('Código Melhorado', result);
                }
            })
        );

        // ════════════════════════════════════════════════════════════════════════════════
        // COMANDO 3: GERAR DOCUMENTAÇÃO
        // ════════════════════════════════════════════════════════════════════════════════
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.document', async () => {
                const editor = vscode.window.activeTextEditor;
                if (!editor) {
                    vscode.window.showWarningMessage('❌ Abra um arquivo para documentar');
                    return;
                }

                const filePath = editor.document.fileName;
                const code = editor.document.getText();
                
                vscode.window.showInformationMessage('📚 Gerando documentação...');
                const result = await agentManager.document(code, filePath);
                
                if (result) {
                    showResultPanel('Documentação Gerada', result);
                }
            })
        );

        // ════════════════════════════════════════════════════════════════════════════════
        // COMANDO 4: CRIAR TESTES
        // ════════════════════════════════════════════════════════════════════════════════
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.test', async () => {
                const editor = vscode.window.activeTextEditor;
                if (!editor) {
                    vscode.window.showWarningMessage('❌ Abra um arquivo para criar testes');
                    return;
                }

                const filePath = editor.document.fileName;
                const code = editor.document.getText();
                
                vscode.window.showInformationMessage('🧪 Criando testes...');
                const result = await agentManager.test(code, filePath);
                
                if (result) {
                    showResultPanel('Testes Criados', result);
                }
            })
        );

        // ════════════════════════════════════════════════════════════════════════════════
        // COMANDO 5: FAZER PERGUNTA
        // ════════════════════════════════════════════════════════════════════════════════
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.ask', async () => {
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

                vscode.window.showInformationMessage('❓ Processando pergunta...');
                const result = await agentManager.ask(question, code);
                
                if (result) {
                    showResultPanel('Resposta do Agent', result);
                }
            })
        );

        // ════════════════════════════════════════════════════════════════════════════════
        // COMANDO 6: MOSTRAR STATUS
        // ════════════════════════════════════════════════════════════════════════════════
        context.subscriptions.push(
            vscode.commands.registerCommand('clawagent.status', async () => {
                const status = await agentManager.getStatus();
                showResultPanel('CLAW Agent - Status', status);
            })
        );

        console.log('✅ CLAW Agent v1.0.2 ativado com sucesso!');
        vscode.window.showInformationMessage('✅ CLAW Agent v1.0.2 pronto!');

    } catch (error) {
        console.error('❌ Erro ao ativar CLAW Agent:', error);
        vscode.window.showErrorMessage(`❌ Erro ao ativar CLAW Agent: ${error}`);
    }
}

/**
 * Mostra resultado em um painel
 */
function showResultPanel(title: string, content: string) {
    const panel = vscode.window.createWebviewPanel(
        'clawAgentResult',
        title,
        vscode.ViewColumn.Beside,
        { enableScripts: true }
    );

    panel.webview.html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    padding: 20px;
                    line-height: 1.6;
                    color: #e0e0e0;
                    background-color: #1e1e1e;
                }
                h1 {
                    color: #4fc3f7;
                    border-bottom: 2px solid #4fc3f7;
                    padding-bottom: 10px;
                }
                pre {
                    background-color: #2d2d2d;
                    padding: 15px;
                    border-radius: 5px;
                    overflow-x: auto;
                    border-left: 3px solid #4fc3f7;
                }
                code {
                    font-family: 'Consolas', 'Monaco', monospace;
                    font-size: 13px;
                }
                .copy-btn {
                    background-color: #4fc3f7;
                    color: #1e1e1e;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-top: 10px;
                    font-weight: bold;
                }
                .copy-btn:hover {
                    background-color: #81d4fa;
                }
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            <pre><code>${escapeHtml(content)}</code></pre>
            <button class="copy-btn" onclick="copyToClipboard()">📋 Copiar</button>
            <script>
                function copyToClipboard() {
                    const code = document.querySelector('code').innerText;
                    navigator.clipboard.writeText(code).then(() => {
                        alert('✅ Copiado para área de transferência!');
                    });
                }
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
