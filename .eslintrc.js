module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module' // Allows for the use of imports
    },
    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:import/recommended',
        'plugin:import/typescript',
        'prettier', // Disable conflicting ESLint rules
        'plugin:prettier/recommended' // Displays prettier errors as ESLint errors
    ],
    plugins: ['@typescript-eslint', 'prettier', 'import'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto'
            }
        ],
        indent: 'off',
        quotes: ['warn', 'single'],
        semi: ['warn', 'always']
    }
};
