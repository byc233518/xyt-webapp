<template>
  <div>
    <h2 class="tc"> 关于我们 </h2>
    <p>
      信活。</p>
  </div>
</template>

<script>
  import ApiMixins from '../../assets/js/apiMixin'
  import FnMixins from '../../assets/js/fnMixin'

  export default {
    components: {},
    data() {
      return {
        userInfo: {
          age: 60,
          skill: 'test, test1',
        },
      }
    },
    computed: {},
    methods: {},
    created() {
      this.$vlf.getItem('wxUserInfo').then((res) => {
        this.userInfo = _.assign(this.userInfo, res)
      })
    },
    mixins: [ApiMixins, FnMixins],
  }
</script>

<style lang="less" scoped>

</style>
