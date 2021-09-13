// 创建 Bill 模块方法，方法内的方法共享 vm 对象  
let Bill = (vm) => {
	return {
		save: (params) => {
			return vm.$u.post('bill/save', params);
		},
		
		index: (params) => {
			return vm.$u.post('bill/index', params);
		}
	}
}

// 抛出当前模块  
export default Bill
