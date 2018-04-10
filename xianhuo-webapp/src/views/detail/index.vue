<template>
  <div>
    <div class="content p-20">
      <h2>{{jobData.title}}</h2>
      <div class="salary">{{jobData.salary}} | 月结</div>
      <div class="m-t-10">更新时间: {{jobData.date}}</div>
      <div class="m-t-10">城市: {{jobData.city}}</div>
      <div class="m-t-10">工作地点: {{jobData.address}}</div>
      <div class="m-t-10">联系电话: <a :href="jobData.tel"></a>{{jobData.tel}}</div>
      <Divider>详细信息</Divider>
      <div class="fz-35 border-bottom m-t-20">职位描述</div>
      <p class="m-t-20">{{jobData.desc}}</p>
      <div class="fz-35 border-bottom m-t-20">公司信息</div>
      <p class="m-t-20">{{companyData.name}}</p>
      <p class="m-t-20">公司规模: {{companyData.scale}}</p>
      <p class="m-t-20">公司性质: {{companyData.nature}}</p>
      <p class="m-t-20">是否认证: {{companyData.is_auth ? '已认证' : '未认证'}}</p>
      <p class="m-t-20">所属行业: {{companyData.industry}}</p>
      <p class="m-t-20">公司介绍: </p>
      <p class="m-t-20">{{companyData.desc}}</p>
    </div>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vux'
  import ApiMixins from '../../assets/js/apiMixin'

  export default {
    name: 'App',
    components: {
      Tabbar,
      TabbarItem,
    },
    data: () => {
      return {
        jobData: {
          num: 0,
          tel: '',
          city: '',
          desc: '',
          date: '',
          title: '',
          salary: '',
          address: '',
          province: '',
          requirement: '',
        },
        companyData: {
          desc: '',
        },
      }
    },
    created() {
      console.log(this.$route.params.id)
      this.getDetailById(this.$route.params.id).then((res) => {
        this.$vux.loading.hide()
        if (res) {
          this.jobData = res

          this.getCompanyByName(res.company_name).then((companyRes) => {
            this.$vux.loading.hide()
            this.companyData = companyRes
          })
        }
      })
    },
    mixins: [ApiMixins],
  }
</script>

<style lang="scss" scoped>
  .salary {
    color: #ee5f34;
  }
  .border-bottom {
    border-bottom: 1px solid #eee;
  }
</style>
