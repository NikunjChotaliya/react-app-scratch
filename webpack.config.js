let path = require('path');
let webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin');
// let svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = function (_, { env, ...params }) {
  const { mode } = params;
  return {
    entry: {
      main: {
        import: './src/index.js',
        dependOn: 'vendors'
      },
      vendors: ['react', 'react-dom', 'lodash'],
    },
    // entry: './src/index.js',
    mode,
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
            filename: 'static/images/[name][hash][ext]'
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
            filename: 'static/files/[hash][ext][query]'
          }
        }
      ]
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"],
      alias: {
        Components: path.resolve(__dirname, 'src/Components/')
      },
      descriptionFiles: ['package.json'],
    },
    output: {
      path: path.resolve(__dirname, 'dist/'),
      // publicPath: '/dist/',
      // filename: '[name].bundle.js',
      filename: (pathData) => {
        return pathData.chunk.name === 'main' ? '[name].js' : 'static/js/[name].bundle.js';
      },
      chunkFilename: 'static/js/[name].[contenthash].bundle.js',
      // assetModuleFilename: 'static/images/[hash][ext]',
      clean: true,
      // library: ['MyLibrary', '[name]'], // name is a placeholder here
      // libraryTarget: 'umd',
      library: {
        name: ['MyLibrary', '[name]'], // name is a placeholder here
        type: 'window',
      },
    },
    devServer: {
      contentBase: path.join(__dirname, "dist/"),
      port: 3001,
      hot: true
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html'
      }),
      // new ESLintPlugin({}),
    ]
  }
}