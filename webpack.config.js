let path = require('path');
let webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

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
      vendors: ['react', 'react-dom', 'lodash', 'styled-components'],
    },
    // entry: './src/index.js',
    mode,
    optimization: {
      minimize: true,
      minimizer: [
        '...',
        new CssMinimizerPlugin()
      ],
      runtimeChunk: {
        name: (entrypoint) => `runtime~${entrypoint.name}`
      }
    },
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
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.less$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
        },
        {
          test: /\.s(c|a)ss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
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
    performance: {
      maxAssetSize: 500000,
      hints: 'warning',
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        minify: {
          minifyCSS: true,
          minifyJS: true
        }
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name][id].css',
        chunkFilename: 'static/css/[name][id].css'
      }),
      // new webpack.ProvidePlugin({
      //   process: 'process/browser',
      // }),
      new NodePolyfillPlugin(),
      new Dotenv({
        path: './.env', // Path to .env file (this is the default)
        safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
      }),
      // new BundleAnalyzerPlugin(),
      // new CompressionPlugin({
      //   filename: "[name][ext].gz",
      //   algorithm: "gzip",
      //   test: /\.(js|css)$/,
      // })
      // new ESLintPlugin({}),
    ]
  }
}