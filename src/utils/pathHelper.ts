/**
 * 🛠️ PathHelper - Utilidades para caminhos cross-platform
 * Oferece compatibilidade completa: Windows, macOS, Linux
 */

import * as path from 'path';
import * as os from 'os';

export class PathHelper {
    /**
     * Normaliza caminhos para o SO atual
     * @param filePath Caminho do arquivo
     * @returns Caminho normalizado
     */
    static normalize(filePath: string): string {
        return path.normalize(filePath);
    }

    /**
     * Extrai extensão do arquivo
     * @param filePath Caminho do arquivo
     * @returns Extensão (ex: '.ts', '.py')
     */
    static getExtension(filePath: string): string {
        return path.extname(filePath);
    }

    /**
     * Extrai nome do arquivo sem extensão
     * @param filePath Caminho do arquivo
     * @returns Nome do arquivo
     */
    static getFileName(filePath: string): string {
        return path.basename(filePath);
    }

    /**
     * Extrai diretório do arquivo
     * @param filePath Caminho do arquivo
     * @returns Diretório
     */
    static getDirectory(filePath: string): string {
        return path.dirname(filePath);
    }

    /**
     * Obtém SO atual
     * @returns 'win32' (Windows), 'darwin' (macOS), 'linux' (Linux)
     */
    static getOS(): string {
        return process.platform;
    }

    /**
     * Verifica se é Windows
     */
    static isWindows(): boolean {
        return process.platform === 'win32';
    }

    /**
     * Verifica se é macOS
     */
    static isMacOS(): boolean {
        return process.platform === 'darwin';
    }

    /**
     * Verifica se é Linux
     */
    static isLinux(): boolean {
        return process.platform === 'linux';
    }

    /**
     * Obtém diretório do usuário
     */
    static getUserHome(): string {
        return os.homedir();
    }

    /**
     * Obtém diretório temporário
     */
    static getTempDir(): string {
        return os.tmpdir();
    }

    /**
     * Combina múltiplos segmentos de caminho
     * @param segments Segmentos do caminho
     * @returns Caminho completo
     */
    static join(...segments: string[]): string {
        return path.join(...segments);
    }

    /**
     * Obtém informações do SO em formato legível
     */
    static getSystemInfo(): string {
        const platform = process.platform;
        const arch = process.arch;
        const release = os.release();

        let osName = 'Unknown';
        if (platform === 'win32') osName = 'Windows';
        else if (platform === 'darwin') osName = 'macOS';
        else if (platform === 'linux') osName = 'Linux';

        return `${osName} ${release} (${arch})`;
    }

    /**
     * Detecta linguagem de programação pela extensão
     */
    static detectLanguage(filePath: string): string {
        const ext = this.getExtension(filePath).toLowerCase();

        const languageMap: { [key: string]: string } = {
            '.py': 'Python',
            '.js': 'JavaScript',
            '.ts': 'TypeScript',
            '.tsx': 'TypeScript React',
            '.jsx': 'JavaScript React',
            '.java': 'Java',
            '.cpp': 'C++',
            '.c': 'C',
            '.cs': 'C#',
            '.php': 'PHP',
            '.rb': 'Ruby',
            '.go': 'Go',
            '.rs': 'Rust',
            '.swift': 'Swift',
            '.kt': 'Kotlin',
            '.scala': 'Scala',
            '.sh': 'Shell',
            '.bash': 'Bash',
            '.zsh': 'Zsh',
            '.fish': 'Fish',
            '.sql': 'SQL',
            '.html': 'HTML',
            '.css': 'CSS',
            '.scss': 'SCSS',
            '.vue': 'Vue',
            '.json': 'JSON',
            '.yaml': 'YAML',
            '.yml': 'YAML',
            '.xml': 'XML',
            '.md': 'Markdown',
            '.tex': 'LaTeX'
        };

        return languageMap[ext] || 'Unknown';
    }

    /**
     * Formata caminho para exibição (remove informações do usuário em Windows)
     */
    static formatPathForDisplay(filePath: string): string {
        let displayPath = filePath;

        // Windows: remove caminho completo do usuário
        if (this.isWindows()) {
            const homeDir = os.homedir();
            if (filePath.startsWith(homeDir)) {
                displayPath = '~' + filePath.substring(homeDir.length);
            }
        }
        // macOS/Linux: substitui home por ~
        else {
            const homeDir = os.homedir();
            if (filePath.startsWith(homeDir)) {
                displayPath = '~' + filePath.substring(homeDir.length);
            }
        }

        return displayPath;
    }
}
