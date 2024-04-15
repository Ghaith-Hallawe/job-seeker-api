module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: "@typescript-eslint/parser",
  extends: ['plugin:@typescript-eslint/recommended', "plugin:@typescript-eslint/eslint-recommended",],
  overrides: [
    {
      env: {
        node: true
      },
      files: '.eslintrc.{js,cjs,ts}',
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'] // Specify it only for TypeScript files
  },
  rules: {
    indent: "off",
    curly: ['error', 'multi-line'],
    semi: [1, 'always'],
    "@typescript-eslint/indent": ["error", 2, {"ignoredNodes": ["FunctionExpression[params]:has(Identifier[decorators])"]}],
    'comma-dangle': [1, 'never'],
    'curly': ['error', 'multi-line'],
    '@typescript-eslint/semi': 'off',
    'no-useless-escape': 'off',
    'dot-notation': 'off',
    'no-control-regex': 'off',
    "@typescript-eslint/no-explicit-any": 1,
    "@typescript-eslint/no-inferrable-types": [
      "warn", {
        "ignoreParameters": true
      }
    ],
    '@typescript-eslint/no-unused-vars': ['warn', {
      'vars': 'all',
      'args': 'none',
      'ignoreRestSiblings': true
    }]
    // '@typescript-eslint/restrict-template-expressions': 1,
    // '@typescript-eslint/no-extraneous-class': 2,
    // '@typescript-eslint/consistent-type-imports': 'off',
    // '@typescript-eslint/naming-convention': 2,
    // '@typescript-eslint/ban-ts-comment': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',
    // '@typescript-eslint/explicit-function-return-types': 'off',
    // '@typescript-eslint/explicit-module-boundary-types': 'off'
  },
  ignorePatterns: [".eslintrc.js"]
};
