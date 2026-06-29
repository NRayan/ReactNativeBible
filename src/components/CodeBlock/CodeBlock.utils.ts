import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import bash from "highlight.js/lib/languages/bash";
import type { CodeLanguage } from "./types";

hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("tsx", typescript);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("xml", xml);

export { hljs };

export const languageLabels: Record<CodeLanguage, string> = {
    typescript: "TypeScript",
    tsx: "TSX",
    bash: "Bash",
    xml: "XML",
};

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

function parseNodes(html: string, inheritColor: string): { text: string; color: string }[] {
    const tokens: { text: string; color: string }[] = [];
    let i = 0;

    while (i < html.length) {
        if (html[i] !== "<") {
            const next = html.indexOf("<", i);
            const end = next === -1 ? html.length : next;
            const text = decodeEntities(html.slice(i, end));
            if (text) tokens.push({ text, color: inheritColor });
            i = end;
            continue;
        }

        if (html.startsWith("</span>", i)) {
            i += 7;
            continue;
        }

        const tagEnd = html.indexOf(">", i);
        if (tagEnd === -1) { i++; continue; }

        const classMatch = /class="([^"]+)"/.exec(html.slice(i, tagEnd + 1));
        if (!classMatch) { i = tagEnd + 1; continue; }

        const color = tokenColors[classMatch[1]] ?? inheritColor;

        // Find matching </span> accounting for nesting
        let depth = 1;
        let j = tagEnd + 1;
        while (j < html.length && depth > 0) {
            if (html.startsWith("<span", j)) { depth++; j += 5; }
            else if (html.startsWith("</span>", j)) { depth--; if (depth > 0) j += 7; }
            else j++;
        }

        tokens.push(...parseNodes(html.slice(tagEnd + 1, j), color));
        i = j + 7;
    }

    return tokens;
}

export function parseTokens(html: string): { text: string; color: string }[] {
    return parseNodes(html, "#a1a1aa");
}
