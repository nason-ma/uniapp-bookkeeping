<template>
	<view>
		<basics v-if="PageCur=='basics'"></basics>
		<statistics v-if="PageCur=='statistic'"></statistics>
		<view class="cu-bar tabbar bg-white shadow foot" v-if="false">
			<view class="action" @click="NavChange" data-cur="basics">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/list' + [PageCur=='basics'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='basics'?'text-blue':'text-gray'">首页</view>
			</view>
			<view class="action text-gray add-action" @tap="showBillCreate">
				<button class="cu-btn cuIcon-add bg-blue shadow"></button>
				记一笔
			</view>
			<view class="action" @click="NavChange" data-cur="statistic">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/tongji' + [PageCur == 'statistic'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='statistic'?'text-blue':'text-gray'">统计</view>
			</view>
		</view>

		<view class="cu-modal bottom-modal" :class="billCreateShow?'show':''">
			<view class="cu-dialog">
				<view v-if="vuex_scopeUserInfo">
					<view class="cu-bar bg-white">
						<view class="action">总账本</view>
						<view class="action" @tap="hideBillCreate">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<bill-create @reload="reload"></bill-create>
				</view>
				<view v-if="!vuex_scopeUserInfo">
					<view class="cu-bar bg-white">
						<view class="action">授权登录</view>
						<view class="action" @tap="hideBillCreate">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<auth @reload="reload"></auth>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import BillCreate from "../bill/create.vue";
	import auth from "../auth/auth.vue";
	export default {
		components: {
			BillCreate,
			auth
		},
		data() {
			return {
				PageCur: 'basics',
				billCreateShow: false
			}
		},
		onLoad: function(options) {
			this.$u.api.isScopeUserInfo();
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			},

			showBillCreate: function() {
				this.billCreateShow = true;
			},

			hideBillCreate: function() {
				this.billCreateShow = false;
			},

			reload() {
				this.hideBillCreate();
			},
		},
		mounted() {
			console.log(this.$store.state.vuex_token);
		}
	}
</script>

<style>

</style>
