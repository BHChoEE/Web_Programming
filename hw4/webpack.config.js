var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/outputs');
var APP_DIR = path.resolve(__dirname, 'src/app');
var CSS_DIR = path.resolve(__dirname, 'src/styles');

var config = {
  entry: {
    Login: APP_DIR + '/login_index.js',
    SignIn: APP_DIR + '/signin_index.js',
    ChatLobby: APP_DIR + '/chatlobby_index.js',
  }, 
  output: {
    path: BUILD_DIR,
    filename: '[name].js',
  },
  module: {
    rules: [ // not 'loaders', 'rules' is correct
      {
        loader: 'babel-loader',
        test: /\.js$/, // regex, js or jsx
        include: APP_DIR,
        exclude: '/node_modules',
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      },{
        test: /\.css$/,
        loader:[ 'style-loader', 'css-loader' ],
        include: CSS_DIR,
        exclude: '/node_modules'
      }
    ]
  }
};

module.exports = config;