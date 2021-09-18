<template>
	<scroll-view scroll-y class="page">
		<view class="bg-white nav fixed">
			<view class="UCenter-bg" :style="[{paddingTop:CustomBar + 'px'}]">
				<view class="avatar-wrap">
					<view v-if="avatarImage" class="cu-avatar round lg"
						:style="{backgroundImage:'url(' + avatarImage + ')'}">
					</view>
					<view v-else class="cu-avatar round lg"
						style="background-image:url(http://120.78.216.40/uploads/images/common/default-avatar.png)">
					</view>
				</view>
				<view class="text-xl" v-if="vuex_user !== null && vuex_scopeUserInfo">{{ vuex_user.name }}</view>
				<view class="text-xl" v-else>
					<button class="cu-btn round bg-green" @tap="showAuth">点击授权</button>
				</view>
				<image src="../../static/images/wave.gif" mode="scaleToFill" class="gif-wave"></image>
			</view>
			<view class="flex text-center text-black bg-white shadow-warp">
				<view class="flex flex-sub flex-direction" @tap="showPickerMonth">
					<view class="margin-bottom-sm cu-item"> {{ date }}
						<u-icon class="arrow-down-fill margin-left-xs" name="arrow-down-fill" color="#c0c4cc" size="26">
						</u-icon>
					</view>
				</view>
				<view class="flex flex-sub flex-direction">
					<view class="padding-bottom-sm margin-lr cu-item" :class="0==params.type?'text-green cur':''"
						data-id="0" @tap="typeSelect"> 支出</view>
				</view>
				<view class="flex flex-sub flex-direction">
					<view class="padding-bottom-sm margin-lr cu-item" :class="1==params.type?'text-green cur':''"
						data-id="1" @tap="typeSelect"> 收入</view>
				</view>
			</view>
		</view>

		<view class="bg-white margin radius" style="margin-top: 420rpx;"
			:style="[{animation: 'show ' + ((0+1)*0.2+1) + 's 1'}]">
			<view class="flex justify-between">
				<view class="padding-sm margin-xs radius flex-sub">
					<view>本月{{ inDecName }}(元)</view>
					<view class="text-xxl text-black text-bold margin-top-ssm">{{ amountData.monthAmount }}</view>
				</view>
				<view class="padding-sm margin-xs radius flex-sub text-right">
					<view>结余(元)</view>
					<view class="text-xxl text-black text-bold margin-top-ssm">{{ amountData.balanceAmount }}</view>
				</view>
			</view>
			<view class="flex justify-between">
				<view class="padding-sm margin-xs radius flex-sub padding-top0">
					<view>比上月{{ inDecName }}</view>
					<view class="text-xxl text-black text-bold margin-top-ssm">{{ amountData.compareAmount }}</view>
				</view>
				<view class="padding-sm margin-xs radius flex-sub text-right padding-top0">
					<view>{{ inDecName }}笔数</view>
					<view class="text-xxl text-black text-bold margin-top-ssm">{{ amountData.amountCount }}</view>
				</view>
			</view>
		</view>
		<view class="padding charts-box bg-white margin radius" :style="[{animation: 'show ' + ((1+1)*0.2+1) + 's 1'}]">
			<view class="text-bold margin-bottom">{{ inDecName }}趋势</view>
			<view v-if="monthTrendData != null && vuex_scopeUserInfo">
				<qiun-data-charts type="tline" :chartData="monthTrendData" :ontouch="true" :inScrollView="true"
					:canvasId="month_trend_canvas_zhaoyun" :canvas2d="true" />
			</view>

			<view v-if="monthTrendData == null || !vuex_scopeUserInfo" class="padding-xl margin-top-xxl">
				<u-empty :text="vuex_emptyText" mode="list"></u-empty>
			</view>
		</view>
		<view class="padding charts-box bg-white margin radius" :style="[{animation: 'show ' + ((2+1)*0.2+1) + 's 1'}]">
			<view class="text-bold margin-bottom">分类{{ inDecName }}排行</view>
			<view v-if="categoryCharts.series.length > 0 && vuex_scopeUserInfo">
				<qiun-data-charts type="pie" :chartData="categoryCharts" :inScrollView="true"
					:canvasId="category_charts_canvas_mananxun" :canvas2d="true" />

				<view class="cu-list menu card-menu margin-top">
					<view class="cu-item" v-for="(item,index) in categorySortData" :key="index">
						<view class="content padding-tb-sm">
							<view>
								<i class="iconfont" :class="[item.icon, inDecTextColor]"></i>
								<text>{{ item.name }}</text>
								<view class='cu-tag radius sm'>{{ item.count }}笔</view>
							</view>
							<view class="text-gray text-sm">
								<view class="cu-progress round xs striped active">
									<view :class="inDecBgColor" :style="[{ width:item.progress}]"></view>
								</view>
							</view>
						</view>
						<view class="action text-black text-xl text-right width-40">{{ item.amount }}</view>
					</view>
				</view>
			</view>
			<view v-if="categoryCharts.series.length == 0 || !vuex_scopeUserInfo" class="padding-xl margin-top-xxl">
				<u-empty :text="vuex_emptyText" mode="list"></u-empty>
			</view>
		</view>
		<u-picker mode="time" v-model="pickerMonthShow" :params="pickerMonthParams" :end-year="params.year" title="账单月份"
			@confirm="pickerMonthConfirm">
		</u-picker>
		<!-- <view class="cu-modal bottom-modal" v-if="!vuex_scopeUserInfo" :class="authShow?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action">授权登录</view>
					<view class="action" @tap="hideAuth">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<auth @reload="reload"></auth>
			</view>
		</view> -->
		<billform @reload="init"></billform>
	</scroll-view>
</template>

<script>
	import billform from '../bill/form.vue';
	export default {
		components: {
			billform
		},
		data() {
			return {
				params: {
					type: 0,
					year: "",
					month: ""
				},
				amountData: {
					monthAmount: '0.00',
					balanceAmount: '0.00',
					compareAmount: '0.00',
					amountCount: '0.00'
				},
				date: "",
				pickerMonthShow: false,
				pickerMonthParams: {
					year: true,
					month: true,
					day: false
				},
				CustomBar: this.CustomBar,
				authShow: true,
				categoryCharts: {
					series: []
				},
				monthTrendData: {
					categories: [],
					series: []
				},
				categorySortData: []
			}
		},
		onShow() {
			if (this.params.year == '' || this.params.month == '') {
				let year = new Date().getFullYear();
				let month = new Date().getMonth() + 1;
				month = month < 10 ? '0' + month : month;
				this.date = year + '年' + month + '月';
				this.params.year = year;
				this.params.month = month;
			}
			this.init();
		},
		onPullDownRefresh() {
			this.init();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		computed: {
			// 计算属性的 getter
			inDecName: function() {
				return this.params.type == 0 ? '支出' : '收入'
			},
			inDecTextColor: function() {
				return this.params.type == 0 ? 'text-orange' : 'text-blue'
			},
			inDecBgColor: function() {
				return this.params.type == 0 ? 'bg-orange' : 'bg-blue'
			},
			avatarImage() {
				if (this.$store.state.vuex_user !== null) {
					return this.$store.state.vuex_user.avatar;
				}
				return '';
			}
		},
		methods: {
			typeSelect(e) {
				this.params.type = e.currentTarget.dataset.id;
				this.init();
			},
			showPickerMonth: function() {
				this.pickerMonthShow = true;
			},
			pickerMonthConfirm: function(params) {
				this.params.year = params.year;
				this.params.month = params.month;
				this.date = params.year + '年' + params.month + '月';
				this.init();
			},
			showAuth() {
				uni.redirectTo({
					url: '/pages/auth/auth'
				})
			},
			hideAuth: function() {
				this.authShow = false;
			},
			getAmounts() {
				this.$u.api.Statistics.amounts(this.params).then(result => {
					this.amountData = result;
				});
			},
			getTrends() {
				this.$u.api.Statistics.trends(this.params).then(result => {
					this.monthTrendData.categories = result.categories;
					this.monthTrendData.series = result.series;
				});
			},
			getCategoryCharts() {
				this.$u.api.Statistics.getCategoryCharts(this.params).then(result => {
					this.categoryCharts.series = result.series;
					this.categorySortData = result.categorySortData;
				});
			},
			init() {
				this.getAmounts();
				this.getTrends();
				this.getCategoryCharts();
			}
		},
		mounted() {
			if (!this.$store.state.vuex_scopeUserInfo) {
				uni.redirectTo({
					url: '/pages/auth/auth'
				})
			} 
			
			// this.init();
		}
	}
</script>

<style scoped>
	.UCenter-bg {
		background-image: url(http://120.78.216.40/uploads/images/common/user-index.jpg);
		background-size: cover;
		height: 300rpx;
		display: flex;
		justify-content: left;
		padding-top: 40rpx;
		overflow: hidden;
		position: relative;
		flex-direction: row;
		align-items: baseline;
		color: #fff;
		font-weight: 300;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	}

	.UCenter-bg text {
		opacity: 0.8;
	}

	.UCenter-bg image {
		width: 100rpx;
		height: 100rpx;
	}

	.UCenter-bg .gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 50rpx;
	}

	.avatar-wrap {
		border-radius: 50%;
		border: 1px solid white;
		margin: 0 30rpx;
	}

	.border-bottom {
		border-bottom: 2px solid #39b54a;
	}

	.margin-lr {
		padding-left: 20rpx;
		padding-right: 20rpx;
	}

	.nav .cu-item {
		margin: 0 30rpx;
	}

	.margin-top-ssm {
		margin-top: 10rpx;
	}

	.padding-top0 {
		padding-top: 0;
	}

	.width-40 {
		width: 40%;
	}

	.cu-list.menu>.cu-item {
		padding: 0;
	}

	.cu-list.card-menu {
		margin-left: 0;
		margin-right: 0;
	}

	.cu-list .iconfont {
		margin-right: 20rpx;
		font-size: 44rpx;
	}
</style>
