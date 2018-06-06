<template>
  <div>
    <group :title="''">
      <cell :title="userInfo.nickname" is-link :link="'/userinfo'">
        <img slot="icon" width="60" style="display:block;margin-right:5px;"
             :src="userInfo.headimgurl" />
      </cell>
    </group>
    <group>
      <cell :title="'关于我们'" is-link :link="'/aboutus'"></cell>
    </group>
    <group>
      <cell :title="'反馈'" is-link :link="'/feedback'"></cell>
    </group>
  </div>
</template>

<script>
  import urlencode from 'urlencode'
  import ApiMixins from '../../assets/js/apiMixin'
  import FnMixins from '../../assets/js/fnMixin'

  export default {
    components: {},
    data() {
      return {
        userInfo: {
          nickname: '',
          headimgurl: '',
        },
      }
    },
    computed: {
      authCode() {
        return this.urlParamToObj().code || null
      },
    },
    methods: {
    },
    created() {
      const self = this
      this.$vlf.getItem('wxUserInfo').then((res) => {
        if (res) {
          console.log('vlf', res)
          this.userInfo = res
        } else {
          // eslint-disable-next-line
          if (self.authCode) {
            console.log('authcode', self.authCode)
            self.getWxUserDetail({
              code: this.authCode,
            }).then((info) => {
              self.userInfo = info[0]
              self.$vlf.setItem('wxUserInfo', info[0])
            })
          } else {
            location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx185463cc92b5ca47&redirect_uri=${urlencode(location.href)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    mixins: [ApiMixins, FnMixins],
  }
</script>

<style lang="less" scoped>

</style>
