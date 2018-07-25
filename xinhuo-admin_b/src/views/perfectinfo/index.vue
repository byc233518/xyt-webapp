<template>
	<div>
		完善信息
		<Card :bordered="false" class="m-b-15">
			<Steps :current="current">
				<Step title="基本信息"></Step>
				<Step title="公司信息"></Step>
				<Step title="公司品牌"></Step>
				<Step title="所属行业"></Step>
				<Step title="绑定邮箱"></Step>
			</Steps>
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" class="m-t-50">
				<div v-if="current === 0">

					<Card :bordered="false" class="m-b-15 m-t-20">
						基本信息
						<Form-item prop="uname" label="姓 名">
							<Input type="text" placeholder="请填写" v-model="formValidate.uname"></Input>
						</Form-item>
						<Form-item prop="positionName" label="我的职位">
							<Input type="text" placeholder="请填写" v-model="formValidate.positionName"></Input>
						</Form-item>
						<Form-item prop="usex" label="性别">
							<Select v-model="formValidate.usex">
								<Option :value="'男'" :key="1">男</Option>
								<Option :value="'女'" :key="0">女</Option>
							</Select>
						</Form-item>
						<Form-item prop="maritalStatus" label="婚姻状况">
							<Select v-model="formValidate.maritalStatus">
								<Option :value="'否'" :key="1">未婚</Option>
								<Option :value="'是'" :key="0">已婚</Option>
							</Select>
						</Form-item>
						<Form-item prop="idCard" label="身份证号">
							<Input type="text" placeholder="请填写" v-model="formValidate.idCard"></Input>
						</Form-item>
						<Form-item prop="birthday" label="出生日期">
							<DatePicker :value="$moment(formValidate.birthday).format('YYYY-MM-DD')"
													format="yyyy/MM/dd"
													type="date"
													placement="bottom-end"
													placeholder="选择日期"
													@on-change="dateOnChange"
													:format="'yyyy-MM-dd'"
													style="width: 200px"></DatePicker>
						</Form-item>
						<Form-item prop="height" label="身高">
							<Input type="text" placeholder="请填写" v-model="formValidate.height"></Input>
						</Form-item>

					</Card>
					<Button type="primary" @click="next(1)">下一步</Button>
				</div>
				<div v-if="current === 1">
					填写你所在公司信息<br/>
					为保证录入信息真实有效，请输入营业执照名称或劳动合同上的雇主名称
					<Form-item prop="company" label="我的公司" class="m-t-20">
						<Input type="text" placeholder="请填写" v-model="formValidate.company"></Input>
					</Form-item>
					<Form-item prop="companyType" label="公司类型">
						<Input type="text" placeholder="请填写" v-model="formValidate.companyType"></Input>
					</Form-item>
					<Button type="primary" @click="next(0)">上一步</Button>
					<Button type="primary" @click="next(2)">下一步</Button>
				</div>
				<div v-if="current === 2">
					创建公司品牌<br/>
					司简称可以是品牌名，知名产品名或名称关键字，创建后不可修改
					<Form-item prop="company" label="公司简称" class="m-t-20">
						<Input type="text" placeholder="请填写" v-model="formValidate.company"></Input>
					</Form-item>
					<Form-item prop="businessLicense" label="营业执照编号">
						<Input type="text" placeholder="请填写" v-model="formValidate.businessLicense"></Input>
					</Form-item>
					<Form-item prop="companyProperty" label="公司性质">
						<Input type="text" placeholder="请填写" v-model="formValidate.companyProperty"></Input>
					</Form-item>
					<Form-item prop="scale" label="人员规模">
						<Input type="text" placeholder="请填写" v-model="formValidate.scale"></Input>
					</Form-item>
					<Button type="primary" @click="next(1)">上一步</Button>
					<Button type="primary" @click="next(3)">下一步</Button>
				</div>
				<div v-if="current === 3">
					所属行业
					<Form-item prop="companyProfile" label="所属行业" class="m-t-20">
						<Select v-model="formValidate.companyProfile" filterable>
							<Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</Form-item>
					<Button type="primary" @click="next(2)">上一步</Button>
					<Button type="primary" @click="next(4)">下一步</Button>
				</div>
				<div v-if="current === 4">
					设置接收简历的邮箱<br/>
					该邮箱用于接收附件简历，请使用你常用的工作邮箱，你可以在『个人资料』 中修改
					<Form-item prop="email" label="工作邮箱" class="m-t-20">
						<Input type="text" placeholder="请填写" v-model="formValidate.email"></Input>
					</Form-item>
					<Button type="primary" @click="next(3)">上一步</Button>
					<Button type="primary" @click="save">保存</Button>
				</div>
			</Form>
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
					addr: "深圳市",
					birthday: "1990-04-22",
					businessLicense: "111CCCC444",
					company: "信活科技有限公司",
					companyProfile: "",
					companyProperty: "020",
					companyType: "民营",
					email: "zhangsan@163.com",
					height: 170,
					idCard: "42122221990042234455",
					maritalStatus: "否",
					password: "123456",
					positionName: "HR",
					scale: "0-20人",
					uid: 0,
					uimageId: 1,
					uname: "张三",
					usex: "男",
					utel: "13900001111",
					utype: 1,
					updateBy: this.userInfo && this.userInfo.uid,
				},
				ruleValidate: {},
				current: 0,
				list: [
					{label: '包装、印刷', value: '包装、印刷'},
					{label: '安全、防护', value: '安全、防护'},
					{label: '广电传媒', value: '广电传媒'},
					{label: '办公、文教', value: '办公、文教'},
					{label: '纺织、皮革', value: '纺织、皮革'},
					{label: '电脑与软件', value: '电脑与软件'},
					{label: '化工', value: '化工'},
					{label: '电工电气', value: '电工电气'},
					{label: '服装服饰', value: '服装服饰'},
					{label: '电子元器件', value: '电子元器件'},
					{label: '环保', value: '环保'},
					{label: '家用电器', value: '家用电器'},
					{label: '机械及行业设备', value: '机械及行业设备'},
					{label: '家居用品', value: '家居用品'},
					{label: '交通运输设备', value: '交通运输设备'},
					{label: '能源', value: '能源'},
					{label: '汽摩及配件', value: '汽摩及配件'},
					{label: '橡胶塑料', value: '橡胶塑料'},
					{label: '农业', value: '农业'},
					{label: '建筑、建材', value: '建筑、建材'},
					{label: '商务服务', value: '商务服务'},
					{label: '食品、饮料', value: '食品、饮料'},
					{label: '灯饰照明', value: '灯饰照明'},
					{label: '玩具', value: '玩具'},
					{label: '五金、工具', value: '五金、工具'},
					{label: '冶金矿产', value: '冶金矿产'},
					{label: '仪器仪表', value: '仪器仪表'},
					{label: '医药、保养', value: '医药、保养'},
					{label: '运动休闲器材', value: '运动休闲器材'},
					{label: '通讯产品', value: '通讯产品'},
					{label: '教育行业', value: '教育行业'},
					{label: '纸业', value: '纸业'},
					{label: '科研院所', value: '科研院所'},
					{label: '文化艺术', value: '文化艺术'},
					{label: '医疗卫生', value: '医疗卫生'},
					{label: '政府机构', value: '政府机构'},
					{label: '电力水利', value: '电力水利'},
					{label: '供水燃气', value: '供水燃气'},
					{label: '邮政电信', value: '邮政电信'},
					{label: '房地产', value: '房地产'},
					{label: '酒店旅游', value: '酒店旅游'},
					{label: '礼品、工艺品、饰品', value: '礼品、工艺品、饰品'},
				],
			}
		},
		computed: {
			userInfo() {
				return JSON.parse(localStorage.getItem('userinfo'))
			},
		},
		methods: {
			dateOnChange(v) {
				this.formValidate.birthday = v
			},
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
			next(index) {
				this.current = index
			},
			save() {
				this.updateMember(this.formValidate).then((res) => {
					debugger
					if(res.__statusCode === '1') {
						this.$Message.success('修改成功')
						this.next(0)
					} else {
						this.$Message.error(`${res.__errorMessage}`)
					}
				})
			},
		},
		created() {
			this.getJobs({}).then((res) => {
				this.tableData = res.data
			})
			this.getUserInfo(this.userInfo.uid).then((res) => {
				this.formValidate = Object.assign({}, this.formValidate, res.data[0])
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
