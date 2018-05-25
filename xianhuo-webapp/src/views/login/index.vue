<template>
  <div>
    <div>
      <div class="register" v-if="loginPage">
        <p class="tc m-t-100"> 完善个人信息 </p>
        <div class="p-20">
          <group title="">
            <x-input required title="手机号码"
                     v-model="tel"
                     :max="11" is-type="china-mobile"></x-input>
            <x-input required type="number" title="年龄" v-model="age" :max="2"></x-input>
            <x-input required title="技能" v-model="skill" placeholder="多个请用空格隔开"></x-input>
          </group>

          <x-button @click.native="submit" class="m-t-50">提交</x-button>
        </div>
      </div>
      <div class="login" v-else>
        <p class="tc"> 登录页面</p>
        <div class="p-20">
          <group title="">
            <x-input required title="手机号码"
                     v-model="tel"
                     :max="11" is-type="china-mobile"></x-input>
            <x-input required title="密码"
                     v-model="password"></x-input>
          </group>
          <div class="tr">
            <a href="javascript:;" @click="forgetPassword">忘记密码 </a>
            <span class="display-inline-block m-l-10 m-r-10">|</span>
            <a href="javascript:;" @click="showRegister"> 注册</a>
          </div>
          <x-button @click.native="doLogin" class="m-t-20">登录</x-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ApiMixins from '../../assets/js/apiMixin'
  import FnMixins from '../../assets/js/fnMixin'

  /* eslint-disable */
  export default {
    components: {},
    data: () => {
      return {
        tel: '',
        loginPage: true,
        skill: '',
        age: '',
      }
    },
    methods: {
      infoWindowOpen () {
        this.infoWindowShow = true
      },
      doLogin() {
      },
      doRegister() {
      },
      showRegister() {
        this.loginPage = false
      },
      forgetPassword() {
        this.$vux.alert.show({
          content: '发送短信 <br/>"mm" 到 159 0201 9220',
        })
      },
      submit() {
        if (this.tel === '' || this.age === '' || this.skill === '') {
          this.$vux.toast.show({type:'warn', text:'请完善信息'})
          return
        }
        const that = this
        this.$vux.confirm.show({
          content: '确认信息真实无误并提交?',
          onCancel() {
            console.log(this) // 非当前 vm
            console.log(that) // 当前 vm
          },
          onConfirm() {
            that.saveUserInfo({
              tel: this.tel,
              age: this.age,
              skill: this.skill,
            }).then((res) => {
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
      }
    },
    created() {
//      this.getWxUserInfo().then((res) => {
//        this.$vux.alert.show(JSON.stringify(res))
//      })
//      location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx185463cc92b5ca47&redirect_uri=${urlencode(location.href)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
    },
    mixins: [ApiMixins, FnMixins],
  }
</script>
<style>
  .map-wrap {
    height: 93vh;
    overflow: hidden;
  }

  .map {
    width: 100%;
    height: 100vh;
  }

  .btn-goto-detail {
    background: #eee;
    color: #666;
    border-radius: 3px;
  }
</style>
