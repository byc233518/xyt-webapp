<template>
  <div>
    <div class="search-wrap display-flex">
      <div class="p-l-10 p-r-30 p-t-10 flex1">
        <input type="text" placeholder="输入关键字进行筛选" @keyup="searchOnChange($event)">
      </div>
      <div class="">
        <CityPicker></CityPicker>
      </div>
    </div>

    <div class="container">
      <ul v-if="list.length > 0">
        <li
          v-for="(item, key) in list"
          :key="key" v-if="item"
          @click="linkTo(`detail/${item._id}`)">
          <div>{{item.title}}</div>
          <div class="display-flex">
            <div class="flex1">
              <i class="fa fa-map-marker m-r-10" aria-hidden="true"></i>{{item.city}}
            </div>
            <div class="flex1">
              <i class="fa fa-clock-o m-r-10" aria-hidden="true"></i>{{item.date}}
            </div>
          </div>
          <div>{{item.salary}}</div>
        </li>
      </ul>
      <div v-else>
        无结果
      </div>
    </div>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem, Cell, Search } from 'vux'
  import ApiMixins from '../../assets/js/apiMixin'
  import FnMixins from '../../assets/js/fnMixin'
  import CityPicker from '../../components/common/cityPicker.vue'

  export default {
    name: 'App',
    components: {
      Tabbar,
      TabbarItem,
      Cell,
      Search,
      CityPicker,
    },
    data: () => {
      return {
        originList: [],
        list: [],
        textKey: '',
      }
    },
    computed: {
      city() {
        return this.$store.getters.getCity
      },
    },
    methods: {
      searchOnChange(event) {
        const keyText = event.target.value
        if (keyText) {
          this.list = _.filter(this.originList, (o) => { return o.title.indexOf(keyText) > -1 })
        } else {
          this.list = this.originList
        }
      },
    },
    created() {
      this.getList().then((res) => {
        this.$vux.loading.hide()
        if (res) {
          this.list = res
          this.originList = res
        } else {
          this.list = []
          this.originList = []
        }
      })
    },
/* eslint-disable */
    watch: {
      city: function(val) {
        this.getListWithParams(`city=${val}`).then((res) => {
          this.$vux.loading.hide()
          if (res) {
            this.list = res
            this.originList = res
          } else {
            this.list = []
            this.originList = []
          }
        })
      },
    },
    mixins: [ApiMixins, FnMixins],
  }
</script>

<style scoped lang="scss">
  .container {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .search-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #EFEFF4;
    z-index: 501;

    input {
      width: 100%;
      height: .5rem;
    }
  }

  li {
    margin-bottom: .2rem;
    padding: .1rem .2rem;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    box-shadow:  0px 5px 10px #ececec;
  }

</style>
