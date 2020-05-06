module.exports = {
    lintOnSave: false,
    productionSourceMap: false,
    configureWebpack: {},
    devServer: {
        disableHostCheck: true
    },
    chainWebpack: config => {
        config.module
            .rule('worker')
            .test(/\.worker\.js$/)
            .use('worker-loader')
            .loader('worker-loader')
            .end()

        config.module.rule('js').exclude.add(/\.worker\.js$/)
    }
}
