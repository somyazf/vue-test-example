module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.(png|svg|jpg|gif|pdf)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]'
                    }
                  }
                ]
            }
        ]
    },
    externals: {
        canvg: "canvg",
        html2canvas: "html2canvas",
        dompurify: "dompurify"
    }
}