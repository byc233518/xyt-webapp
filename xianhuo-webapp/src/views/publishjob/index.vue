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
                   title="所在城市"
                   :raw-value=true
                   v-model="province_city"
                   @on-hide="addressOnChange"
                   placeholder="请选择"
                   :list="addressData"
        ></x-address>
      </group>
      <group>
        <popup-picker :data='industrys'
                      title="所属行业"
                      v-model='job.industry'
                      @on-change='industryOnChange'
        ></popup-picker>
      </group>
      <group>
        <x-textarea title="介绍" v-model="job.desc" :rows=10></x-textarea>
      </group>
      <group>
        <x-textarea title="职位要求" v-model="job.requirement" :rows=10></x-textarea>
      </group>
      <!--<cell title="图片">-->
        <input type="file"
               id="uploads"
               style="display: none"
               accept="image/*"
               @change="uploadImg($event)">
        <x-button :mini=true @click.native="showUpload">更改图片</x-button>
        <img class="m-l-20" :src="job.thumbnail" alt="缩略图" width="60">
      <!--</cell>-->
      <!--<div class="cropper-wrapper" v-if="cropperOption.img">-->
        <!--<vueCropper-->
          <!--ref="cropper"-->
          <!--:img="cropperOption.img"-->
          <!--:outputSize="cropperOption.size"-->
          <!--:outputType="cropperOption.outputType"-->
          <!--:canScale="cropperOption.canScale"-->
          <!--:autoCrop="cropperOption.autoCrop"-->
          <!--:autoCropWidth="cropperOption.autoCropWidth"-->
          <!--:autoCropHeight="cropperOption.autoCropHeight"-->
          <!--:fixed="cropperOption.fixed"-->
          <!--:fixedNumber="cropperOption.fixedNumber"-->
          <!--:fixedBox="cropperOption.fixedBox"-->
        <!--&gt;</vueCropper>-->
        <!--<x-button :mini=true-->
                  <!--style="position: fixed; top: 10px; right: 10px; z-index: 11;"-->
                  <!--@click.native=saveImg-->
        <!--&gt; 确定 </x-button>-->
      <!--</div>-->
      <x-button @click.native="submit" class="m-t-20">确认发布</x-button>
    </div>
  </div>
</template>

<script>
  /*eslint-disable*/
  import AV from 'leancloud-storage';

  AV.init({
    appId: 'OS0xhC73XUcUgL4aFtX40SbV-gzGzoHsz',
    appKey: 'HtkKwqncPMW8hHaNGCkfFs3U',
  })

  import urlencode from 'urlencode'
  import vueCropper from 'vue-cropper'
  import { Value2nameFilter as value2name } from 'vux'
  import ChinaAddressV4Data from '../../assets/js/china_address_v4.json'
  import ApiMixins from '../../assets/js/apiMixin'
  import FnMixins from '../../assets/js/fnMixin'

  export default {
    components: {
      vueCropper,
    },
    data() {
      return {
        job: {
          num: 1,
          lat: null,
          lng: null,
          tel: '15902019220',
          city: '深圳',
          desc: '介绍介绍介绍介绍介绍介绍介绍介绍',
          title: '测试标题',
          thumbnail: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529041343438&di=abbd0acd7fe978f50c27a77fbb71d7de&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fd1a20cf431adcbef69030198a6af2edda3cc9f7c.jpg',
          salary: '1000元/天',
          address: '南山区高新南1道',
          province: '广东',
          requirement: '要求要求要求要求要求要求要求',
          company_name: '深圳市 XX 有限公司',
          company_id: 0,
          industry: ['服务行业'],
          openid: '',
        },
        cropperOption: {
          img: '',
          outputType: 'jpeg',
          size: 1,
          canScale: false,
          autoCrop: true,
          autoCropWidth: 60,
          autoCropHeight: 60,
          fixed: true,
          fixedNumber: [1, 1],
          fixedBox: true,
        },
        industrys: [['服务行业', '建筑行业', '农林牧业', '其他行业']],
        province_city: [],
        addressData: ChinaAddressV4Data,
      }
    },
    computed: {
      authCode() {
        return this.urlParamToObj().code || null
      },
    },
    methods: {
      submit() {
        if ((this.job.num === '')
          || (this.job.title === '')
          || (this.job.desc === '')
          || (this.job.company_name === '')
          || (this.job.tel === '')
          || (this.job.salary === '')) {
          this.$vux.toast.show({
            text: '请完善信息',
            type: 'warn',
          })
          return
        }
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
        this.job.city = this.getName(this.province_city).split(' ')[1] === '市辖区'
          ? this.getName(this.province_city).split(' ')[0]
          : this.getName(this.province_city).split(' ')[1]
      },
      getName(value) {
        return value2name(value, ChinaAddressV4Data)
      },
      industryOnChange() {
      },
      uploadImg(e) {
        //上传图片
        // this.option.img
        const file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        if (file.size / 1000 > 1024) {
          this.$vux.toast.show({
            text: '图片大小不能超过1MB',
            type: 'warn',
          })
          return
        }
        new AV.File('filename', file).save().then((res) => {
          this.job.thumbnail = res.attributes.url
        })
//        const reader = new FileReader()
//        reader.onload = (e) => {
//          let data
//          if (typeof e.target.result === 'object') {
//            // 把Array Buffer转化为blob 如果是base64不需要
//            data = window.URL.createObjectURL(new Blob([e.target.result]))
//          } else {
//            data = e.target.result
//          }
//          this.cropperOption.img = data
//        }
//         转化为base64
//        reader.readAsDataURL(file)
//        转化为blob
//        reader.readAsArrayBuffer(file)
      },
      showUpload() {
        console.log(1)
        document.querySelector('#uploads').click()
      },
//      saveImg() {
//        this.$refs.cropper.getCropBlob((data) => {
//          console.log(data)
//          this.job.thumbnail = data
//
//          new AV.File('filename', {
//            blob: {
//              uri: data,
//            },
//          }).save().then((res) => {
//            console.log(res)
//          })
//        })
//      },
    },
    created() {
//      const self = this
//      this.$vlf.getItem('wxUserInfo').then((res) => {
//        if (res) {
//          console.log('vlf', res)
//          this.userInfo = res
//        } else {
//          // eslint-disable-next-line
//          if (self.authCode) {
//            console.log('authcode', self.authCode)
//            self.getWxUserDetail({
//              code: this.authCode,
//            }).then((info) => {
//              self.userInfo = info[0]
//              self.job.openid = info[0].openid
//              self.$vlf.setItem('wxUserInfo', info[0])
//            })
//          } else {
//            location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx185463cc92b5ca47&redirect_uri=${urlencode(location.href)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
//          }
//        }
//      }).catch((err) => {
//        console.log(err)
//      })
    },
    mixins: [ApiMixins, FnMixins],
  }
</script>

<style lang="less" scoped>
  .cropper-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
  }
</style>
