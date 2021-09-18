<template>
	<scroll-view scroll-y class="page">
		<view class="index-header bg-blue nav fixed" :style="[{paddingTop:CustomBar + 'px'}]" id="header">
			<view class="title date" @tap="showPickerMonth">
				{{ filterParams.year }} 年<text class="text-xxxl month-num">{{ filterParams.month }}</text>月
				<u-icon class="arrow-down-fill" name="arrow-down-fill" color="#c0c4cc" size="30"></u-icon>
			</view>
			<view class="title u-flex-nowrap"><text class="cuIcon-emoji mr"></text> {{ quotation }}</view>
			<image src="/static/images/wave.gif" mode="scaleToFill" class="gif-wave"></image>
		</view>

		<view class="padding flex text-center text-grey bg-white shadow-warp" :style="[{paddingTop: headerHeight + 15 + 'px'}]">
			<view class="flex flex-sub flex-direction solid-right">
				<view class="text-xxl text-orange text-price">{{ decAmount }}</view>
				<view class="margin-top-sm">
					<text class="cuIcon-moneybag mr"></text> 支出
				</view>
			</view>
			<view class="flex flex-sub flex-direction">
				<view class="text-xxl text-blue text-price">{{ inAmount }}</view>
				<view class="margin-top-sm">
					<text class="cuIcon-moneybagfill mr"></text> 收入
				</view>
			</view>
		</view>

		<bills :bills="billList" @reload="init"></bills>
		<billform @reload="init"></billform>

		<u-back-top :scroll-top="scrollTop" :bottom="60"></u-back-top>
		<u-picker mode="time" v-model="pickerMonthShow" :params="pickerMonthParams" :end-year="filterParams.year"
			title="账单月份" @confirm="pickerMonthConfirm">
		</u-picker>
	</scroll-view>
</template>

<script>
	import bills from "../bill/bills.vue";
	import billform from '../bill/form.vue';
	export default {
		components: {
			bills,
			billform
		},
		data() {
			return {
				headerHeight: 0,
				CustomBar: this.CustomBar,
				inAmount: "0.00",
				decAmount: "0.00",
				quotation: "授权登录，开启记账之旅~",
				filterParams: {
					year: "",
					month: ""
				},
				pickerMonthParams: {
					year: true,
					month: true,
					day: false
				},
				pickerMonthShow: false,
				billList: [],
				scrollTop: 0
			};
		},
		onLoad: async function(options) {
			// console.log(this.$store.state.vuex_token);
		},
		onShow() {
			if (this.filterParams.year == '' || this.filterParams.month == '') {
				this.filterParams.year = new Date().getFullYear();
				this.filterParams.month = new Date().getMonth() + 1;
			}

			this.init();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onPullDownRefresh() {
			this.init();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			showPickerMonth: function() {
				this.pickerMonthShow = true;
			},
			pickerMonthConfirm: function(params) {
				this.filterParams.year = params.year;
				this.filterParams.month = parseInt(params.month);
				this.init();
			},
			randomQuotation() {
				this.$u.api.Share.randomQuotation().then(result => {
					this.quotation = result.title;
				});
			},
			getIndex() {
				this.$u.api.Bill.index(this.filterParams).then(result => {
					this.inAmount = result.inAmount;
					this.decAmount = result.decAmount;
					this.billList = result.bills;
				});
			},
			init() {
				this.randomQuotation();
				this.getIndex();
			}
		},
		mounted() {
			if (!this.$store.state.vuex_scopeUserInfo) {
				uni.redirectTo({
					url: '/pages/auth/auth'
				})
			}

			// this.init();
			const query = uni.createSelectorQuery().in(this);
			query.select('#header').boundingClientRect(data => {
				this.headerHeight = data.height;
			}).exec();
		}
	}
</script>

<style scoped>
	.page {
		height: 100vh;
	}

	.index-header {
		padding: 100rpx 30rpx 50rpx 30rpx;
		width: 100%;
		background-image: url(../../static/images/defaultBg.png);
		background-size: cover;
		background-position: center;
		/* position: relative; */
		/* z-index: 1; */
	}

	.index-header .gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	.index-header view {
		padding: 15rpx 0;
	}

	.index-header .date {
		width: 40%;
	}

	.index-header .month-num {
		margin: 0 10rpx;
	}

	.index-header .arrow-down-fill {
		margin-left: 20rpx;
	}

	.index-header .title {
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.text-xxxl {
		font-size: 66rpx;
	}

	.mr {
		margin-right: 10rpx;
	}
</style>
