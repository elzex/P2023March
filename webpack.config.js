const path = require('path');

const epath1 = "ManagementTool";
const tpath1 = "";
const epath2 = "dataReader.js";

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
  entry: './src/' + epath1 + tpath1 + "/" + epath2,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: epath1 + "/script/" + epath2
    //filename: "./index.js"
  },
  watch: true,
}