<template>
	<div>
		<Card :bordered="false" class="m-b-15">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
				<Col span="8">
				<Form-item prop="jobName" label="职位名称">
					<Input type="text" placeholder="请填写" v-model="formValidate.jobName"></Input>
				</Form-item>
				</Col>
				<Col span="8">
				<Form-item prop="workLocation" label="工作地">
					<Input type="text" placeholder="请填写" v-model="formValidate.workLocation"></Input>
				</Form-item>
				</Col>
				<Col span="8">
				<Form-item prop="updateDate" label="发布时间">
					<DatePicker :value="formValidate.updateDate"
											format="yyyy/MM/dd"
											type="daterange"
											placement="bottom-end"
											placeholder="选择开始结束时间"
											style="width: 200px"></DatePicker>
				</Form-item>
				</Col>
			</Form>
			<div>
				<Button @click.native="reset">重置</Button>
				<Button type="primary" @click.native="doSearch">筛选</Button>
			</div>
		</Card>
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
					key_text: '',
					degree: '',
					effectState: '',
					hireNumber: '',
					jobDesc: '',
					jobName: '',
					salary: '',
					workLocation: '',
					workTime: '',
					updateDate: ''
				},
				ruleValidate: {
					key_text: [
//						{required: true, message: 'The name cannot be empty', trigger: 'blur'}
					],
				},
				tableColumns: [
//					{
//						type: 'selection',
//						width: 60,
//						align: 'center',
//					},
//					{
//						type: 'expand',
//						width: 50,
//						align: 'center',
//						render(h, params) {
//							return h(expandRow, {
//								props: {
//									row: params.row
//								}
//							})
//						}
//					},
					{
						title: ' ID',
						key: 'jobId',
					},
					{
						title: '工作名称',
						key: 'jobName',
					},
					{
						title: '薪资',
						key: 'salary',
					},
					{
						title: '工作地点',
						key: 'workLocation',
					},
					{
						title: '工龄',
						key: 'workTime',
					},
					{
						title: '学历',
						key: 'degree',
					},
					{
						title: '招聘人数',
						key: 'hireNumber'
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
					if(!_.isEmpty(val)) {
						params[key] = val
					}
				})
				console.log(params)
				this.getJobs(params).then((res) => {
					this.tableData = res.data
				})
			},
			reset() {
				this.$refs['formValidate'].resetFields();
			},
			remove(id) {
				this.$Modal.confirm({
					title: '确认',
					content: '<p>确认删除?</p>',
					onOk: () => {
						this.deleteJob(id).then((res) => {
							this.getJobs({}).then((res) => {
								this.tableData = res.data
								this.$Message.success('删除成功')
							})
						})
					},
					onCancel: () => {
					}
				});
			},
			pageOnChange(num) {
				this.getJobs({}, num).then((res) => {
					this.tableData = res.data
				})
			},
		},
		created() {
			this.getJobs({}).then((res) => {
				this.tableData = res.data
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
