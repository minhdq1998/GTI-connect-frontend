const { NODE_ENV, BASE_URL = '/' } = process.env;

module.exports = {
    chainWebpack: config => {
      config
        .plugin('html')
        .tap(args => {
        args[0].title = 'GTI Connect';	// Replace your title here
        return args;
      });
    },
    publicPath: NODE_ENV === 'production'
      ? BASE_URL
      : '/',
    devServer: {
      host: 'localhost',
      port: '3000'
    }
}