module.exports = {
  root: true,
  extends: ["node18"],
  env: {
      node: true,
      es2022: true,
  },
  extends: [
	  "eslint:recommended",
	  "plugin:@typescript-eslint/recommended",
	  "prettier" // Add this line!
  ],
  plugins: ["@typescript-eslint", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  settings: {
    "import/resolver": {
      typescript: {}
    }
  },
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: [2, 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    'linebreak-style': ['error', 'unix'],
    // 'no-console': ['error', { allow: ['warn', 'error'] }],
    'import/prefer-default-export': 0,
    // "dot-notation": 0,
    // "@typescript-eslint/dot-notation": 0,

    'prettier/prettier': 'error',
  },  
};
