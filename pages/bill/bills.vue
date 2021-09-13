<template name="bills">
	<view>
		<view v-if="bills.length == 0" class="padding-xl margin-top-xxl">
			<u-empty :text="vuex_emptyText" mode="list"></u-empty>
		</view>
		<view v-for="(bill, index) in bills" :key="index" :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]">
			<view class="cu-bar bg-white solid-bottom margin-top-sm">
				<view class="action">
					<text class="cuIcon-title text-blue "></text> {{ bill.date }}
				</view>
				<view class="action text-sm text-grey">
					<view class="cu-capsule round">
						<view class='cu-tag bg-orange sm'>
							支
						</view>
						<view class="cu-tag line-orange sm">
							{{ bill.dayDec }}
						</view>
					</view>
					<view class="cu-capsule round">
						<view class='cu-tag bg-blue sm'>
							收
						</view>
						<view class="cu-tag line-blue sm">
							{{ bill.dayIn }}
						</view>
					</view>
				</view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item" v-for="(list, index2) in bill.lists" :key="index2">
					<view class="cu-avatar" :class="list.type == 0 ? 'text-orange' : 'text-blue'">
						<i class="iconfont category-icon" :class="list.category.icon"></i>
					</view>
					
					<view class="content">
						<view class="text-grey">{{ list.category.name }} <text class="text-grey text-xs cu-tag radius sm"
								style="margin-left: 20rpx;">{{ list.time }}</text></view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								{{ list.note }}
							</view>
						</view>
					</view>
					<view class="action" style="width: auto; margin-right: 20rpx;">
						<view class="text-xl">{{ list.amount }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "bills",
		props: {
			bills: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				
			};
		},
		onShow() {
			console.log("success");
		},
		mounted() {
		}
	}
</script>

<style scoped>	
	.cu-list.menu-avatar>.cu-item .content {
		width: calc(100% - 96rpx - 140rpx - 120rpx - 20rpx);
	}
	
	.cu-avatar {
		width: 80rpx;
		height: 80rpx;
		background-color: unset;
	}
	
	.margin-top-xxl {
		margin-top: 100rpx;
	}
	
	.category-icon {
		font-size: 68rpx;
	}
</style>
