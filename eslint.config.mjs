import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    languageOptions: { globals: globals.browser },
    ignorePatterns: ["reiniciarJogo()", "verificarChute()"]
  },
  pluginJs.configs.recommended,
];