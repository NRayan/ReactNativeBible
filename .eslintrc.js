module.exports = {
    root: true,
    plugins: ["@stylistic/ts"],
    extends: ["@react-native"],
    rules: {
        indent: ["error", 4],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "space-infix-ops": "error",
        "key-spacing": ["error", { beforeColon: false, afterColon: true }],
        "comma-spacing": ["error", { before: false, after: true }],
        "react-native/no-inline-styles": "off",
        "react-hooks/exhaustive-deps": "off",
        "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
        "no-multi-spaces": ["error", { ignoreEOLComments: false }],
        "@stylistic/ts/type-annotation-spacing": ["error", { "before": false, "after": true }],
        "@stylistic/ts/object-curly-spacing": ["error", "always"],
        "@typescript-eslint/no-unused-vars": [
            "error",
            { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" }
        ]
    },
};
