(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/statistics/index"],{"11f8":function(t,e,a){"use strict";a.r(e);var n=a("90ba"),i=a("4ee0");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("b59b");var r,s=a("f0c5"),u=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"1fb02ade",null,!1,n["a"],r);e["default"]=u.exports},"4ee0":function(t,e,a){"use strict";a.r(e);var n=a("a963"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},"4f66":function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}));var n={uIcon:function(){return a.e("uview-ui/components/u-icon/u-icon").then(a.bind(null,"7a76"))},qiunDataCharts:function(){return Promise.all([a.e("common/vendor"),a.e("uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts")]).then(a.bind(null,"1dd8"))},uEmpty:function(){return a.e("uview-ui/components/u-empty/u-empty").then(a.bind(null,"faa8"))},uPicker:function(){return Promise.all([a.e("common/vendor"),a.e("uview-ui/components/u-picker/u-picker")]).then(a.bind(null,"0695"))}},i=function(){var t=this,e=t.$createElement;t._self._c},o=[]},"6b35":function(t,e,a){},"7bf4":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(a("11f8"));function i(t){return t&&t.__esModule?t:{default:t}}var o={components:{billform:n.default},data:function(){return{params:{type:0,year:"",month:""},amountData:{monthAmount:"0.00",balanceAmount:"0.00",compareAmount:"0.00",amountCount:"0.00"},date:"",pickerMonthShow:!1,pickerMonthParams:{year:!0,month:!0,day:!1},CustomBar:this.CustomBar,authShow:!0,categoryCharts:{series:[]},monthTrendData:{categories:[],series:[]},categorySortData:[]}},onPullDownRefresh:function(){this.init(),setTimeout((function(){t.stopPullDownRefresh()}),1e3)},computed:{inDecName:function(){return 0==this.params.type?"支出":"收入"},inDecTextColor:function(){return 0==this.params.type?"text-orange":"text-blue"},inDecBgColor:function(){return 0==this.params.type?"bg-orange":"bg-blue"},avatarImage:function(){return null!==this.$store.state.vuex_user?this.$store.state.vuex_user.avatar:""}},methods:{typeSelect:function(t){this.params.type=t.currentTarget.dataset.id,this.init()},showPickerMonth:function(){this.pickerMonthShow=!0},pickerMonthConfirm:function(t){this.params.year=t.year,this.params.month=t.month,this.date=t.year+"年"+t.month+"月",this.init()},showAuth:function(){t.redirectTo({url:"/pages/auth/auth"})},hideAuth:function(){this.authShow=!1},getAmounts:function(){var t=this;this.$u.api.Statistics.amounts(this.params).then((function(e){t.amountData=e}))},getTrends:function(){var t=this;this.$u.api.Statistics.trends(this.params).then((function(e){t.monthTrendData.categories=e.categories,t.monthTrendData.series=e.series}))},getCategoryCharts:function(){var t=this;this.$u.api.Statistics.getCategoryCharts(this.params).then((function(e){t.categoryCharts.series=e.series,t.categorySortData=e.categorySortData}))},init:function(){this.getAmounts(),this.getTrends(),this.getCategoryCharts()}},mounted:function(){this.$store.state.vuex_scopeUserInfo||t.redirectTo({url:"/pages/auth/auth"});var e=(new Date).getFullYear(),a=(new Date).getMonth()+1;a=a<10?"0"+a:a,this.date=e+"年"+a+"月",this.params.year=e,this.params.month=a,this.init()}};e.default=o}).call(this,a("543d")["default"])},9030:function(t,e,a){"use strict";(function(t){a("27d5");n(a("66fd"));var e=n(a("c175"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},"90ba":function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}));var n={uIcon:function(){return a.e("uview-ui/components/u-icon/u-icon").then(a.bind(null,"7a76"))},uActionSheet:function(){return a.e("uview-ui/components/u-action-sheet/u-action-sheet").then(a.bind(null,"5694"))}},i=function(){var t=this,e=t.$createElement,a=(t._self._c,Math.ceil(t.categories.length/(2*t.gridCol)));t._isMounted||(t.e0=function(e,a){var n=arguments[arguments.length-1].currentTarget.dataset,i=n.eventParams||n["event-params"];a=i.index2;return t.categoryChange(a)}),t.$mp.data=Object.assign({},{$root:{l0:a}})},o=[]},a038:function(t,e,a){"use strict";var n=a("6b35"),i=a.n(n);i.a},a963:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"billform",components:{},data:function(){return{BillFormShow:!1,billData:{ledger_id:0,type:0,account_id:0,amount:"",category_id:0,note:"",images:[]},chooseImages:[],accountsShow:!1,accountName:"",accounts:[],categoryColorClass:"text-orange",categories:[],decCategories:[],inCategories:[],gridCol:5,gridBorder:!1,categorySwiperCurrent:0,old:{categorySwiperCurrent:0}}},methods:{swiperScroll:function(t){this.old.categorySwiperCurrent=t.detail.current},billType:function(t){this.billData.type=parseInt(t.currentTarget.dataset.type),this.categoryColorClass=0==this.billData.type?"text-orange":"text-blue",this.categories=0==this.billData.type?this.decCategories:this.inCategories,this.billData.category_id=this.categories[0].id,this.categorySwiperCurrent=this.old.categorySwiperCurrent,this.$nextTick((function(){this.categorySwiperCurrent=0}))},categoryChange:function(t){this.billData.category_id=this.categories[t].id},ChooseImage:function(){var e=this;t.chooseImage({count:4,sizeType:["original","compressed"],success:function(a){0!=e.chooseImages.length?e.chooseImages=e.chooseImages.concat(a.tempFilePaths):e.chooseImages=a.tempFilePaths,e.$u.api.Common.uploadImage(a.tempFilePaths[0],"bill").then((function(a){var n=a[1];if(200==n.statusCode){var i=JSON.parse(n.data);e.billData.images=e.billData.images.concat(i.path)}else t.showToast({title:"图片上传失败",icon:error,duration:2e3})}))}})},UploadImages:function(){this.chooseImages.map((function(t,e){return{name:"images"+e,uri:t}}))},ViewImage:function(e){t.previewImage({urls:this.chooseImages,current:e.currentTarget.dataset.url})},DelImg:function(e){var a=this;t.showModal({title:"提示",content:"确定删除？",cancelText:"取消",confirmText:"确定",success:function(t){t.confirm&&(a.chooseImages.splice(e.currentTarget.dataset.index,1),a.billData.images.splice(e.currentTarget.dataset.index,1))}})},accountCallback:function(e){t.hideKeyboard(),this.billData.account_id=this.accounts[e].id,this.accountName=this.accounts[e].text},accountChange:function(t){this.accountsShow=!0},getCategories:function(t){var e=this;this.$u.api.Category.categories(t).then((function(a){0===t?(e.decCategories=a.data,e.categories=a.data,e.billData.category_id=a.data[0].id):e.inCategories=a.data}))},getAccounts:function(){var t=this;this.$u.api.Common.accounts().then((function(e){t.accounts=e.data,t.accountName=e.data[0].text}))},init:function(){this.getCategories(0),this.getCategories(1),this.getAccounts()},initBillData:function(){this.categories=this.decCategories,this.billData.ledger_id=0,this.billData.type=0,this.billData.account_id=0,this.billData.amount="",this.billData.category_id=this.categories[0].id,this.billData.note="",this.billData.images=[],this.chooseImages=[]},save:function(){var e=this;if(""==this.billData.amount||this.billData.amount<=0)return t.showToast({title:"金额填写有误",icon:"error",duration:2e3}),!1;this.$u.api.Bill.save(this.billData).then((function(a){!1!==a?(e.hideBillForm(),e.$emit("reload"),t.showToast({title:"创建成功",duration:2e3}),e.initBillData()):t.showToast({title:"创建失败",icon:"error",duration:2e3})})).catch((function(t){console.log(t)}))},showBillForm:function(){this.BillFormShow=!0},hideBillForm:function(){this.BillFormShow=!1}},mounted:function(){this.$store.state.vuex_scopeUserInfo||t.redirectTo({url:"/pages/auth/auth"}),this.init()}};e.default=a}).call(this,a("543d")["default"])},b59b:function(t,e,a){"use strict";var n=a("bea4"),i=a.n(n);i.a},bea4:function(t,e,a){},c175:function(t,e,a){"use strict";a.r(e);var n=a("4f66"),i=a("ec2d");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("a038");var r,s=a("f0c5"),u=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"52cbe849",null,!1,n["a"],r);e["default"]=u.exports},ec2d:function(t,e,a){"use strict";a.r(e);var n=a("7bf4"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a}},[["9030","common/runtime","common/vendor"]]]);