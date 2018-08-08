<template>
	<div class="bg">
		<div class="wrapper-header">
			<header class="wrapper-header-nav">
				<a href="/" id="logo">

				</a>
				<div class="wrapper-header-nav-list">
					<Menu mode="horizontal" :theme="'light'" :active-name="menuActiveName">
						<MenuItem name="index" @click.native="goToLink('/index')">
							<Icon type="ios-paper"></Icon>
							首页
						</MenuItem>
						<Submenu name="publishjob">
							<template slot="title">
								<Icon type="briefcase"></Icon>
								职位发布
							</template>
							<MenuItem name="jobs" @click.native="goToLink('/jobs')">职位管理</MenuItem>
							<MenuItem name="addjobs" @click.native="goToLink('/addjob')">新增职位</MenuItem>
						</Submenu>
						<!--<Submenu name="3">-->
							<!--<template slot="title">-->
								<!--<Icon type="email"></Icon>-->
								<!--应聘管理-->
							<!--</template>-->
							<!--<MenuItem name="mailbox">收件箱</MenuItem>-->
							<!--<MenuItem name="talentpool">公司人才库</MenuItem>-->
						<!--</Submenu>-->
						<Submenu name="">
							<template slot="title">
								<Icon type="search"></Icon>
								简历搜索
							</template>
							<MenuItem name="searchresume" @click.native="goToLink('/searchresume')">搜索简历</MenuItem>
							<MenuItem name="tempfolder" @click.native="goToLink('/tempresume')">暂存文件夹</MenuItem>
						</Submenu>
						<Submenu name="5">
							<template slot="title">
								<Icon type="person"></Icon>
								{{userInfo.uname || userInfo.utel}}
							</template>
							<!--<MenuItem name="5-1">个人中心</MenuItem>-->
							<MenuItem name="5-2" @click.native="goToLink('/perfectinfo')">完善信息</MenuItem>
							<MenuItem name="5-3" @click.native="logout">退出登录</MenuItem>
						</Submenu>
					</Menu>
				</div>
			</header>
		</div>
		<div id="container">
			<router-view></router-view>
		</div>
		<footer class="m-t-10 tc">
			<p>信活工作网版权所有 ©2018</p>
			<p class="note">
				<a class="gan" target="_blank" href="#">粤ICP备17144670号-1</a>
			</p>
		</footer>
	</div>
</template>
<script>
	import FnMixins from './assets/js/fn-mixins'

	export default {
		data() {
			return {}
		},
		computed: {
			menuActiveName() {
				const path = this.$route.path.split('/')
				return path[1]
			},
			userInfo() {
				return JSON.parse(localStorage.getItem('userinfo'))
			},
		},
		methods: {
			logout() {
				localStorage.clear()
				location.href = `${location.origin}/login.html`
			}
		},
		mounted() {
			document.querySelector('#container').style.minHeight = document.documentElement.clientHeight - 90 + 'px'
		},
		beforeDestroy() {

		},
		mixins: [FnMixins],
	}
</script>
<style scoped lang="less">
	.wrapper-header {
		position: fixed;
		width: 100%;
		height: 59px;
		top: 0;
		right: 0;
		z-index: 1000;
		box-shadow: 0 1px 1px rgba(0, 0, 0, .08);
		background: #fff;
	}

	.wrapper-header-nav {
		width: 95%;
		height: 65px;
		margin: 0 auto;
	}

	.wrapper-header-nav-list {
		height: inherit;
		float: right;
	}

	#container {
		margin-top: 70px;
		padding: 20px 10% 50px;
		background: #fff;
	}

	#logo {
		display: inline-block;
		height: 60px;
		line-height: 60px;
		background-image: url("./images/logo.png");
		background-size: 100%;
		background-position: center;
		background-repeat: no-repeat;
		width: 70px;
	}

	footer {
		padding: 10px 20px 10px;
		background: #fff;

		li {
			margin-top: 10px;
			margin-left: 15px;
			font-size: 12px;
		}
	}

	.gan {
		display: inline-block;
		height: 20px;
		line-height: 20px;
		color: #999;
		padding-left: 25px;
		background: url(//img01.51jobcdn.com/im/2016/license/gongan.png) no-repeat;
	}

</style>
