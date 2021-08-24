const autoprefixer = require('autoprefixer')
const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)
module.exports = {
    devServer: {
        port: 8080,
        open: true,
        disableHostCheck: true,
        hotOnly: true
    },
    chainWebpack: (config) => {
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
        config.resolve.alias.set('@', resolve('src'))
    },
    configureWebpack: config => {
        config.output.filename = `js/[name].${new Date().getTime() + '打包'}.js`
        config.output.chunkFilename = `js/[name].${'chunkFilename' + new Date().getTime()}.js`
        config['performance'] = { // 打包文件大小配置
            'maxEntrypointSize': 10000000,
            'maxAssetSize': 30000000
        }
    },
    outputDir: 'dist',
    publicPath: '/',
    css: {
        requireModuleExtension: true,
        loaderOptions: {
            postcss: {
                plugins: [autoprefixer()]
            },
            less: {
                lessOptions: {
                    modifyVars: {},
                    javascriptEnabled: true
                }
            },
            sass: {
                // 依次导入的公用的scss变量，公用的scss混入，共用的默认样式
                prependData: `@import "./src/styles/global.scss";`
            }
        },
        extract: process.env.NODE_ENV === 'prod' ? {
            ignoreOrder: true
        } : false
    }
}
