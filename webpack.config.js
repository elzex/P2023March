const path = require('path');
//var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

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
  entry: './src/Authentication/SignUpPage.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'Authentication/script/SignUpPage.js'
  },
  watch: true,
  /*
  plugins: [
    new HardSourceWebpackPlugin()
  ]
  */
}