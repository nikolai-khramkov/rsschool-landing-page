import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      // Общий стиль
      'curly': ['error', 'multi-line', 'consistent'],
      'eqeqeq': ['error', 'always'],
      'no-console': process.env.NODE_ENV === 'production'
        ? ['warn', { allow: ['warn', 'error'] }]
        : 'off',

      // Vue
      'vue/multi-word-component-names': 'off',
      'vue/attribute-hyphenation': ['error', 'always'],
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          registeredComponentsOnly: false,
        },
      ],
      'vue/custom-event-name-casing': ['error', 'camelCase'],
      'vue/define-macros-order': [
        'error',
        {
          order: [
            'defineOptions',
            'defineProps',
            'defineEmits',
            'defineSlots',
          ],
        },
      ],

      // Не заставляем писать return type везде
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // unused vars
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
)