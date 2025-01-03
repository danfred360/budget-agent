/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/naming-convention */

import filenames from "eslint-plugin-filenames";
import functional from "eslint-plugin-functional";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import importPlugin from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["**/output", "**/dist", "**/node_modules"],
  },
  ...compat.extends("plugin:@typescript-eslint/recommended", "plugin:prettier/recommended", "prettier"),
  {
    plugins: {
      filenames,
      functional,
      "@typescript-eslint": typescriptEslint,
      import: importPlugin,
    },

    languageOptions: {
      globals: {
        document: false,
        window: false,
        Event: false,
        CustomEvent: false,
        FormData: false,
        fetch: false,
        DOMParser: false,
        FileReader: false,
        requestAnimationFrame: false,
        Element: false,
      },

      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: "module",
    },

    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },

        alias: {
          map: [["~", "./src"]],
          extensions: [".ts", ".js", ".jsx", ".json", ".tsx"],
        },
      },
    },

    rules: {
      curly: ["error", "all"],

      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          accessibility: "no-public",
        },
      ],

      "no-new": 0,
      "no-unused-vars": "off",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: false,
        },
      ],

      "no-underscore-dangle": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-non-null-assertion": 2,

      "no-restricted-syntax": [
        "error",
        {
          selector: "ForInStatement",
          message:
            "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
        },
        {
          selector: "LabeledStatement",
          message: "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
        },
        {
          selector: "WithStatement",
          message: "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
        },
        {
          selector: "TSEnumDeclaration",
          message:
            "Don't declare enums, use a discriminated union instead: https://github.com/typescript-eslint/typescript-eslint/issues/561#issue-448808322",
        },
      ],

      // "filenames/match-exported": 2,
      "no-use-before-define": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": ["error"],

      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variableLike",
          format: ["camelCase", "PascalCase"],
        },
        {
          selector: "class",
          format: ["PascalCase"],
        },
      ],

      "@typescript-eslint/consistent-type-assertions": [
        "error",
        {
          assertionStyle: "never",
        },
      ],

      "prettier/prettier": [
        "error",
        {
          printWidth: 140,
          endOfLine: "auto",
        },
      ],

      "@typescript-eslint/no-explicit-any": "error",

      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          jsx: "never",
          ts: "never",
          tsx: "never",
        },
      ],

      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: ["**/__mocks__/**/*", "gulpfile.ts", "**/*.test.ts", "**/*.test.tsx", "webpack.config.js"],
        },
      ],

      "class-methods-use-this": "off",

      "no-plusplus": [
        "error",
        {
          allowForLoopAfterthoughts: true,
        },
      ],
    },
  },
  {
    files: ["**/*.tsx", "**/*.ts"],

    rules: {
      "react/prop-types": "off",

      "import/no-unresolved": [
        2,
        {
          ignore: ["StoreTypes", "react-hook-form"],
        },
      ],

      "@typescript-eslint/explicit-module-boundary-types": "off",
      "no-redeclare": "off",
      "no-shadow": "off",
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": ["error"],
    },
  },
  {
    files: ["**/*test.ts", "**/*.test.tsx", "**/*.test.jsx", "**/*.test.js", "**/__mocks__/**/*", "**/__tests__/**/*"],

    languageOptions: {
      globals: {
        expect: false,
        test: false,
        jest: false,
        jsdom: false,
        describe: false,
        it: false,
        beforeEach: false,
        afterEach: false,
        afterAll: false,
      },
    },

    rules: {
      "max-classes-per-file": "off",
      // "filenames/match-exported": "off",
    },
  },
  {
    files: ["**/*.js", "**/*.ts"],

    rules: {
      "linebreak-style": 0,
    },
  },
  {
    files: ["**/*.js", "**/*.jsx"],

    rules: {
      "@typescript-eslint/no-var-requires": "off",
    },
  },
];
