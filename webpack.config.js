let path = require('path');
let webpack = require('webpack');
let svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ["@babel/env"]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(svg|png|jpg|jpeg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'pictures/[hash][ext][query]'
        }
      },
      // {
      //   test: /\.svg/,
      //   type: 'asset/inline',
      //   generator: {
      //     dataUrl: content => {
      //       content = content.toString();
      //       console.log(svgToMiniDataURI(content))
      //       return svgToMiniDataURI(content);
      //     },
      //   }
      // },
      {
        test: /\.txt/,
        type: 'asset/source',
        generator: {
          filename: 'files/[hash][ext][query]'
        }
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    hot: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}