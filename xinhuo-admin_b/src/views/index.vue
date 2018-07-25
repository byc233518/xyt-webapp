<template>
	<div class="index">
		<Row justify="center" align="middle">
			<Col span="8">
			<div class="">
				<Circle :percent="100" :size=160 :stroke-width=3 :trail-width=3>
					<Icon type="person-stalker" size=100></Icon>
				</Circle>
				<p> 置顶数: 12</p>
				<p> 职位数: 12</p>
				<div class="m-t-20">
					<Button type="warning" class="">职位管理</Button>
				</div>
			</div>
			</Col>
			<Col span="8">
			<div class="">
				<Circle :percent="100" :size=160 :stroke-width=3 :trail-width=3>
					<Icon type="email" size=100></Icon>
				</Circle>
				<p> 短信数: 12</p>
				<p> 评测邀请: 12</p>
				<div class="m-t-20">
					<Button type="warning" class="">查看简历</Button>
				</div>
			</div>
			</Col>
			<Col span="8">
			<div class="">
				<Circle :percent="100" :size=160 :stroke-width=3 :trail-width=3>
					<Icon type="search" size=100></Icon>
				</Circle>
				<p> 暂存简历: 12</p>
				<p> 简历下载: 12</p>
				<div class="m-t-20">
					<Button type="warning" class="" @click.native="goToLink('/searchresume')">搜索简历</Button>
				</div>
			</div>
			</Col>
		</Row>
	</div>
</template>
<script>
	import FnMixins from '../assets/js/fn-mixins'

	export default {
		methods: {
			handleStart() {
				this.$Modal.info({
					title: 'Bravo',
					content: 'Now, enjoy the convenience of i22View.'
				});
			}
		},
		computed: {
			userInfo() {
				return JSON.parse(localStorage.getItem('userinfo'))
			},
		},
		created() {
			console.log(2222222222, this.userInfo)
		},
		mixins: [FnMixins],
	}
</script>
<style scoped lang="less">
	.index {
		width: 100%;
		height: 100%;
		top: 0;
		bottom: 0;
		left: 0;
		text-align: center;
		h1 {
			height: 150px;
			img {
				height: 100%;
			}
		}
		h2 {
			color: #666;
			margin-bottom: 200px;
			p {
				margin: 0 0 50px;
			}
		}
		.ivu-row-flex {
			height: 100%;
		}
	}

</style>
