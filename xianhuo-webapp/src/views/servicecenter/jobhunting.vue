<template>
  <div class="service-center">
    <h3 class="tc fz-50 m-t-100 title">我帮您</h3>
    <p class="tc">请您提供以下信息给到我们</p>
    <div class="p-20">
      <group title="">
        <x-input title="姓 名" v-model="username"></x-input>
        <x-input title="电 话" v-model="mobilephone" :max="11" is-type="china-mobile"></x-input>
      </group>
      <group>
        <x-textarea title="意向说明" v-model="desc" :rows=10></x-textarea>
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
        mobilephone: null,
        username: null,
        desc: null,
      }
    },
    methods: {
      submit() {
        this.$vux.alert.show({
          title: '提示',
          content: '提交成功!',
          onShow() {
            console.log('Plugin: I\'m showing')
          },
          onHide() {
            console.log('Plugin: I\'m hiding')
          },
        })
      },
    },
    created() {
    },
    mixins: [ApiMixins, FnMixins],
  }
</script>
<style>
  .title {
    color: orange;
  }
</style>
