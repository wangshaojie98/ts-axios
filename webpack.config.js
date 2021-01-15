const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
/**
 * __dirname 是当前目录
 */
module.exports = {
  entry: fs.readdirSync(path.join(__dirname, '/examples/')).reduce((entries, dir) => {
    const fullDir = path.join(__dirname + '/examples/', dir)
    const entry = path.join(fullDir, 'app.ts')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      // 如果是文件夹的话
      entries[dir] = ['webpack-hot-middleware/client', entry]
    }

    return entries
  }, {}),
  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    publicPath: '/__build__/'
  },
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
