<template>
  <div>
    <div class="p-20">
      <table border="1" cellpadding="0" cellspacing="0" width="100%">
        <tr v-for="(item, key) in list" :key="key">
          <td>{{item.title}}</td>
          <td>{{item.city}}</td>
          <td>{{item.date}}</td>
          <td>
            <button @click="del(item._id)">删除</button>
          </td>
        </tr>
      </table>
    </div>
    <h1>新增工作</h1>
    <hr>
    <form>
      <x-input title="标题" v-model="jobInfo.title"></x-input>
      <x-input title="数量" v-model="jobInfo.num"></x-input>
      <x-input title="省份" v-model="jobInfo.province"></x-input>
      <x-input title="城市" v-model="jobInfo.city"></x-input>
      <x-input title="地址" v-model="jobInfo.address"></x-input>
      <!--<x-input title="公司名" v-model="jobInfo.company_name"></x-input>-->
      <selector v-if="companys && companys.length"
                ref="companyName"
                title="公司"
                :options="companys"
                v-model="jobInfo.company_name">
      </selector>
      <x-input title="薪酬" v-model="jobInfo.salary"></x-input>
      <x-input title="日期" v-model="jobInfo.date"></x-input>
      <x-input title="电话" v-model="jobInfo.tel"></x-input>
      <x-input title="简介" v-model="jobInfo.desc"></x-input>
      <x-input title="要求" v-model="jobInfo.requirement"></x-input>
      <div class="p-l-100 p-r-100">
        <x-button @click.native="addNewJob" type="primary" >提交</x-button>
      </div>
    </form>

    <h1 class="m-t-100">新增公司</h1>
    <hr>
    <form class="m-b-200">
      <x-input title="公司" v-model="companyInfo.name"></x-input>
      <x-input title="规模" v-model="companyInfo.scale"></x-input>
      <x-input title="公司性质" v-model="companyInfo.nature"></x-input>
      <x-input title="是否认证" v-model="companyInfo.is_auth"></x-input>
      <x-input title="行业" v-model="companyInfo.industry"></x-input>
      <x-input title="简介" v-model="companyInfo.desc"></x-input>
      <div class="p-l-100 p-r-100">
        <x-button @click.native="addNewCompany">提交</x-button>
      </div>
    </form>
  </div>
</template>

<script>
  import ApiMixins from '../../assets/js/apiMixin'
  import FnMixins from '../../assets/js/fnMixin'

  export default {
    name: 'App',
    components: {},
    data: () => {
      return {
        originList: [],
        list: [],
        textKey: '',
        companys: [],
        jobInfo: {
          title: '2222222',
          num: '111',
          province: '广东省',
          city: '深圳市',
          address: '南山区高新南9道8号',
          company_name: '百度',
          salary: '222',
          date: '2018-2-2',
          tel: '111111',
          desc: '222222',
          requirement: '555555555',
        },
        companyInfo: {
          name: '高大上', // 公司
          scale: '10000人以上', // 规模
          nature: '民营', // 公司性质
          is_auth: 'true', // 是否认证
          industry: '服务行业', // 行业
          desc: '深圳市高大上科技有限公司位于深圳市前海深港合作区前湾一路1号A栋 201室（入驻深圳市前海商务秘书有限公司），主营 等。公司秉承"为顾客服务，勇攀高峰"的经营理念，坚持"诚实守信"的原则为广大客户提供优质的服务。如果您对我公司的产品服务有兴趣，请在线留言或者来电咨询！ ', // 简介
        },
      }
    },
    methods: {
      addNewJob() {
        this.address2location(this.jobInfo.city, this.jobInfo.address).then((res) => {
          console.log('res', res)
          if (res.result && res.result.location) {
            const params = _.assign(this.jobInfo, {
              lat: res.result.location.lat,
              lng: res.result.location.lng,
            })
            this.saveNewJob(params).then(() => {
              this.$vux.loading.hide()
              console.log('保存成功')
              this.getData()
            })
          }
        })
      },
      addNewCompany() {
        this.saveNewCompany(this.companyInfo).then(() => {
          this.$vux.loading.hide()
          console.log('保存成功')
          this.getData()
        })
      },
      del(id) {
        this.delJob(id).then((res) => {
          this.$vux.loading.hide()
          console.log(res)
          this.getData()
        })
      },
      getData() {
        this.getList().then((res) => {
          this.$vux.loading.hide()
          if (res && res.length) {
            this.list = res
          }
        })
        this.getCompanys().then((res) => {
          this.$vux.loading.hide()
          const arr = []
          _.forEach(res, (item) => {
            arr.push(item.name)
          })
          this.companys = arr
        })
      },
    },
    created() {
      this.getData()
    },
    mixins: [ApiMixins, FnMixins],
  }
</script>

<style scoped lang="scss">
  .container {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .search-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #EFEFF4;
    z-index: 501;

    input {
      width: 100%;
      height: .5rem;
    }
  }

  li {
    margin-bottom: .2rem;
    padding: .1rem .2rem;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    box-shadow:  0 5px 10px #ececec;
  }
</style>
