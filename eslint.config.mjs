import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {
    'eslint:recommended': true,
  },
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended"
  ),
  {
    rules: {
      // React specific rules
      "react-hooks/exhaustive-deps": "warn",
      
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { 
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],
    },
  },
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "**/__tests__/**"],
    rules: {
      // Test file specific rules
      "@typescript-eslint/no-empty-function": "off",
    },
  },
];

export default eslintConfig;
