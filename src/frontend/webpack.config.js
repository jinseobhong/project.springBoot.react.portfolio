const path = require('path')                                
const autoprefixer = require('autoprefixer')        // core nodejs 모듈 중 하나, 파일 경로 설정할 때 사용
const HtmlWebpackPlugin = require('html-webpack-plugin')            // index.html 파일을 dist 폴더에 index_bundle.js 파일과 함께 자동으로 생성, 우리는 그냥 시작만 하고싶지 귀찮게 index.html 파일까지 만들고 싶지 않다.!!

module.exports = {
    devServer: {
        client: {
          overlay: {
            errors: true,
            warnings: false,
            runtimeErrors: true,
          },
        },
    },       
    mode : 'development',
    entry: './src/index.js',
    output: {                                           // bundled compiled 파일
        path: path.join(__dirname, '/dist'),    
                //__dirname : 현재 디렉토리, dist 폴더에 모든 컴파일된 하나의 번들파일을 넣을 예정
        filename: 'App.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,                          // .js, .jsx로 끝나는 babel이 컴파일하게 할 모든 파일
                exclude: /node_module/,                 // node module 폴더는 babel 컴파일에서 제외
                use:    {
                    loader: 'babel-loader'				// babel loader가 파이프를 통해 js 코드를 불러옴
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
              },
            {
                test: /\.(scss)$/,
                use: [
                        {
                            // Adds CSS to the DOM by injecting a `<style>` tag
                            loader: 'style-loader'
                        },
                        {
                            // Interprets `@import` and `url()` like `import/require()` and will resolve them
                            loader: 'css-loader'
                        },
                        {
                            // Loader for webpack to process CSS with PostCSS
                            loader: 'postcss-loader',
                            options: {
                            postcssOptions: {
                                plugins: [
                                autoprefixer
                                ]
                            }
                            }
                        },
                        {
                            // Loads a SASS/SCSS file and compiles it to CSS
                            loader: 'sass-loader'
                        }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'                // 생성한 템플릿 파일
        })
    ]
}