(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"0b86":function(e,t,n){"use strict";(function(e){n("27d5");var t=i(n("66fd")),o=i(n("1f03")),r=i(n("5184")),u=i(n("2bee")),a=i(n("98cb")),c=i(n("a980"));function i(e){return e&&e.__esModule?e:{default:e}}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d=n("937e");t.default.mixin(d),t.default.use(u.default);var p=function(){n.e("colorui/components/cu-custom").then(function(){return resolve(n("fd11"))}.bind(null,n)).catch(n.oe)};t.default.component("cu-custom",p),t.default.config.productionTip=!1,o.default.mpType="app";var m=new t.default(f({store:r.default},o.default));t.default.use(a.default,m),t.default.use(c.default,m),e(m).$mount()}).call(this,n("543d")["createApp"])},"1d9b":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=u(n("a34a")),r=u(n("66fd"));function u(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n,o,r,u,a){try{var c=e[u](a),i=c.value}catch(l){return void n(l)}c.done?t(i):Promise.resolve(i).then(o,r)}function c(e){return function(){var t=this,n=arguments;return new Promise((function(o,r){var u=e.apply(t,n);function c(e){a(u,o,r,c,i,"next",e)}function i(e){a(u,o,r,c,i,"throw",e)}c(void 0)}))}}var i={onLaunch:function(){var t=c(o.default.mark((function t(){var n;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=this,t.next=3,e.getSetting({success:function(e){e.authSetting["scope.userInfo"]?n.$u.vuex("vuex_scopeUserInfo",!0):n.$u.vuex("vuex_scopeUserInfo",!1)}});case 3:e.getSystemInfo({success:function(e){r.default.prototype.StatusBar=e.statusBarHeight;var t=wx.getMenuButtonBoundingClientRect();t?(r.default.prototype.Custom=t,r.default.prototype.CustomBar=t.bottom+t.top-e.statusBarHeight):r.default.prototype.CustomBar=e.statusBarHeight+50}}),r.default.prototype.ColorList=[{title:"嫣红",name:"red",color:"#e54d42"},{title:"桔橙",name:"orange",color:"#f37b1d"},{title:"明黄",name:"yellow",color:"#fbbd08"},{title:"橄榄",name:"olive",color:"#8dc63f"},{title:"森绿",name:"green",color:"#39b54a"},{title:"天青",name:"cyan",color:"#1cbbb4"},{title:"海蓝",name:"blue",color:"#0081ff"},{title:"姹紫",name:"purple",color:"#6739b6"},{title:"木槿",name:"mauve",color:"#9c26b0"},{title:"桃粉",name:"pink",color:"#e03997"},{title:"棕褐",name:"brown",color:"#a5673f"},{title:"玄灰",name:"grey",color:"#8799a3"},{title:"草灰",name:"gray",color:"#aaaaaa"},{title:"墨黑",name:"black",color:"#333333"},{title:"雅白",name:"white",color:"#ffffff"}],r.default.prototype.NowTime=function(){var e=new Date,t=e.getFullYear(),n=e.getMonth()+1,o=e.getDate(),r=e.getHours()<10?"0"+e.getHours():e.getHours(),u=e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes(),a=e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds();n>=1&&n<=9&&(n="0"+n),o>=0&&o<=9&&(o="0"+o);var c=t+"-"+n+"-"+o+" "+r+":"+u+":"+a;return c};case 6:case"end":return t.stop()}}),t,this)})));function n(){return t.apply(this,arguments)}return n}(),onShow:function(){var e=c(o.default.mark((function e(){return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log("App Show");case 1:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}(),onHide:function(){console.log("App Hide")}};t.default=i}).call(this,n("543d")["default"])},"1f03":function(e,t,n){"use strict";n.r(t);var o=n("69df");for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);n("480e");var u,a,c,i,l=n("f0c5"),f=Object(l["a"])(o["default"],u,a,!1,null,null,null,!1,c,i);t["default"]=f.exports},"480e":function(e,t,n){"use strict";var o=n("c251"),r=n.n(o);r.a},"69df":function(e,t,n){"use strict";n.r(t);var o=n("1d9b"),r=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,(function(){return o[e]}))}(u);t["default"]=r.a},c251:function(e,t,n){}},[["0b86","common/runtime","common/vendor"]]]);