const path = require('path');
const webpack = require('webpack');

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'public');

module.exports = {
  mode: 'development',
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              {
                plugins: ['@babel/plugin-transform-runtime'],
              },
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|)$/i,
        use: {
          loader: 'file-loader',
        },
      },
    ],
  },
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/'),
      assert: require.resolve('assert/'),
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      crypto: require.resolve('crypto-browserify'),
      url: require.resolve('url/'),
      fs: false,
      'pg-native': false,
      dns: false,
      tls: false,
      net: false,
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      process: { env: {} },
      // 'process.env.NODE_ENV': JSON.stringify('development'),
      // 'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
    }),
  ],
};
