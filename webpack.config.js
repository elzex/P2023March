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
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },
  entry: './src/Portal/Mypage.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'Portal/script/Mypage.js'
  },
  watch: true,
}