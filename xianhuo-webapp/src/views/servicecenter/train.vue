<template>
  <div class="service-center">
    <p class="tc fz-50 m-t-100">培训中心</p>
    <div>
      <flexbox>
        <flexbox-item>
          <div class="tc m-t-50">家政服务</div>
        </flexbox-item>
        <flexbox-item>
          <div class="tc m-t-50">电子商务</div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item>
          <div class="tc m-t-50">种地养殖</div>
        </flexbox-item>
        <flexbox-item>
          <div class="tc m-t-50">创业培训</div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
  import ApiMixins from '../../assets/js/apiMixin'
  import FnMixins from '../../assets/js/fnMixin'

  export default {
    components: { },
    data: () => {
      return {}
    },
    methods: {},
    created() {
      console.log(111111111)
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
