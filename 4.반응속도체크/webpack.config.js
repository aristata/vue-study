const VueLoaderPlugin = require('vue-loader/lib/plugin') //vue-loader 플러그인 추가
const path = require('path') //노드에서 경로를 쉽게 구할수 있도록 해주는 모듈

// 웹팩 왜쓰나? 스크립트 많으면 하나로 합쳐서 쉽게 관리하려고
module.exports = {
  mode: 'development',
  devtool: 'eval', //웹팩 빌드 속도가 빨라짐
  resolve: {
    extensions: ['.js', '.vue'] //확장자 생략가능
  },
  // 많은 스크립트들 중에서 제일 중요한것
  entry: {
    // 하나로 합쳐질 파일의 이름 = app
    app: path.join(__dirname, 'main.js')
  },
  module: {
    // 어떻게 합쳐질 것인지
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader' // use 라고 써도 된다.
    }]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  output: {
    // 하나로 합쳐진 파일의 이름
    filename: '[name].js',
    // 하나로 합쳐진 파일이 생성될 위치
    path: path.join(__dirname, 'dist')
  }
}