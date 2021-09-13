<template name="basics">
	<view>
		<scroll-view scroll-y class="page">
			<view class="index-header bg-blue" :style="[{paddingTop:CustomBar + 'px'}]">
				<view class="title date" @tap="showPickerMonth">
					{{ filterParams.year }} 年<text class="text-xxxl month-num">{{ filterParams.month }}</text>月
					<u-icon class="arrow-down-fill" name="arrow-down-fill" color="#c0c4cc" size="30"></u-icon>
				</view>
				<view class="title"><text class="cuIcon-emoji mr"></text> {{ quotation }}</view>
				<image src="/static/images/wave.gif" mode="scaleToFill" class="gif-wave"></image>
			</view>
			<view class="padding flex text-center text-grey bg-white shadow-warp">
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
			
			<bills :bills=billList></bills>
			
			<u-picker mode="time" v-model="pickerMonthShow" :params="pickerMonthParams" :end-year="filterParams.year" title="账单月份" @confirm="pickerMonthConfirm">
			</u-picker>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	import bills from "../bill/bills.vue";
	export default {
		name: "basics",
		components: {
			bills
		},
		data() {
			return {
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
				billList: []
			};
		},
		onShow() {
			console.log("success")
		},
		methods: {
			showPickerMonth: function() {
				this.pickerMonthShow = true;
			},
			pickerMonthConfirm: function(params) {
				this.filterParams.year = params.year;
				this.filterParams.month = parseInt(params.month);
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
			this.filterParams.year = new Date().getFullYear();
			this.filterParams.month = new Date().getMonth() + 1;
			
			this.init();
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
		position: relative;
		z-index: 1;
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

	.text-xxxl {
		font-size: 66rpx;
	}

	.mr {
		margin-right: 10rpx;
	}
</style>
