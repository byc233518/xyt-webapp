<template>
	<div>
		<h1>暂存</h1>
		<!--<Card :bordered="false" class="m-b-15">-->
			<!--<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">-->
				<!--<Col span="8">-->
				<!--<Form-item prop="selfEvaluation" label="关键字">-->
					<!--<Input type="text" placeholder="请填写" v-model="formValidate.selfEvaluation"></Input>-->
				<!--</Form-item>-->
				<!--</Col>-->
				<!--<Col span="8">-->
				<!--<Form-item prop="location" label="居住地">-->
					<!--<Input type="text" placeholder="请填写" v-model="formValidate.member.addr"></Input>-->
				<!--</Form-item>-->
				<!--</Col>-->
				<!--<Col span="8">-->
				<!--<Form-item prop="function" label="职能">-->
					<!--<Input type="text" placeholder="请填写" v-model="formValidate.function"></Input>-->
				<!--</Form-item>-->
				<!--</Col>-->
				<!--<Col span="8">-->
				<!--<Form-item prop="vocation" label="行业">-->
					<!--<Input type="text" placeholder="请填写" v-model="formValidate.vocation"></Input>-->
				<!--</Form-item>-->
				<!--</Col>-->
				<!--<Col span="8">-->
				<!--<Form-item prop="workingLife" label="工作年限">-->
					<!--<Input type="text" placeholder="请填写" v-model="formValidate.workingLife"></Input>-->
				<!--</Form-item>-->
				<!--</Col>-->
				<!--<Col span="8">-->
				<!--<Form-item prop="usex" label="性别">-->
					<!--<Select v-model="formValidate.member.usex">-->
						<!--<Option :value="'男'" :key="'男'">男</Option>-->
						<!--<Option :value="'女'" :key="'女'">女</Option>-->
					<!--</Select>-->
				<!--</Form-item>-->
				<!--</Col>-->
				<!--<Col span="8">-->
				<!--<Form-item prop="expectJobLocation" label="期望工作地">-->
					<!--<Input type="text" placeholder="请填写" v-model="formValidate.expectJobLocation"></Input>-->
				<!--</Form-item>-->
				<!--</Col>-->

				<!--<Col span="8">-->
				<!--<Form-item prop="education" label="学历">-->
					<!--<Select multiple v-model="formValidate.education">-->
						<!--<Option value="不限" key="不限">不限</Option>-->
						<!--<Option value="高中" key="高中">高中</Option>-->
						<!--<Option value="本科" key="本科">本科</Option>-->
						<!--<Option value="硕士" key="硕士">硕士</Option>-->
					<!--</Select>-->
				<!--</Form-item>-->
				<!--</Col>-->
				<!--<Col span="8">-->
				<!--<Form-item prop="age" label="年龄">-->
					<!--<InputNumber :max="100" :min="1" v-model="formValidate.member.uage"></InputNumber>-->
				<!--</Form-item>-->
				<!--</Col>-->
			<!--</Form>-->
			<!--<div>-->
				<!--<Button @click.native="reset()">重置</Button>-->
				<!--<Button type="primary" @click.native="doSearch()">筛选</Button>-->
			<!--</div>-->
		<!--</Card>-->
		<div>
			<Table :columns="tableColumns" :data="tableData"></Table>
		</div>
		<div class="m-t-10">
			<Page :total="1000" class="r" @on-change="pageOnChange"></Page>
		</div>
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
				formValidate: {
					selfEvaluation: '',
					'function': '',
					vocation: '',
					workingLife: '',
					expectJobLocation: '',
					education: '',
					member: {
						addr: '',
						usex: '',
						uage: 60,
					},
				},
				ruleValidate: {
//					key_text: [
//						{required: true, message: 'The name cannot be empty', trigger: 'blur'}
//					],
				},
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
						key: 'rid',
					},
					{
						title: '姓名',
						key: 'uname',
					},
					{
						title: '年龄',
						key: 'uage',
					},
					{
						title: '工作年限',
						key: 'workNum',
					},
					{
						title: '性别',
						key: 'memberusex',
					},
					{
						title: '操作',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.$router.push(`resumedetail/${params.row.rid}`)
										}
									}
								}, '查看'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											this.remove(params.row.temporaryId)
										}
									}
								}, '删除')
							]);
						}
					},
				],
				tableData: []
			}
		},
		computed: {
			userInfo() {
				return JSON.parse(localStorage.getItem('userinfo'))
			},
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
						this.tableData = res.data
					}
				})
			},
			reset() {
				this.$refs['formValidate'].resetFields();
			},
			pageOnChange(num) {
				this.queryTempResume({}, num).then((res) => {
					if (res.data && res.data.length) {
						this.tableData = res.data
					}
				})
			},
			remove(id) {
				const uid = this.userInfo.uid
				this.removeResumeFromTemp(id).then((res) => {
					if (res.__statusCode === '1') {
						this.$Message.success('删除成功!')
						this.queryTempResume(uid).then((res) => {
							if (res.data && res.data.length) {
								this.tableData = res.data
							}
						})
					}
				})
			},
		},
		created() {
			const uid = this.userInfo.uid
			this.queryTempResume(uid).then((res) => {
				if (res.data && res.data.length) {
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
</style>
