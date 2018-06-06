<template>
  <div>
    <p class="m-t-100 p-l-10">您有什么意见或建议想对我们说?</p>
    <group :title="''" class="p-l-10 p-r-10 m-t-30">
      <x-input title="您的主题:" v-model="subject"></x-input>
      <x-textarea
        title="反馈内容:"
        v-model="content"
        :rows=10
        :placeholder="'您的宝贵意见, 就是我们进步的源泉!'"
      ></x-textarea>
    </group>
    <x-button @click.native="submit" class="m-t-20">提交</x-button>
  </div>
</template>

<script>
  import ApiMixins from '../../assets/js/apiMixin'
  import FnMixins from '../../assets/js/fnMixin'

  export default {
    components: {},
    data() {
      return {
        subject: '',
        content: '',
        openid: '',
      }
    },
    computed: {},
    methods: {
      submit() {
        const that = this
        if (this.subject === '' || this.content === '') {
          that.$vux.toast.show({
            type: 'warn',
            text: '请完善信息',
          })
          return
        }
        this.$vux.confirm.show({
          content: '确定提交?',
          onCancel() {
          },
          onConfirm() {
            that.saveFeedBack({
              subject: that.subject,
              content: that.content,
              openid: that.openid,
            }).then((res) => {
              console.log(res)
              that.$vux.loading.hide()
              that.$vux.alert.show({
                content: '提交成功, 感谢您的宝贵意见!',
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

<style lang="less" scoped>

</style>
