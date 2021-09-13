// 创建 Category 模块方法，方法内的方法共享 vm 对象  
let Category = (vm) => {
	return {
		categories: (type) => {
			return vm.$u.get('categories/' + type);
		}
	}
}

// 抛出当前模块  
export default Category
