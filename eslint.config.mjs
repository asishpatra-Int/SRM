import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactNative from "eslint-plugin-react-native";
import sonarjs from "eslint-plugin-sonarjs";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    // Root-level CommonJS tooling config files (not part of the app bundle).
    files: ["metro.config.js", "babel.config.js", "eslint.config.mjs"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["/dist/*", "node_modules/"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "react-native": reactNative,
      prettier,
      sonarjs,
      import: importPlugin,
      "@typescript-eslint": typescript,
      "react-hooks": reactHooks,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      // Prettier rules
      "prettier/prettier": ["error", {singleQuote: false}],

      // Base no-unused-vars doesn't understand TS-only syntax (e.g. named
      // params in a function *type*); defer to the TS-aware version.
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",

      // Import rules
      "import/no-unresolved": "warn",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          pathGroups: [
            {pattern: "react", group: "external", position: "before"},
            {pattern: "react-native", group: "external", position: "before"},
            {
              pattern: "@react-native/**",
              group: "external",
              position: "before",
            },
            {pattern: "@/**", group: "internal", position: "before"},
            {pattern: "~/**", group: "internal", position: "before"},
          ],
          pathGroupsExcludedImportTypes: ["react", "react-native"],
          "newlines-between": "always",
          alphabetize: {order: "asc", caseInsensitive: true},
        },
      ],
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",

      // Sort imports
      "sort-imports": [
        "error",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
          allowSeparatedGroups: true,
        },
      ],

      // React Native rules
      "react-native/no-inline-styles": "warn",
      "react-native/no-color-literals": "warn",

      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
    },
  },
  prettierConfig,
];
