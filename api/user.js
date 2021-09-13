// 创建 User 模块方法，方法内的方法共享 vm 对象  
let User = (vm) => {
	return {
		me: () => {
			return vm.$u.get('me');
		}
	}
}

// 抛出当前模块  
export default User
