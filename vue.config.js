module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true
        }
    },
    pages: {
        index: {
            entry: 'src/main.js',
            templete: 'public/index.html',
            filename: 'index.html',
            title: 'Index Page',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        subpage: 'src/subpage/main.js'
    },
    
}