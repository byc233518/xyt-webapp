<template>
  <div class="service-center">
    <h3 class="tc fz-50 m-t-100 title">我帮您</h3>
    <p class="tc">请您提供以下信息给到我们</p>
    <div class="p-20">
      <group title="">
        <x-input title="姓 名" v-model="name"></x-input>
        <x-input title="电 话" v-model="tel" :max="11" is-type="china-mobile"></x-input>
      </group>
      <group>
        <x-textarea title="意向说明" v-model="request" :rows=10></x-textarea>
      </group>
      <x-button @click.native="submit" class="m-t-20">提交</x-button>
    </div>
  </div>
</template>

<script>
  import ApiMixins from '../../assets/js/apiMixin'
  import FnMixins from '../../assets/js/fnMixin'

  export default {
    components: {},
    data: () => {
      return {
        tel: '',
        name: '',
        request: '',
        openid: '',
      }
    },
    methods: {
      submit() {
        const that = this
        if (that.name === '' || that.tel === '' || that.request === '') {
          const that = this
          this.$vux.toast.show({
            type: 'warn',
            text: '请填写完整信息!',
          })
          return
        }
        this.$vux.confirm.show({
          content: '确定提交?',
          onCancel() {
          },
          onConfirm() {
            that.saveJobRequest({
              name: that.name,
              tel: that.tel,
              request: that.request,
            }).then((res) => {
              console.log(res)
              that.$vux.loading.hide()
              that.$vux.alert.show({
                content: '提交成功!',
                onShow() {
                  setTimeout(() => {
                    that.$vux.alert.hide()
                  }, 3000)
                },
                onHide() {
                  /* eslint-disable */
                  history.back()
                },
              })
            })
          },
        })
      },
    },
    created() {
      this.$vlf.getItem('wxUserInfo').then((res) => {
        this.openid = res.openid
      })
    },
    mixins: [ApiMixins, FnMixins],
  }
</script>
<style>
  .title {
    color: orange;
  }
</style>
