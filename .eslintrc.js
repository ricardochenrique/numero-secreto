const globals = require("globals");
const pluginJs = require("@eslint/js");

let browserGlobals = globals.browser;

// Verificar se browserGlobals é um array antes de tentar usar o reduce
if (Array.isArray(browserGlobals)) {
    browserGlobals = browserGlobals.filter(global => global !== "AudioWorkletGlobalScope");
} else {
    // Se não for um array, criaremos um array vazio
    browserGlobals = [];
}

module.exports = [
    {
        languageOptions: { globals: browserGlobals.reduce((acc, cur) => ({ ...acc, [cur]: true }), {}) },
    },
    pluginJs.configs.recommended,
];