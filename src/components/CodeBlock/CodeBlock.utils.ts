import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";

hljs.registerLanguage("typescript", typescript);

export { hljs };

export const tokenColors: Record<string, string> = {
    "hljs-keyword": "#67e8f9",
    "hljs-string": "#86efac",
    "hljs-comment": "#71717a",
    "hljs-number": "#fca5a5",
    "hljs-title": "#fafafa",
    "hljs-built_in": "#67e8f9",
    "hljs-attr": "#fca5a5",
    "hljs-tag": "#67e8f9",
};

function decodeEntities(str: string): string {
    return str
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, "\"")
        .replace(/&#x27;/g, "'")
        .replace(/&#x60;/g, "`");
}

export function parseTokens(html: string): { text: string; color: string }[] {
    const tokens: { text: string; color: string }[] = [];
    const regex = /<span class="([^"]+)">([^<]+)<\/span>|([^<]+)/g;
    let match;

    while ((match = regex.exec(html)) !== null) {
        if (match[1] && match[2]) {
            tokens.push({
                text: decodeEntities(match[2]),
                color: tokenColors[match[1]] ?? "#a1a1aa",
            });
        } else if (match[3]) {
            tokens.push({
                text: decodeEntities(match[3]),
                color: "#a1a1aa",
            });
        }
    }

    return tokens;
}
