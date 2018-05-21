<template>
  <div>
    <div>
      <h3 class="tc fz-50 m-t-50">信活邀请您发布职位<br/>免费招人才</h3>
    </div>
    <div class="p-20">
      <group title="">
        <x-input required title="工作名称" v-model="job.title"></x-input>
        <x-input required title="公司/个体名称" v-model="job.company_name"></x-input>
        <x-input required title="电 话"
                 v-model="job.tel" :max="11" is-type="china-mobile"></x-input>
        <x-input required title="工作地点" v-model="job.address"></x-input>
        <x-input required title="招聘人数" v-model="job.num"></x-input>
        <x-input required title="薪  资" v-model="job.salary"></x-input>
      </group>
      <group>
        <x-address hide-district
                   title="所属城市"
                   :raw-value=true
                   v-model="province_city"
                   @on-hide="addressOnChange"
                   placeholder="请选择"
                   :list="addressData"
        ></x-address>
      </group>
      <group>
        <x-textarea title="介绍" v-model="job.desc" :rows=10></x-textarea>
      </group>
      <group>
        <x-textarea title="职位要求" v-model="job.requirement" :rows=10></x-textarea>
      </group>
      <x-button @click.native="submit" class="m-t-20">确认发布</x-button>
    </div>
  </div>
</template>

<script>
  import { ChinaAddressV4Data, Value2nameFilter as value2name } from 'vux'
  import ApiMixins from '../../assets/js/apiMixin'

  export default {
    components: {},
    data() {
      return {
        job: {
          num: 1,
          lat: null,
          lng: null,
          tel: '',
          city: '',
          desc: '',
          date: '',
          title: '',
          thumbnail: 'https://image0.lietou-static.com/middle_/598280c57032c08e132d954c04a.jpg',
          salary: '',
          address: '',
          province: '',
          requirement: '',
          company_name: '',
          company_id: 0,
        },
        province_city: [],
        addressData: ChinaAddressV4Data,
      }
    },
    methods: {
      submit() {
        const that = this
        this.$vux.confirm.show({
          content: '确认信息真实无误并发布?',
          onCancel() {
            console.log(this) // 非当前 vm
            console.log(that) // 当前 vm
          },
          onConfirm() {
            that.saveNewJob(that.job).then((res) => {
              console.log(res)
              that.$vux.loading.hide()
              that.$vux.alert.show({
                content: '发布成功, 3秒后自动跳转!',
                onShow() {
                  setTimeout(() => {
                    that.$vux.alert.hide()
                  }, 3000)
                },
                onHide() {
                  /* eslint-disable */
                  that.$router.push(`/detail/${ res._id }`)
                },
              })
            })
          },
        })
      },
      addressOnChange() {
        this.job.province = this.getName(this.province_city).split(' ')[0]
        this.job.city = this.getName(this.province_city).split(' ')[1]
      },
      getName(value) {
        return value2name(value, ChinaAddressV4Data)
      },
    },
    created() {
      if (wx) {
        wx.ready(() => {
//                wx.invoke('getLocation', 'openLocation', {}, function(res) {
//                    //alert(res.err_msg + "唯一");
//                });
          wx.getLocation({
            success: () => {
//                                console.log(res)
//            that.pointY = res.latitude; // 纬度，浮点数，范围为90 ~ -90
//            that.pointX = res.longitude; // 经度，浮点数，范围为180 ~ -180。
//
//            that.point = new BMap.Point(that.pointX, that.pointY);
//            that.marker = new BMap.Marker(that.point); // 创建点
            },
            cancel: () => {
            },
          });
        })
      }
    },
    mixins: [ApiMixins],
  }
</script>

<style lang="less" scoped>

</style>
