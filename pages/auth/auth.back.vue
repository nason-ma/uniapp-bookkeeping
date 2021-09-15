<template name="auth">
	<view class="page">
		<view class='UCenter-bg padding'>
			<image src='../../static/logo.png' class='png' mode='widthFix'></image>
			<view class='text-l'>为更好的提供服务，申请获取以下权限</view>
			<view class='margin-top-sm'>
				<text>获取你的公开信息（昵称、头像、地区及性别）</text>
			</view>
		</view>
		<view class='padding-xl'>
			<button class='cu-btn  bg-blue shadow lg block' lang="zh_CN" open-type="getUserInfo"
				@tap="getUserProfile">授权登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'auth',
		data() {
			return {
				code: ''
			};
		},

		methods: {
			getUserProfile() {
				let that = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						that.code = loginRes.code;
						that.$emit('hide');
					}
				});
				uni.getUserProfile({
					desc: '用于完善会员资料',
					lang: 'zh_CN',
					success: (res) => {
						that.$u.vuex('vuex_scopeUserInfo', true);
						that.$u.post('auth', {
							code: that.code,
							user_info: res.userInfo
						}).then(result => {
							that.$u.vuex('vuex_token', result.access_token);
							that.$u.vuex('vuex_tokenExpires', result.expires_in);
							that.$u.vuex('vuex_tokenStart', that.NowTime());
							that.$u.vuex('vuex_user', result.user);
							that.$emit('reload');
							
						}).catch(error => {
							console.log(error);
						}) 
					}
				})
			}
		},
		mounted() {

		}
	}
</script>

<style scoped>
	/* .page {
		height: 100vh;
	} */

	.UCenter-bg {
		/* background-image: url(https://image.weilanwl.com/color2.0/index.jpg); */
		/* background-size: cover; */
		display: flex;
		justify-content: center;
		overflow: hidden;
		position: relative;
		flex-direction: column;
		align-items: center;
		font-weight: 300;
	}

	.UCenter-bg image {
		width: 200rpx;
		height: 200rpx;
	}
</style>
