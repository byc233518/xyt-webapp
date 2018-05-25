<template>
  <!--eslint-disable-->
  <div>
    <section class="topbar">
      <div>
        <div class="search-box">
          <div id="input-wraper" class="input-top">
            <a class="logo-icon"></a>
            <div class="back">
              <i class="text-icon icon-back"></i>
            </div>
            <div class="input-wrap">
              <i class="text-icon icon-search"></i>
              <div class="switch">
                <span data-selector="switch-btn"><b>职位</b><i class="narrow"></i></span>
                <div class="switch-pop">
                  <span><i class="text-icon icon-position"></i><b>职位</b></span> <span><i
                  class="text-icon icon-company"></i><b>公司</b></span>
                </div>
                <input data-selector="search-type" value="0" type="hidden">
              </div>
              <input name="textKey" type="text" placeholder="请输入职位名称" v-model="textKey">
              <i class="text-icon icon-close clear-input-btn" style="display: none;"></i></div>
            <div class="go">
              <i class="text-icon icon-search"></i>
            </div>
            <a class="users-btn" @click="gotoHome" href="javascript:;"><i class="text-icon icon-user"></i></a>
          </div>
        </div>

        <div class="filter-box">
          <div class="flexbox">
            <div class="flex-1">
              <a href="javascript:;" @click="showAdderssPicker" class="active selected">
                <span class="ellipsis-1">
                  <x-address style="display:none;"
                             hide-district
                             title="title"
                             v-model="address"
                             @on-hide="addressOnChange"
                             @on-shadow-change="showAddress"
                             placeholder="请选择地址"
                             :list="addressData"
                             :show.sync="showAddressPicker"
                  ></x-address>
                </span>
                {{city}}
                <i class="text-icon icon-narrow-down"></i>
              </a>
            </div>
            <div class="flex-1">
              <a href="javascript:;" data-selector="industrys-select" class="active selected">
                <popup-picker :data='industrys'
                              v-model='industry'
                              placeholder="请选择行业"
                              @on-change='industryOnChange'
                ></popup-picker>
                <!--<span class="ellipsis-1">{{industry}}</span>-->
                <i class="text-icon icon-narrow-down"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="job-card-wrap">
      <div v-if="pageData && pageData.length" class="job-card" v-for="(item, key) in pageData" @click="linkTo(`detail/${item._id}`)">
        <dl class="clearfix">
          <dt class="job-card-logo">
            <img :src=item.thumbnail alt=""
                 class="job-card-logo">
          </dt>
          <dd class="right-info">
            <ul>
              <li class="flexbox">
                <a class="flex-2 job-name">
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
      <div v-else class="tc fz-32">{{loadingText}}</div>
    </div>
  </div>
</template>

<script>
  import { ChinaAddressV4Data, Value2nameFilter as value2name } from 'vux'
  import ApiMixins from '../../assets/js/apiMixin'
  import FnMixins from '../../assets/js/fnMixin'
  import CityPicker from '../../components/common/cityPicker.vue'

  export default {
    name: 'App',
    components: {
      CityPicker,
      ChinaAddressV4Data,
    },
    data: () => {
      return {
        originList: [],
        pageData: [],
        textKey: '',
        city: '全国',
        province: '',
        address: [],
        showAddressPicker: false,
        addressData: ChinaAddressV4Data,
        industry: ['全部行业'],
        industrys: [['全部行业', '农林牧业', '服务行业', '建筑行业', '其他行业']],
        params: {},
        loadingText: '加载中...',
      }
    },
    computed: {
    },
    methods: {
      searchOnChange(event) {
        const keyText = event.target.value
        if (keyText) {
          this.pageData = _.filter(this.originList, (o) => {
            return o.title.indexOf(keyText) > -1
          })
        } else {
          this.pageData = this.originList
        }
      },
      showAdderssPicker() {
        this.showAddressPicker = true
      },
      showAddress() {
      },
      doSearch() {
        this.getDataWithParams()
      },
      addressOnChange() {
        this.province = this.getName(this.address).split(' ')[0]
        this.city = this.getName(this.address).split(' ')[1]
        this.params.city = this.city
        this.getDataWithParams()
      },
      industryOnChange() {
        this.getDataWithParams()
      },
      getName(value) {
        return value2name(value, ChinaAddressV4Data)
      },
      getDataWithParams() {
        /* eslint-disable */
        let params = []
        if (this.city !== '全国') {
          this.params.city = this.city
        }
        if (this.industry[0] !== '全部行业') {
          this.params.industry = this.industry[0]
        }
        if (this.textKey !== '') {
          this.params.title = this.textKey
        }
        this.getListWithParams(this.params).then((res) => {
          this.$vux.loading.hide()
          if (res) {
            this.pageData = res
            this.originList = res
          } else {
            this.pageData = []
            this.originList = []
            this.loadingText = '抱歉, 暂无相关信息.'
          }
        })
      },
      gotoHome() {
        this.$router.push('/home')
      },
    },
    created() {
      /* eslint-disable */
      this.getList().then((res) => {
        this.$vux.loading.hide()
        if (res) {
          this.pageData = res
          this.originList = res
        } else {
          this.pageData = []
          this.originList = []
          this.loadingText = '抱歉, 暂无相关信息.'
        }
      })
    },
    /* eslint-disable */
    watch: {
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

  .vux-cell-box {
    display: inline-block;
  }

</style>
