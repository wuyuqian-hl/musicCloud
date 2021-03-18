module.exports = {
    lintOnSave: false,
    devServer: {
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api' : 'http://localhost:3000'
        }
      }
    }
  },

}