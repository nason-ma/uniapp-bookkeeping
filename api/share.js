// 创建 Share 模块方法，方法内的方法共享 vm 对象  
let Share = (vm) => {
	return {
		randomQuotation: () => {
			return vm.$u.get('share/random');
		}
	}
}

// 抛出当前模块  
export default Share
