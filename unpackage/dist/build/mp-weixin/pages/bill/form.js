(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/bill/form"],{"11f8":function(t,e,a){"use strict";a.r(e);var i=a("90ba"),o=a("4ee0");for(var n in o)"default"!==n&&function(t){a.d(e,t,(function(){return o[t]}))}(n);a("b59b");var s,c=a("f0c5"),r=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,"1fb02ade",null,!1,i["a"],s);e["default"]=r.exports},"4e79":function(t,e,a){"use strict";(function(t){a("27d5");i(a("66fd"));var e=i(a("11f8"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},"4ee0":function(t,e,a){"use strict";a.r(e);var i=a("a963"),o=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,(function(){return i[t]}))}(n);e["default"]=o.a},"90ba":function(t,e,a){"use strict";a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){return i}));var i={uIcon:function(){return a.e("uview-ui/components/u-icon/u-icon").then(a.bind(null,"7a76"))},uActionSheet:function(){return a.e("uview-ui/components/u-action-sheet/u-action-sheet").then(a.bind(null,"5694"))}},o=function(){var t=this,e=t.$createElement,a=(t._self._c,Math.ceil(t.categories.length/(2*t.gridCol)));t._isMounted||(t.e0=function(e,a){var i=arguments[arguments.length-1].currentTarget.dataset,o=i.eventParams||i["event-params"];a=o.index2;return t.categoryChange(a)}),t.$mp.data=Object.assign({},{$root:{l0:a}})},n=[]},a963:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"billform",components:{},data:function(){return{BillFormShow:!1,billData:{ledger_id:0,type:0,account_id:0,amount:"",category_id:0,note:"",images:[]},chooseImages:[],accountsShow:!1,accountName:"",accounts:[],categoryColorClass:"text-orange",categories:[],decCategories:[],inCategories:[],gridCol:5,gridBorder:!1,categorySwiperCurrent:0,old:{categorySwiperCurrent:0}}},methods:{swiperScroll:function(t){this.old.categorySwiperCurrent=t.detail.current},billType:function(t){this.billData.type=parseInt(t.currentTarget.dataset.type),this.categoryColorClass=0==this.billData.type?"text-orange":"text-blue",this.categories=0==this.billData.type?this.decCategories:this.inCategories,this.billData.category_id=this.categories[0].id,this.categorySwiperCurrent=this.old.categorySwiperCurrent,this.$nextTick((function(){this.categorySwiperCurrent=0}))},categoryChange:function(t){this.billData.category_id=this.categories[t].id},ChooseImage:function(){var e=this;t.chooseImage({count:4,sizeType:["original","compressed"],success:function(a){0!=e.chooseImages.length?e.chooseImages=e.chooseImages.concat(a.tempFilePaths):e.chooseImages=a.tempFilePaths,e.$u.api.Common.uploadImage(a.tempFilePaths[0],"bill").then((function(a){var i=a[1];if(200==i.statusCode){var o=JSON.parse(i.data);e.billData.images=e.billData.images.concat(o.path)}else t.showToast({title:"图片上传失败",icon:error,duration:2e3})}))}})},UploadImages:function(){this.chooseImages.map((function(t,e){return{name:"images"+e,uri:t}}))},ViewImage:function(e){t.previewImage({urls:this.chooseImages,current:e.currentTarget.dataset.url})},DelImg:function(e){var a=this;t.showModal({title:"提示",content:"确定删除？",cancelText:"取消",confirmText:"确定",success:function(t){t.confirm&&(a.chooseImages.splice(e.currentTarget.dataset.index,1),a.billData.images.splice(e.currentTarget.dataset.index,1))}})},accountCallback:function(e){t.hideKeyboard(),this.billData.account_id=this.accounts[e].id,this.accountName=this.accounts[e].text},accountChange:function(t){this.accountsShow=!0},getCategories:function(t){var e=this;this.$u.api.Category.categories(t).then((function(a){0===t?(e.decCategories=a.data,e.categories=a.data,e.billData.category_id=a.data[0].id):e.inCategories=a.data}))},getAccounts:function(){var t=this;this.$u.api.Common.accounts().then((function(e){t.accounts=e.data,t.accountName=e.data[0].text}))},init:function(){this.getCategories(0),this.getCategories(1),this.getAccounts()},initBillData:function(){this.categories=this.decCategories,this.billData.ledger_id=0,this.billData.type=0,this.billData.account_id=0,this.billData.amount="",this.billData.category_id=this.categories[0].id,this.billData.note="",this.billData.images=[],this.chooseImages=[]},save:function(){var e=this;if(""==this.billData.amount||this.billData.amount<=0)return t.showToast({title:"金额填写有误",icon:"error",duration:2e3}),!1;this.$u.api.Bill.save(this.billData).then((function(a){!1!==a?(e.hideBillForm(),e.$emit("reload"),t.showToast({title:"创建成功",duration:2e3}),e.initBillData()):t.showToast({title:"创建失败",icon:"error",duration:2e3})})).catch((function(t){console.log(t)}))},showBillForm:function(){this.BillFormShow=!0},hideBillForm:function(){this.BillFormShow=!1}},mounted:function(){this.$store.state.vuex_scopeUserInfo||t.redirectTo({url:"/pages/auth/auth"}),this.init()}};e.default=a}).call(this,a("543d")["default"])},b59b:function(t,e,a){"use strict";var i=a("bea4"),o=a.n(i);o.a},bea4:function(t,e,a){}},[["4e79","common/runtime","common/vendor"]]]);