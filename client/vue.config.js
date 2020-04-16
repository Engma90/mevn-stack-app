const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),

    chainWebpack: (config) => {
        config
            .plugin('html')
            .tap((args) => {
                args[0].title = 'Simple Posts | Full stack app';
                return args;
            });
    },

    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000'
            }
        }
    }
}