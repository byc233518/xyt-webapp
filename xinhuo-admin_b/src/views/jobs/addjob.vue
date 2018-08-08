<template>
	<div class=" p-l-100 p-r-100">
		<Card :bordered="false" class="m-b-15">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
				<h4>职位基本信息</h4>
				<p>加 * 内容，在确认发布成功后，将无法修改</p>
				<Row class="m-t-20">
					<Col span="12">
					<Form-item prop="company" label="公司名称">
						<Input type="text" placeholder="" disabled v-model="formValidate.company"></Input>
					</Form-item>
					</Col>
					<Col span="12">
					<Form-item prop="jobName" label="职位名称">
						<Input type="text" placeholder="请填写" v-model="formValidate.jobName"></Input>
					</Form-item>
					</Col>
					<Col span="12">
					<Form-item prop="jobType" label="职位类型">
						<Select v-model="formValidate.jobType">
							<Option value="全职" key="全职">技术类</Option>
							<Option value="兼职" key="兼职">管理类</Option>
							<Option value="临时" key="临时">临时</Option>
						</Select>
					</Form-item>
					</Col>
					<Col span="12">
					<Form-item prop="city" label="工作城市">
						<Input type="text" placeholder="请填写" v-model="formValidate.city"></Input>
					</Form-item>
					</Col>
					<Col span="12">
					<Form-item prop="workLocation" label="工作地点">
						<Input type="text" placeholder="请填写" v-model="formValidate.workLocation"></Input>
					</Form-item>
					</Col>
					<Col span="12">
					<Form-item prop="hireNumber" label="招聘人数">
						<InputNumber :min="1" v-model="formValidate.hireNumber"></InputNumber>
					</Form-item>
					</Col>
				</Row>
				<h4>职位要求</h4>
				<p>我们将通过以下条件，为您精确推荐合适的牛人，请尽量详细填写</p>
				<Row class="m-t-20">
					<Col span="12">
					<Form-item prop="jobType" label="工作性质">
						<Select v-model="formValidate.jobType">
							<Option value="全职" key="全职">全职</Option>
							<Option value="兼职" key="兼职">兼职</Option>
							<Option value="临时" key="临时">临时</Option>
						</Select>
					</Form-item>
					</Col>
					<Col span="12">
					<Form-item prop="workTime" label="经验">
						<Select v-model="formValidate.workTime">
							<Option :value="'1年以内'" :key="'1年以内'">1年以内</Option>
							<Option :value="'2-3年'" :key="'2-3年'">2-3年</Option>
							<Option :value="'3-5年'" :key="'3-5年'">3-5年</Option>
							<Option :value="'5-10年'" :key="'5-10年'">5-10年</Option>
							<Option :value="'10年以上'" :key="'10年以上'">10年以上</Option>
						</Select>
					</Form-item>
					</Col>
					<Col span="12">
					<Form-item prop="degree" label="学历要求">
						<Select filterable v-model="formValidate.degree">
							<Option value="高中" key="高中">高中</Option>
							<Option value="本科" key="本科">本科</Option>
							<Option value="硕士" key="硕士">硕士</Option>
							<Option value="博士" key="博士">博士</Option>
						</Select>
					</Form-item>
					</Col>
					<Col span="12">
					<Form-item prop="salary" label="薪资范围">
						<Select filterable v-model="formValidate.salary">
							<Option value="10000" key="10000">10000</Option>
							<Option value="20000" key="20000">20000</Option>
							<Option value="30000" key="30000">30000</Option>
							<Option value="40000" key="40000">40000</Option>
						</Select>
					</Form-item>
					</Form-item>
					</Col>
					<Col span="12">
					<Form-item prop="skill" label="技能要求">
						<Select filterable v-model="formValidate.skill">
							<Option value="初级" key="初级">初级</Option>
							<Option value="中级" key="中级">中级</Option>
							<Option value="高级" key="高级">高级</Option>
							<Option value="技师" key="技师">技师</Option>
							<Option value="高级技师" key="高级技师">高级技师</Option>
						</Select>
					</Form-item>
					</Col>
				</Row>
				<Row>
					<Col span="24">
					<Form-item prop="jobDesc" label="职位描述">
						<Input v-model="formValidate.jobDesc" type="textarea" :autosize="{minRows: 2,maxRows: 15}" placeholder="请输入"></Input>
					</Form-item>
					</Col>
				</Row>
			</Form>
			<div>
				<Button @click.native="reset">重置</Button>
				<Button type="primary" @click.native="save">发布</Button>
			</div>
		</Card>
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
					company: '信宜通',
					jobName: '财务总监',
					jobType: '全职',
					city: '深圳',
					workLocation: '南山区高新南1道8号创维大厦',
					workTime: '10年以上',
					salary: '10000',
					jobDesc: '测试',
					expiryDate: '2018-07-10T01:12:03.726Z',
					degree: '硕士',
					skill: '高级',
					hireNumber: 1,
				},
				ruleValidate: {
					key_text: [
//						{required: true, message: 'The name cannot be empty', trigger: 'blur'}
					],
				},
			}
		},
		computed: {
			userInfo() {
				return JSON.parse(localStorage.getItem('userinfo'))
			},
		},
		methods: {
			save() {
				console.log(1, this.formValidate)
				const that = this
				let params = {}
				_.forEach(this.formValidate, (val, key) => {
					if (!_.isEmpty(val)) {
						params[key] = val
					}
				})
				console.log(2, params)
				this.addJob(this.formValidate).then((res) => {
					this.$Message.success('新增成功')
				})
			},
			reset() {
				this.$refs['formValidate'].resetFields();
			},
		},
		created() {
			const self = this
			this.getUserInfo(this.userInfo.uid).then((res) => {
				console.log(res.data)
				if (res.data[0].company) {
					this.formValidate.company = res.data[0].company
				} else {
					this.$Modal.confirm({
						title: '请先完善个人及公司信息',
						content: '<p>帮你跳转到完善信息页面?</p>',
						onOk: () => {
							self.$router.push('/perfectinfo')
						},
						onCancel: () => {
							self.$router.push('/')
						},
					})
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
