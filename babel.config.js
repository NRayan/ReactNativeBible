module.exports = {
    presets: ["module:@react-native/babel-preset"],
    plugins: [
        [
            "module-resolver",
            {
                root: ["./src"],
                alias: {
                    "@components": "./src/components",
                    "@content": "./src/content",
                    "@features": "./src/features",
                    "@navigation": "./src/navigation",
                    "@storage": "./src/storage",
                    "@stores": "./src/stores",
                    "@theme": "./src/theme",
                },
            },
        ],
    ],
};
