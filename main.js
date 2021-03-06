import Vue from 'vue'
import App from './App'
import store from '@/store';

let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

import uView from "uview-ui";
Vue.use(uView);

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})

// http拦截器
import httpInterceptor from './common/http.interceptor.js';
// 等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)

// http接口API集中管理引入部分
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

app.$mount()

 



