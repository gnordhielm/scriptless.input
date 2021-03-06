const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const postcssLoaderOptions = {
  plugins: () => [require('autoprefixer')({
      'browsers': ['> 1%', 'last 2 versions']
  })],
}


process.noDeprecation = true

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd'
  },
  externals: {
    "react": "react",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          process.env.NODE_ENV === 'production' ?
                MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: postcssLoaderOptions,
          },
          'sass-loader', 
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: 'style.css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      },
    })
  ],
  resolve: {
    alias: {
      components: path.resolve(process.cwd(), 'src/components/'),
      interfaces: path.resolve(process.cwd(), 'src/interfaces/'),
      examples: path.resolve(process.cwd(), './examples/'),
      utils: path.resolve(process.cwd(), 'src/utils/'),
      styles: path.resolve(process.cwd(), 'src/styles/'),
      settings: path.resolve(process.cwd(), 'src/settings.js'),
    },
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.scss',
    ],
  },
  target: 'web',
  node: {
    fs: 'empty',
    module: 'empty',
    net: 'empty',
  },
}