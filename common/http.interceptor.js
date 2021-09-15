const config = {
	baseUrl: 'http://120.78.216.40/api', // 请求的本域名
	method: 'POST',
	// 设置为json，返回后会对数据进行一次JSON.parse()
	dataType: 'json',
	showLoading: true, // 是否显示请求中的loading
	loadingText: '努力加载中...', // 请求loading中的文字提示
	loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
	originalData: true, // 是否在拦截器中返回服务端的原始数据
	loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
	// 配置请求头信息
	header: {
		'content-type': 'application/json;charset=UTF-8'
	}
};

// 这里的Vue为Vue对象(非创建出来的实例)，vm为main.js中“Vue.use(httpInterceptor, app)”这一句的第二个参数，
// 为一个Vue的实例，也即每个页面的"this"
// 如果需要了解这个install方法是什么，请移步：https://uviewui.com/components/vueUse.html
const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig(config);

	// 请求拦截部分，如配置，每次请求前都会执行
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// 引用token
		// 方式一，存放在vuex的token，假设使用了uView封装的vuex方式
		config.header.Authorization = 'Bearer ' + vm.vuex_token;
		if (!vm.vuex_scopeUserInfo) {
			return false;
		}

		return config;
	}

	// 响应拦截，如配置，每次请求结束都会执行本方法
	Vue.prototype.$u.http.interceptor.response = async (res) => {
		if (res.statusCode == 200 || res.statusCode == 201 || res.statusCode == 204) {
			// res为服务端返回值，可能有code，result等字段
			// 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
			// 如果配置了originalData为true，请留意这里的返回值
			return res.data;
		} else if (res.statusCode == 401) {
			// 401为token失效
			uni.showLoading({
			    title: '登录中'
			});
			const refreshResult = await RefreshToken(res, vm);
			uni.hideLoading();
			return refreshResult.data;
		} else {
			// 如果返回false，则会调用Promise的reject回调，
			// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
			return false;
		}
	}
}

async function RefreshToken(response, vm) {
	const Authorization = 'Bearer ' + vm.vuex_token;
	let refreshResult = await uni.request({
		url: config.baseUrl + "/refresh",
		method: "POST",
		header: {
			'Authorization': Authorization
		}
	});
	let resultData = refreshResult[1].data;

	if (refreshResult[1].statusCode == 200) {
		sotrageLoginVuex (vm, resultData);
		return await nextRequest(response, resultData.access_token);
	} else if (refreshResult[1].statusCode == 401) {
		let wxLoginRes = await uni.login({
			provider: 'weixin'
		});
		
		let loginResult = await uni.request({
			url: config.baseUrl + "/login",
			method: "POST",
			data: {code: wxLoginRes[1].code}
		});
		let resultData = loginResult[1].data;
		
		sotrageLoginVuex(vm, resultData)
		let result = await nextRequest(response, resultData.access_token);
		return result;
	} else {
		vm.$u.vuex('vuex_scopeUserInfo', false);
		uni.showToast({
			title: '登录失效,请重新登录',
			icon: 'none'
		})
		uni.redirectTo({
			url: "/pages/auth/auth"
		})
	}
}

function sotrageLoginVuex (vm, resultData) {
	vm.$u.vuex('vuex_scopeUserInfo', true);
	vm.$u.vuex('vuex_token', resultData.access_token);
	vm.$u.vuex('vuex_tokenExpires', resultData.expires_in);
	vm.$u.vuex('vuex_tokenStart', vm.NowTime());
	vm.$u.vuex('vuex_user', resultData.user);
}

async function nextRequest(response, token) {
	const Authorization2 = 'Bearer ' + token;
	var result = await uni.request({
		url: response.config.url,
		method: response.config.method,
		header: {
			'Authorization': Authorization2
		},
		data: response.config.data
	});
	return result[1];
}

export default {
	install,
	config
}
