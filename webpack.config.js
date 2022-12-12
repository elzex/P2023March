const path = require('path');

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { url: false }
          }
        ]
      }
    ]
  },
  entry: './src/Authentication/SignUpPage.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'Authentication/script/SignUpPage.js'
  },
  watch: true
}