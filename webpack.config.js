module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    },
    externals: {
        canvg: "canvg",
        html2canvas: "html2canvas",
        dompurify: "dompurify"
    }
}