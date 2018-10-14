
module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: ['tests/**/*.js'],
    preprocessors: { 'tests/**/*.js': [ 'webpack' ] },

    reporters: ['spec'],
    port: 9876,  // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: true,
    singleRun: false, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity,
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
    },
    webpackMiddleware: {
      stats: 'errors-only',
    }
  })
}
