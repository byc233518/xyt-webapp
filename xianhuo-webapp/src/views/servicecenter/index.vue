<template>
  <div class="service-center">
    <p class="tc fz-50 m-t-100">就业服务中心</p>
    <flexbox>
      <flexbox-item>
        <div class="padding15">
          <router-link to="/servicecenter/train"><x-button>就业培训</x-button></router-link>
        </div>

      </flexbox-item>
      <flexbox-item>
        <div class="padding15">
          <router-link to="/servicecenter/jobhunting"><x-button>代找工作</x-button></router-link>
        </div>
      </flexbox-item>
    </flexbox>

    <div class="p-l-50 fz-40 m-t-200">
      <h4>联系我们</h4>
      <p>微 信：xetong2017</p>
      <p>Q  Q：xetong2017</p>
      <p>电 话：xetong2017</p>
    </div>
  </div>
</template>

<script>
  import ApiMixins from '../../assets/js/apiMixin'
  import FnMixins from '../../assets/js/fnMixin'

  export default {
    components: {},
    data: () => {
      return {}
    },
    methods: {},
    created() {
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
