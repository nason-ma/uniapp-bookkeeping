// 创建 Statistics 模块方法，方法内的方法共享 vm 对象  
let Statistics = (vm) => {
	return {
		amounts: (params) => {
			return vm.$u.post('statistic/amounts', params);
		},
		
		trends: (params) => {
			return vm.$u.post('statistic/trends', params);
		},
		
		getCategoryCharts: (params) => {
			return vm.$u.post('statistic/categoryCharts', params);
		}
	}
}

// 抛出当前模块  
export default Statistics
