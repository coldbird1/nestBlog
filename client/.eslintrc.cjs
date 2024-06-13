/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  overrideConfig: {
    extends: [
      'plugin:vue/vue3-essential',
      'eslint:recommended',
      '@vue/eslint-config-typescript',
      '@vue/eslint-config-prettier/skip-formatting'
    ],
    plugins: [], // 如果有额外的自定义插件需要在这里列出
    parserOptions: {
      ecmaVersion: 'latest'
    }
  }
}
