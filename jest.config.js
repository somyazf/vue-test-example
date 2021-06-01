module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    ".*\\.(js)$": "babel-jest"
  },
  testMatch: [
    "**/test/**/*.spec.[jt]s?(x)"
  ]
}
