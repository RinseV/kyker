module.exports = {
    env: {
        browser: true,
        es2021: true,
        'react-native/react-native': true
    },
    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:import/recommended',
        'plugin:import/typescript',
        'prettier', // Disable conflicting ESLint rules
        'plugin:prettier/recommended', // Displays prettier errors as ESLint errors
        'plugin:react-hooks/recommended',
        'plugin:react/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module' // Allows for the use of imports
    },
    plugins: ['react', 'react-native', '@typescript-eslint'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto'
            }
        ],
        indent: 'off',
        quotes: ['warn', 'single'],
        semi: ['warn', 'always'],
        'import/no-named-as-default': 'off',
        'import/no-default-export': 'error',
        '@typescript-eslint/ban-types': [
            'error',
            {
                types: {
                    object: false
                },
                extendDefaults: true
            }
        ],
        'react/react-in-jsx-scope': 'off', // Not needed with NextJS,
        'react/prop-types': 'off' // Conflicts with TypeScript
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
};
