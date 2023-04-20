module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  extends: [
    '../.eslintrc.js',
  ],
  env: {
    node: true,
    jest: true,
  }
};
