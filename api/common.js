import config from '../common/http.interceptor.js';
// 创建 Common 模块方法，方法内的方法共享 vm 对象  
let Common = (vm) => {
	return {
		accounts: () => {
			return vm.$u.get('accounts');
		},

		uploadImage: (filePath, type) => {
			return uni.uploadFile({
				url: 'http://120.78.216.40/api/upload/billImage',
				filePath: filePath,
				name: 'image',
				formData: {
					type: type
				},
				header: {
					'Authorization': 'Bearer ' + vm.vuex_token
				}
			})
		}
	}
}

// 抛出当前模块  
export default Common
