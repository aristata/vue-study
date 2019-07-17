import Vue from 'vue' //package.json 에서 설치했던 vue 를 가져온다.
import NumberBaseball from './NumberBaseball' //vue 파일을 vue 인스턴스에 연결을 해줘야 한다. 그래야 하나의 파일로 합쳐질수 있다.

new Vue(NumberBaseball).$mount('#root')