<template>
	<view>
		<view class="edit-wrap" @tap="showBillForm">
			<u-icon name="edit-pen-fill" color="#ffffff" size="46"></u-icon>
		</view>
		<view class="cu-modal bottom-modal" :class="BillFormShow?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action">总账本</view>
					<view class="action" @tap="hideBillForm">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-sm bg-white">
					<view class='flex flex-wrap justify-between'>
						<view>
							<view class='cu-tag light radius' :class="billData.type==0?'bg-orange':'bg-grey'"
								@tap="billType" data-type="0">支出</view>
							<view class='cu-tag light radius' :class="billData.type==1?'bg-blue':'bg-grey'"
								@tap="billType" data-type="1">收入</view>
						</view>
						<view class="action flex-wrap asc cu-tag radius" @tap="accountChange">
							<view>{{ accountName }}
								<u-icon class="arrow-down-fill margin-left-xs" name="arrow-down-fill"
									color="#c0c4cc" size="26">
								</u-icon>
							</view>
						</view>
					</view>
					<view class="amount-wrap">
						<view class="cu-form-group margin-top-xl border-bottom">
							<text class="text-xxl text-black text-bold">￥</text>
							<input name="input" type="digit" class="amount-input"
								v-model="billData.amount"></input>
						</view>
					</view>
					<swiper class="screen-swiper round-dot" :indicator-dots="true" :autoplay="false" duration="500"
						:current="categorySwiperCurrent" @change="swiperScroll">
						<swiper-item v-for="index of Math.ceil(categories.length / (gridCol * 2))" :key="index">
							<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
								<view class="cu-item" v-for="(item,index2) in categories" :key="index2"
									v-if="index2>=gridCol*2*index && index2<gridCol*2*index + gridCol*2"
									@tap="categoryChange(index2)">
									<view
										:class="(billData.category_id == item.id) || (billData.category_id == '' && index2 == 0) ? categoryColorClass : 'text-gray'">
										<i class="iconfont" :class="item.icon"></i>
									</view>
									<view class="text-xs text"
										:class="(billData.category_id == item.id) || (billData.category_id == '' && index2 == 0) ? categoryColorClass : ''">
										{{item.name}}
									</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
					<view class="cu-form-group border-bottom">
						<textarea maxlength="150" v-model="billData.note" placeholder="添加备注信息..."></textarea>
					</view>
					<view class="cu-bar bg-white">
						<view class="action">
							图片上传
						</view>
						<view class="action">
							{{chooseImages.length}}/4
						</view>
					</view>
					<view class="cu-form-group">
						<view class="grid col-4 grid-square flex-sub">
							<view class="bg-img" v-for="(item,index) in chooseImages" :key="index" @tap="ViewImage"
								:data-url="chooseImages[index]">
								<image :src="chooseImages[index]" mode="aspectFill"></image>
								<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
									<text class='cuIcon-close'></text>
								</view>
							</view>
							<view class="solids" @tap="ChooseImage" v-if="chooseImages.length<4">
								<text class='cuIcon-cameraadd'></text>
							</view>
						</view>
					</view>
					<u-action-sheet :list="accounts" v-model="accountsShow" @click="accountCallback">
					</u-action-sheet>
					<view class="padding flex flex-direction confrimBtn" @tap="save">
						<button class="cu-btn bg-blue lg">完成</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'billform',
		components: {
			
		},
		data() {
			return {
				BillFormShow: false,
				billData: {
					ledger_id: 0,
					type: 0,
					account_id: 0,
					amount: "",
					category_id: 0,
					note: "",
					images: []
				},
				chooseImages: [],
				accountsShow: false,
				accountName: "",
				accounts: [],
				categoryColorClass: 'text-orange',
				categories: [],
				decCategories: [],
				inCategories: [],
				gridCol: 5,
				gridBorder: false,
				categorySwiperCurrent: 0,
				old: {
					categorySwiperCurrent: 0
				}
			}
		},
		methods: {
			swiperScroll: function(e) {
				this.old.categorySwiperCurrent = e.detail.current
			},

			billType: function(e) {
				this.billData.type = parseInt(e.currentTarget.dataset.type);
				this.categoryColorClass = this.billData.type == 0 ? 'text-orange' : 'text-blue';
				this.categories = this.billData.type == 0 ? this.decCategories : this.inCategories;
				this.billData.category_id = this.categories[0].id;

				this.categorySwiperCurrent = this.old.categorySwiperCurrent
				this.$nextTick(function() {
					this.categorySwiperCurrent = 0
				});
			},

			categoryChange: function(index) {
				this.billData.category_id = this.categories[index].id;
			},

			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.chooseImages.length != 0) {
							this.chooseImages = this.chooseImages.concat(res.tempFilePaths);
						} else {
							this.chooseImages = res.tempFilePaths;
						}

						this.$u.api.Common.uploadImage(res.tempFilePaths[0], 'bill').then(result => {
							let resultData = result[1];
							if (resultData.statusCode == 200) {
								let data = JSON.parse(resultData.data);
								this.billData.images = this.billData.images.concat(data.path);
							} else {
								uni.showToast({
									title: '图片上传失败',
									icon: error,
									duration: 2000
								});
							}
						});
					}
				});
			},

			UploadImages() {
				let files = this.chooseImages.map((value, index) => {
					return {
						name: 'images' + index,
						uri: value
					}
				});
			},

			ViewImage(e) {
				uni.previewImage({
					urls: this.chooseImages,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '提示',
					content: '确定删除？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.chooseImages.splice(e.currentTarget.dataset.index, 1);
							this.billData.images.splice(e.currentTarget.dataset.index, 1);
						}
					}
				})
			},

			accountCallback(index) {
				uni.hideKeyboard();
				this.billData.account_id = this.accounts[index].id;
				this.accountName = this.accounts[index].text;
			},

			accountChange(e) {
				this.accountsShow = true;
			},

			getCategories(type) {
				this.$u.api.Category.categories(type).then(result => {
					if (type === 0) {
						this.decCategories = result.data;
						this.categories = result.data;
						this.billData.category_id = result.data[0].id;
					} else {
						this.inCategories = result.data;
					}
				});
			},

			getAccounts() {
				this.$u.api.Common.accounts().then(result => {
					this.accounts = result.data;
					this.accountName = result.data[0].text;
				});
			},

			init() {
				this.getCategories(0);
				this.getCategories(1);
				this.getAccounts();
			},

			initBillData() {
				this.categories = this.decCategories;
				this.billData.ledger_id = 0;
				this.billData.type = 0;
				this.billData.account_id = 0;
				this.billData.amount = '';
				this.billData.category_id = this.categories[0].id;
				this.billData.note = '';
				this.billData.images = [];
				this.chooseImages = [];
			},

			save() {
				if (this.billData.amount == '' || this.billData.amount <= 0) {
					uni.showToast({
						title: '金额填写有误',
						icon: 'error',
						duration: 2000
					});
					return false;
				}
				this.$u.api.Bill.save(this.billData).then(result => {
					if (result !== false) {
						this.hideBillForm();
						this.$emit('reload');
						uni.showToast({
							title: '创建成功',
							duration: 2000
						});
						this.initBillData();
					} else {
						uni.showToast({
							title: '创建失败',
							icon: 'error',
							duration: 2000
						});
					}
				}).catch(error => {
					console.log(error);
				});
			},

			showBillForm: function() {
				this.BillFormShow = true;
			},

			hideBillForm: function() {
				this.BillFormShow = false;
			}
		},
		mounted() {
			if (!this.$store.state.vuex_scopeUserInfo) {
				uni.redirectTo({
					url: '/pages/auth/auth'
				})
			} 
			
			this.init();
		}
	}
</script>

<style scoped>
	.asc {
		align-self: center;
	}

	.cu-form-group {
		text-align: left;
		padding-left: 10rpx;
	}

	.cu-form-group textarea {
		margin: 10rpx 0 0 0;
	}

	.amount-wrap .amount-input {
		font-size: 66rpx;
		color: black;
		font-weight: bold;
		padding-left: 10rpx;
		height: 80rpx;
	}

	.amount-wrap .margin-top-xl {
		margin-top: 40rpx;
	}

	.border-bottom {
		border-bottom: 1px solid #e7ebed;
	}

	.cu-list .iconfont {
		font-size: 48rpx;
	}

	.screen-swiper {
		min-height: 320rpx;
	}

	.cu-list.grid>.cu-item .text {
		font-size: 22rpx;
		margin-top: 10rpx;
		line-height: 40rpx;
	}

	.cu-bar .action:first-child {
		margin-left: 10rpx;
	}

	.confrimBtn {
		padding: 0 30rpx;
	}

	.edit-wrap {
		width: 100rpx;
		height: 100rpx;
		position: fixed;
		z-index: 9;
		display: flex;
		flex-direction: row;
		flex-direction: column;
		justify-content: center;
		background-color: #2979ff;
		align-items: center;
		transition: opacity 0.4s;
		bottom: 100px;
		right: 20px;
		border-radius: 5000px;
	}

	.cu-form-group textarea {
		height: 3.6em;
	}
</style>
