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
  entry: './src/Portal/MyPage.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'Portal/script/MyPage.js'
  },
  watch: true
}