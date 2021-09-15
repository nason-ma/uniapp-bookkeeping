<template>
	<view class="page">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">账单详情</block>
		</cu-custom>

		<view class="cu-list menu card-menu margin-top sm-border">
			<view class="cu-item">
				<view class="content">
					<i class="iconfont category-icon"
						:class="[billInfo.category.icon, billInfo.type == 0 ? 'text-orange' : 'text-blue']"><text
							class="text-grey category-name">{{ billInfo.category.name }}</text></i>
					<!-- <text class="text-grey">餐饮</text> -->
				</view>
				<view class="action">
					<text class="text-xxl">{{ billInfo.amount }}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view class="text-grey">
						备注
					</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text> {{ billInfo.note }}
					</view>
				</view>
			</view>
		</view>

		<view class="cu-list menu card-menu margin-top sm-border">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">账本</text>
				</view>
				<view class="action">
					<view class="cu-tag round bg-blue light">总账本</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">账户</text>
				</view>
				<view class="action">
					<view class="cu-tag round bg-olive light">{{ billInfo.account.text }}</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">时间</text>
				</view>
				<view class="action">
					<text class="text-grey">{{ billInfo.created_at }}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view class="text-grey">
						图片
					</view>
					<view class="grid col-4 grid-square flex-sub margin-top-sm" v-if="billInfo.images.length > 0">
						<view class="bg-img" v-for="(img, index) in billInfo.images" :key="index" @click="previewImg(index)">
							<image :src="img" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view class="action" v-if="billInfo.images.length == 0">
					<text class="text-grey">无</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				billInfo: {}
			};
		},
		onLoad(options) {
			if (!options.id) {
				uni.showToast({
					title: '参数有误',
					duration: 2000
				});
				uni.navigateBack();
			}
			this.id = options.id;
		},
		methods: {
			getDetail() {
				this.$u.api.Bill.detail(this.id).then(result => {
					this.billInfo = result;
				});
			},
			// 预览图片多张
			previewImg(index) {
				let images = this.billInfo.images;
				uni.previewImage({
					current: index - 1,
					urls: images,
					indicator: 'number',
					loop: true
				});
			}
		},
		mounted() {
			this.getDetail();
		}
	}
</script>

<style>
	.page {
		height: 100Vh;
		width: 100vw;
	}

	.page.show {
		overflow: hidden;
	}

	.switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}

	.switch-music::after {
		content: "\e66a";
	}

	.switch-music::before {
		content: "\e6db";
	}

	.category-icon {
		font-size: 58rpx;
	}

	.category-name {
		font-size: 30rpx;
		margin-left: 10rpx;
	}
</style>
