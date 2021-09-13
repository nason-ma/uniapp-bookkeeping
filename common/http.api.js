import User from "../api/user.js";
import Share from '../api/share.js';
import Category from '../api/category.js';
import Common from '../api/common.js';
import Bill from '../api/bill.js';

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作
const install = (Vue, vm) => {
	// // 此处没有使用传入的params参数
	// let getSearch = (params = {}) => vm.$u.get(hotSearchUrl, {
	// 	id: 2
	// });

	// // 此处使用了传入的params参数，一切自定义即可
	// let getInfo = (params = {}) => vm.$u.post(indexUrl, params);
	let isScopeUserInfo = () => {
		uni.getSetting({
			success(res) {
				if (!res.authSetting['scope.userInfo']) {
					//这里调用授权
					vm.$u.vuex('vuex_scopeUserInfo', false);
				} else {
					//用户已经授权过了
					vm.$u.vuex('vuex_scopeUserInfo', true);
				}
			}
		})
	}

	let login = () => {
		uni.login({
			provider: 'weixin',
			success: function(loginRes) {
				vm.$u.post('login', {
					code: loginRes.code
				}).then(result => {
					vm.$u.vuex('vuex_scopeUserInfo', true);
					vm.$u.vuex('vuex_token', result.access_token);
					vm.$u.vuex('vuex_tokenExpires', result.expires_in);
					vm.$u.vuex('vuex_tokenStart', vm.NowTime());
					vm.$u.vuex('vuex_user', result.user);
					uni.redirectTo({
						url: '/pages/index/index'
					})
				})
			}
		});
	}

	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		User: User(vm), // 将 vm 对象传递到 User 模块中  
		Share: Share(vm),
		Category: Category(vm),
		Common: Common(vm),
		Bill: Bill(vm),
		isScopeUserInfo,
		login
	};
}

export default {
	install
}
