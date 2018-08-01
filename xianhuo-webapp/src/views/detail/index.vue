<template>
  <div>
    <div class="job-detail">
      <section class="base-info">
        <div class="flexbox baseinfo-top">
          <span class="flex-1 job-name">{{jobData.jobName}}</span>
          <p class="salary">{{jobData.salary}}</p>
        </div>
        <p class="feedback-labels clearfix">
          <label class="type-ejob-danger">急聘</label>
          <label data-selector="feedback">24小时反馈</label>
        </p>
        <div class="job-conditon">
          <p>地区: <a>{{jobData.city || '未知地区'}}</a></p>
          <p>发布时间: {{jobData.date}}</p>
          <p>学历要求: {{jobData.date}}</p>
          <p>经验要求: {{jobData.workTime}}</p>
        </div>
        <!-- 福利标签 -->
        <a :href="['tel:' + jobData.tel]" class="btn-apply-job" data-selector="apply">立即联系</a>
      </section>

      <section class="company-info">
        <div class="job-parent clearfix" data-selector="card-link">
          <a href="#" class="job-img">
            <img
              :src=jobData.thumbnail class="tinyLogo"></a>
          <div class="job-parent-info">
            <h2 class="ellipsis-1">
              {{jobData.company_name}}
            </h2>
            <p>{{jobData.workLocation}}</p>
            <!--<p class="muted ellipsis-1">-->
            <!--<a href="https://m.liepin.com/ruanjian/" class="industry-link"-->
            <!--data-selector="return-url">{{companyData.industry}}</a>-->
            <!--&nbsp;&nbsp;{{companyData.scale}}</p>-->
          </div>
          <!--<i class="text-icon icon-go-ahead"></i>-->
        </div>

        <!--<p class="company-address" data-selector="look-map"
         @click="toggleMap">{{jobData.address}}<span-->
        <!--data-selector="tips-text">查看地图</span><i class="text-icon icon-address"></i></p>-->
        <!--<div v-show="showMap">-->
        <!--<baidu-map class="map"-->
        <!--:center="center"-->
        <!--:zoom="zoom"-->
        <!--@ready="mapReady"-->
        <!--&gt;-->
        <!--<bm-marker-->
        <!--:position="'深圳市南山区高新南一道8号创维大厦'"-->
        <!--:dragging="true"-->
        <!--animation="BMAP_ANIMATION_BOUNCE"-->
        <!--&gt;-->
        <!--</bm-marker>-->
        <!--<bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>-->
        <!--</baidu-map>-->
        <!--</div>-->

      </section>
      <section class="job-detail-list">
        <h3 class="h3-title">职位描述</h3>
        <div class="about-us-main" data-selector="about-us-main">
          <article class="content-word">
            {{jobData.jobDesc}}
            <br>
          </article>
        </div>
        <h3 class="h3-title">岗位要求</h3>
        <div class="about-us-main" data-selector="about-us-main">
          <article class="content-word">
            {{jobData.requirement}}
            <br>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import ApiMixins from '../../assets/js/apiMixin'

  export default {
    name: 'App',
    components: {},
    data: () => {
      return {
        showMap: false,
        center: {
          lng: 116.404,
          lat: 39.915,
        },
        zoom: 15,
        jobData: {
          createBy: null,
          createDate: 1531210298000,
          updateBy: null,
          updateDate: 1531210298000,
          jobId: 34,
          jobName: '',
          degree: '',
          workTime: '',
          workLocation: '',
          hireNumber: 4,
          salary: 10000.0,
          jobDesc: '',
          effectState: null,
          effectiveDate: null,
          expiryDate: 1531152000000,
        },
        companyData: {
          desc: '',
        },
      }
    },
    methods: {
      mapReady({
                 BMap,
                 map,
               }) {
        console.log(BMap, map)
        this.center = this.jobData.city
        this.zoom = 10
      },
      toggleMap() {
        this.showMap = !this.showMap
      },
    },
    created() {
      this.getList(
        {
          jobId: this.$route.params.id,
        }, 1, 1).then((res) => {
        this.$vux.loading.hide()
        if (res) {
          this.jobData = res.data[0]
          this.jobData.date = moment(this.jobData.updateDate).format('YYYY-MM-DD')

//          this.getCompanyByName(res.company_name).then((companyRes) => {
//            this.$vux.loading.hide()
//            this.companyData = companyRes
//          })
        }
      })
    },
    mixins: [ApiMixins],
  }
</script>

<style lang="scss" scoped>
  .job-detail .base-info {
    background-color: #fff;
    border-radius: 2px;
    padding: 10px 15px 10px;
    margin-bottom: 10px;
  }

  .job-detail .base-info .baseinfo-top {
    margin-bottom: 6px;
  }

  .feedback-labels {
    padding-top: 10px;
    margin-bottom: 10px;
    margin-top: -8px;
  }

  .job-detail .base-info .welfare {
    margin-top: 5px;
    line-height: 22px;
    height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
    padding-left: 30px;
    padding-top: 5px;
    color: #999999;
  }

  .btn-apply-job {
    display: block;
    width: 100%;
    background: #ff5f00;
    text-align: center;
    color: #fff;
    font-size: 16px;
    border-radius: 3px;
    line-height: 40px;
    margin-top: 10px;
  }

  .job-detail .company-info {
    background-color: #fff;
    margin-bottom: 10px;
    padding: 15px 0;
  }

  .job-detail .company-info .job-parent {
    display: block;
    position: relative;
    color: #666;
    padding-left: 15px;
  }

  .job-detail .company-info .company-address {
    margin: 15px auto 0;
    color: #999;
    padding-left: 15px;
    border-top: 1px solid #dfdfdf;
    padding-top: 12px;
  }

  .job-detail .company-info .map-hidden {
    height: 0px;
    overflow: hidden;
  }

  .feedback-labels label.type-ejob-danger {
    color: #fff;
    background-color: #ff6555;
    border: 1px solid #ff6555;
  }

  .job-conditon p {
    margin: 0 5px 0 5px;
  }

  .job-detail .base-info .baseinfo-top .job-name {
    font-size: 18px;
    color: #333;
    word-break: break-word;
  }

  .feedback-labels {
    padding-top: 10px;
    margin-bottom: 10px;
    margin-top: -8px;
  }

  .job-detail .company-info .job-parent .job-img {
    float: left;
    border: 1px #e7e8ed solid;
    width: 50px;
  }

  .job-detail .company-info .job-parent .job-parent-info {
    margin-left: 60px;
    margin-right: 30px;
  }

  .job-detail .company-info .job-parent .icon-go-ahead {
    position: absolute;
    top: 50%;
    right: 12px;
    margin-top: -10px;
    font-size: 20px;
    color: #ccc;
  }

  .job-detail .company-info .company-address {
    margin: 15px auto 0;
    color: #999;
    padding-left: 15px;
    border-top: 1px solid #dfdfdf;
    padding-top: 12px;
  }

  .job-detail .company-info .company-address span {
    color: #34a6e1;
    margin-left: 10px;
  }

  .job-detail .job-detail-list {
    background-color: #fff;
    border-radius: 2px;
    padding: 15px;
    color: #666;
    margin-bottom: 10px;
  }

  .h3-title {
    border-left: 4px solid #ff9c00;
    padding-left: 12px;
    font-size: 16px;
    color: #333;
    margin-bottom: 12px;
  }

  .job-detail .job-detail-list .height-part {
    height: 600px;
    overflow: hidden;
  }

  .job-detail .job-detail-list .content-word {
    line-height: 1.8em;
    margin-bottom: 15px;
    padding-bottom: 15px;
    font-size: 14px;
    word-break: break-word;
  }

  .map {
    width: 100%;
    height: 300px;
  }
</style>
