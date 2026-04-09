module.exports = {
  ignoreFiles: [
    '**/dist/**',
    '**/node_modules/**',
    '**/.vitepress/dist/**',
    '**/coverage/**',
    '**/.pack/**',
  ],
  rules: {
    'block-no-empty': null,
  },
  overrides: [
    {
      files: ['**/*.{css,vue}'],
      customSyntax: 'postcss-html',
      rules: {},
    },
  ],
}
