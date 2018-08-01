<template>
	<div>
		<header>
			<div class="logo"></div>
		</header>

		<section>
			<Row>
				<Col span="8">张三</Col>
				<Col span="8">男</Col>
				<Col span="8">15902019220</Col>
			</Row>
		</section>

		<section>
			<div class="title">
				个人信息
			</div>
			<table width="100%">
				<tr>
					<td>
						<table>
							<tr>
								<td>邮箱:</td>
								<td>111@123.com</td>
							</tr>
							<tr>
								<td>籍贯:</td>
								<td>广东深圳</td>
							</tr>
							<tr>
								<td>住址:</td>
								<td>南山区高新南一道8号创维大厦</td>
							</tr>
						</table>
					</td>
					<td>
						<table>
							<tr>
								<td>身高:</td>
								<td>223cm</td>
							</tr>
							<tr>
								<td>婚姻状况:</td>
								<td>已婚</td>
							</tr>
							<tr>
								<td>政治面貌:</td>
								<td>团员</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<table width="100%">
				<tr>
					<td>

					</td>
					<td>

					</td>
				</tr>
			</table>
		</section>

		<section>
			<div class="title">
				工作经验
			</div>
			<ul>
				<li>
					<Row>
						<Col span="8">2016/6-至今</Col>
						<Col span="8">信活公司</Col>
						<Col span="8">总监</Col>
					</Row>
					<div class="p-l-10">
						<ol>
							<li>1. 功能测试/上线跟进; </li>
							<li>2. 功能测试/上线跟进; </li>
							<li>3. 功能测试/上线跟进; </li>
							<li>4. 功能测试/上线跟进; </li>
							<li>5. 功能测试/上线跟进; </li>
							<li>6. 功能测试/上线跟进; </li>
							<li>7. 功能测试/上线跟进; </li>
							<li>8. 功能测试/上线跟进; </li>
						</ol>
					</div>
				</li>
				<li class="m-t-20">
					<Row>
						<Col span="8">2016/6-至今</Col>
						<Col span="8">信活公司</Col>
						<Col span="8">总监</Col>
					</Row>
					<div class="p-l-10">
						<ol>
							<li>1. 功能测试/上线跟进;功能测试/上线跟进;功能测试/上线跟进;功能测试/上线跟进; </li>
							<li>2. 功能测试/上线跟进;功能测试/上线跟进;功能测试/上线跟进;功能测试/上线跟进; </li>
							<li>3. 功能测试/上线跟进;功能测试/上线跟进;功能测试/上线跟进;功能测试/上线跟进; </li>
							<li>4. 功能测试/上线跟进;功能测试/上线跟进;功能测试/上线跟进;功能测试/上线跟进; </li>
							<li>5. 功能测试/上线跟进;功能测试/上线跟进;功能测试/上线跟进;功能测试/上线跟进; </li>
							<li>6. 功能测试/上线跟进;功能测试/上线跟进;功能测试/上线跟进;功能测试/上线跟进; </li>
							<li>7. 功能测试/上线跟进;功能测试/上线跟进;功能测试/上线跟进;功能测试/上线跟进; </li>
							<li>8. 功能测试/上线跟进;功能测试/上线跟进;功能测试/上线跟进;功能测试/上线跟进; </li>
						</ol>
					</div>
				</li>
			</ul>
		</section>
	</div>
</template>
<script type="text/babel">
	import _ from 'lodash'
	import FnMixins from '../../assets/js/fn-mixins'
	import ApiMixin from '../../assets/js/apis-mixins'
	import expandRow from '../../components/common/table-expand.vue';

	export default {
		components: {expandRow},
		data() {
			return {
				tableColumns: [
					{
						type: 'expand',
						width: 50,
						align: 'center',
						render(h, params) {
							return h(expandRow, {
								props: {
									row: params.row
								}
							})
						}
					},
					{
						title: ' 简历ID',
						key: 'resumeId',
					},
					{
						title: '姓名',
						render: (h, row) => {
							return h('span', [row.row.memberuname])
						}
					},
					{
						title: '年龄',
						render: (h, row) => {
							return h('span', [(this.$moment(row.row.memberbirthday).toNow(true)).split(' ')[0]])
						}
					},
					{
						title: '工作年限',
						key: 'workExperience',
						render: (h, row) => {
							return h('span', [this.$moment(row.row.dutyDate).toNow(true)])
						}
					},
					{
						title: '性别',
						key: 'memberusex',
					},
					{
						title: '操作',
						render: (h, params) => {
							return h('div', [
//								h('Button', {
//									props: {
//										type: 'primary',
//										size: 'small'
//									},
//									style: {
//										marginRight: '5px'
//									},
//									on: {
//										click: () => {
//											this.show(params.row.jobId)
//										}
//									}
//								}, '查看'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											this.remove(params.row.jobId)
										}
									}
								}, '删除')
							]);
						}
					},
				],
				tableData: [
					{
						"resumeId": 1,
						"resumeName": "XXX个人简历",
						"income": 20000.0,
						"expectSalary": 30000.0,
						"expectJobLocation": "佛山",
						"function": "职能",
						"vocation": "互联网",
						"selfEvaluation": "开朗活泼",
						"dutyDate": 1530374400000,
						"jobType": "全职",
					},
				]
			}
		},
		methods: {
			doSearch() {
				const that = this
				let params = {}
				_.forEach(this.formValidate, (val, key) => {
					if (!_.isEmpty(val)) {
						params[key] = val
					}
				})
				console.log(params)
				this.getResume(params).then((res) => {
					if (res.data && res.data.length) {
						res.data.map((item, idx) => {
							Object.keys(item.member).forEach((childitem, childkey) => {
								item[`member${childitem}`] = item.member[`${childitem}`]
							})
						})
						this.tableData = res.data
					}
				})
			},
			reset() {
				this.$refs['formValidate'].resetFields();
			},
			pageOnChange(num) {
				this.getResume({}, num).then((res) => {
					if (res.data && res.data.length) {
						res.data.map((item, idx) => {
							Object.keys(item.member).forEach((childitem, childkey) => {
								item[`member${childitem}`] = item.member[`${childitem}`]
							})
						})
						this.tableData = res.data
					}
				})
			},
		},
		created() {
			this.getResume({}).then((res) => {
				if (res.data && res.data.length) {
					res.data.map((item, idx) => {
						Object.keys(item.member).forEach((childitem, childkey) => {
							item[`member${childitem}`] = item.member[`${childitem}`]
						})
					})
					this.tableData = res.data
				}
			})
		},
		mixins: [FnMixins, ApiMixin],
	}
</script>
<style>
	th {
		text-align: center !important;
	}

	.title {
		margin-top: 20px;
		margin-bottom: 20px;
		font-size: 24px;
	}

	ol>li {
		margin-top: 10px;
	}
</style>
