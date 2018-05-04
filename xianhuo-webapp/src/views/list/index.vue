<template>
  <!--eslint-disable-->
  <div>
    <section class="topbar">
      <form action="/zhaopin/" method="get">

        <div class="search-box">
          <div id="input-wraper" class="input-top">
            <a class="logo-icon" href="https://m.liepin.com/"></a>
            <div class="back">
              <i class="text-icon icon-back"></i>
            </div>
            <div class="input-wrap">
              <i class="text-icon icon-search"></i>
              <div class="switch">
                <span data-selector="switch-btn"><b>职位</b><i class="narrow"></i></span>
                <div class="switch-pop">
                  <span><i class="text-icon icon-position"></i><b>职位</b></span> <span><i class="text-icon icon-company"></i><b>公司</b></span>
                </div>
                <input data-selector="search-type" value="0" type="hidden">
              </div>
              <input data-selector="search-input" name="keyword" type="text" placeholder="请输入职位名称" value="">
              <i class="text-icon icon-close clear-input-btn" style="display: none;"></i></div>
            <div class="go">
              <i data-nick="job-search" class="text-icon icon-search"></i>
            </div>
            <a class="users-btn" data-selector="users-btn" href="javascript:;"><i class="text-icon icon-user"></i></a>
          </div>
        </div>

        <div class="filter-box">
          <div class="flexbox">
            <div class="flex-1">
              <a href="javascript:;" data-selector="city" class="active selected"><span class="ellipsis-1">深圳</span><i class="text-icon icon-narrow-down"></i></a> <input type="hidden" name="dqs" value="050030">
            </div>
            <div class="flex-1">
              <a href="javascript:;" data-selector="industrys-select" class="active selected"><span class="ellipsis-1">行业不限</span><i class="text-icon icon-narrow-down"></i></a> <input type="hidden" name="industrys" value="150">
            </div>
            <div class="flex-1">
              <a href="javascript:;" data-selector="more"><span class="ellipsis-1">更多</span><i class="text-icon icon-narrow-down"></i></a>
              <input type="hidden" name="salarylow" value="0">
              <input type="hidden" name="salaryhigh" value="999">
              <input type="hidden" name="compScale" value="000">
              <input type="hidden" name="compKind" value="000">
              <input type="hidden" name="pubtime" value="000">
              <input type="hidden" name="jobkind" value="">

              <input type="hidden" name="d_headId" value="6c7d7173834bed34e47390ad98f823a7">
              <input type="hidden" name="d_ckId" value="6b9b9361b891fd243c9b3681315113d2">
              <input type="hidden" name="d_sfrom" value="search_prime">
              <input type="hidden" name="d_curPage" value="0">
              <input type="hidden" name="d_pageSize" value="60">
              <input type="hidden" name="siTag" value="om9hg_PdxKRszYCQ1YpArw~zW1lJiASHEwDbI8bVQzcWg">
            </div>
          </div>
        </div>
      </form>
    </section>

    <div class="job-card-wrap">
      <div class="job-card" v-for="(item, key) in list" @click="linkTo(`detail/${item._id}`)">
        <dl class="clearfix">
          <dt class="job-card-logo">
            <img src="https://image0.lietou-static.com/middle_/59255c707032a8e95b0f082106a.jpg" alt=""
                 class="job-card-logo">
          </dt>
          <dd class="right-info">
            <ul>
              <li class="flexbox">
                <a class="flex-3 job-name">
                  <span class="name-text">{{item.title}}   </span>
                </a>
                <span class="text-warning flex-1">{{item.salary}}</span>
              </li>
              <li>
                <a class="ellipsis-1 company-name" onclick="return false;">{{item.company_name}}</a>
              </li>
              <li>
                <time>{{item.date}}</time>
                <a onclick="return false;">{{item.city}}</a>
              </li>
            </ul>
          </dd>
        </dl>
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
          this.list = _.filter(this.originList, (o) => {
            return o.title.indexOf(keyText) > -1
          })
        } else {
          this.list = this.originList
        }
      },
    },
    created() {
      /* eslint-disable */
      this.getWxUserInfo().then((res) => {
        alert(JSON.stringify(res))
      })
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
      city: function (val) {
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
  .job-card-wrap {
    margin-top: 94px;
    background: #fff;
    padding: 0 10px;
  }

  .job-card-wrap {
    background: #fff;
    padding: 0 10px;
  }

  .job-card {
    display: block;
    color: #333;
    background: #fff;
    border-radius: 2px;
    border-bottom: 1px solid #ddd;
    padding: 15px 0;
    position: relative;
  }

  .job-card .right-info {
    padding-left: 70px;
    text-align: left;
    position: relative;
  }

  .job-card dd.right-info .job-name {
    color: #333;
    font-size: 0;
    font-weight: bold;
  }

  .job-card .right-info li {
    color: #999;
    line-height: 1;
    margin-bottom: 8px;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .job-card .right-info li .text-warning {
    text-align: right;
    font-size: 15px;
  }

  .job-card dd.right-info .job-name .name-text {
    max-width: 86%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 15px;
  }

  .job-card dt.job-card-logo {
    float: left;
    width: 60px;
    height: 60px;
    line-height: 60px;
    position: relative;
  }

  .job-card dt.job-card-logo img {
    width: 60px;
    height: 60px;
  }

  .ellipsis-1 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .job-card dd.right-info li a {
    color: #999;
  }

  .job-card .right-info li .text-warning {
    text-align: right;
    font-size: 15px;
  }

  .flex-1 {
    display: block;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 0;
  }

  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden
  }

  .clearfix {
    height: 1%;
  }

  .text-warning {
    color: #fa0;
  }

  .topbar {
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    border-bottom: 1px solid #ddd;
    width: 100%;
    z-index: 2109;
  }

  .topbar .filter-box {
    height: 44px;
  }

  .topbar .filter-box .flexbox > div > a {
    color: #666;
    display: block;
    padding: 12px 0;
    text-align: center;
  }

  .topbar .filter-box .flexbox > div > a.active {
    color: #fc6621;
  }

</style>
