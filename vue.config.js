module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/staging/'
      : '/',
    devServer: {
      host: 'localhost',
      port: '3000'
    }
}