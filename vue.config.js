const path = require("path");

module.exports = {
  outputDir: process.env.NODE_ENV === 'development' ? path.resolve(__dirname, 'dist_dev') : path.resolve(__dirname, 'dist'),
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config
        .output
        // .filename('[name].[hash].js') 
        .filename('[name].js') 
        .end() 
    }  
  }
}