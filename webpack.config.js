const path = require('path');
 
module.exports = {
 entry: {
   main: './src/index.js',
 },
 output: {
   filename: 'bundle.js',
   path: path.resolve(__dirname, 'dist'),
 },
 module: {
   rules: [
     {
       test: /\.js$/,
 use: [],
     },
     {
       test: /\.(sa|sc|c)ss$/,
       use: [],
     },
   ],
 },
 plugins: [],
// This setup the dev-server to serve files directly from the ‘dist’ dir
 devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};
