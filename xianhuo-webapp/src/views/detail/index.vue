<template>
  <div>
    <!--eslint-disable-->
    <!--<div class="content p-20">-->
    <!--<h2>{{jobData.title}}</h2>-->
    <!--<div class="salary">{{jobData.salary}} | 月结</div>-->
    <!--<div class="m-t-10">更新时间: {{jobData.date}}</div>-->
    <!--<div class="m-t-10">城市: {{jobData.city}}</div>-->
    <!--<div class="m-t-10">工作地点: {{jobData.address}}</div>-->
    <!--<div class="m-t-10">联系电话: <a :href="jobData.tel"></a>{{jobData.tel}}</div>-->
    <!--<Divider>详细信息</Divider>-->
    <!--<div class="fz-35 border-bottom m-t-20">职位描述</div>-->
    <!--<p class="m-t-20">{{jobData.desc}}</p>-->
    <!--<div class="fz-35 border-bottom m-t-20">公司信息</div>-->
    <!--<p class="m-t-20">{{companyData.name}}</p>-->
    <!--<p class="m-t-20">公司规模: {{companyData.scale}}</p>-->
    <!--<p class="m-t-20">公司性质: {{companyData.nature}}</p>-->
    <!--<p class="m-t-20">是否认证: {{companyData.is_auth ? '已认证' : '未认证'}}</p>-->
    <!--<p class="m-t-20">所属行业: {{companyData.industry}}</p>-->
    <!--<p class="m-t-20">公司介绍: </p>-->
    <!--<p class="m-t-20">{{companyData.desc}}</p>-->
    <!--</div>-->
    <div class="job-detail">
      <section class="base-info">
        <div class="flexbox baseinfo-top">
          <span class="flex-1 job-name">{{jobData.title}}</span>
          <p class="salary">{{jobData.salary}}</p>
        </div>
        <p class="feedback-labels clearfix">
          <label class="type-ejob-danger">企业急聘</label>
          <label data-selector="feedback">24小时反馈</label>
          <span class="favorite float-right"><i class="text-icon icon-collection"></i><em class="muted">收藏</em></span>
        </p>
        <div class="job-conditon">
          <p><a href="https://m.liepin.com/suzhou/" target="_blank">{{jobData.city}}</a></p>|
          <p>有经验</p>|
          <p>学历无要求</p>
        </div>
        <!-- 福利标签 -->
        <div class="welfare clearfix">
          <img class="quotes"
               src="//concat.lietou-static.com/fe-mobile-h5/v5/static/images/pages/job/quotes.e3e4ce19.png">
          职位诱惑：节日礼物,五险一金,带薪年假,定期体检,上市公司
        </div>
        <a href="javascript:;" class="btn-apply-job" data-selector="apply">应聘职位</a>
      </section>

      <section class="company-info">
        <div class="job-parent clearfix" data-selector="card-link">
          <a href="https://m.liepin.com/company/5009256/" class="job-img"><img
            src="https://image0.lietou-static.com/huge/58abd81a7032173553b8252d04a.jpg" class="tinyLogo"></a>
          <div class="job-parent-info">
            <h2 class="ellipsis-1">
              {{companyData.name}}
            </h2>
            <p class="muted ellipsis-1">
              <a href="https://m.liepin.com/ruanjian/" class="industry-link"
                 data-selector="return-url">{{companyData.industry}}</a>
              &nbsp;|&nbsp;{{companyData.scale}}</p>
          </div>
          <i class="text-icon icon-go-ahead"></i>
        </div>

        <p class="company-address" data-selector="look-map">{{jobData.address}}<span
          data-selector="tips-text">查看地图</span><i class="text-icon icon-address"></i></p>
        <div class="map-container map-hidden" data-selector="gdmap" data-city="苏州" data-name="麦迪斯顿"
             data-address="苏州工业园区归家巷222号">
          <div class="allmap" id="allmap" data-selector="allmap"
               style="width: 100%; height: 20em; overflow: hidden; position: relative; z-index: 0; background-color: rgb(243, 241, 236); color: rgb(0, 0, 0); text-align: left;">
            <div
              style="overflow: visible; position: absolute; z-index: 0; left: 0px; top: 0px; cursor: url(&quot;https://api.map.baidu.com/images/openhand.cur&quot;) 8 8, default;">
              <div class="BMap_mask"
                   style="position: absolute; left: 0px; top: 0px; z-index: 9; overflow: hidden; user-select: none; width: 375px; height: 280px;"></div>
              <div style="position: absolute; height: 0px; width: 0px; left: 0px; top: 0px; z-index: 200;">
                <div style="position: absolute; height: 0px; width: 0px; left: 0px; top: 0px; z-index: 800;">
                  <div class="iw"
                       style="position: absolute; line-height: 28px; text-align: center; border: 0px; user-select: none;">
                    <div>
                      <div class="iw_l" style="display: block;"></div>
                      <div class="iw_r" style="display: block;"></div>
                      <a target="_blank" class="iw_s iw_s0 iw_c">
                        <div class="iw_bg iw_cc"></div>
                      </a></div>
                  </div>
                </div>
                <div style="position: absolute; height: 0px; width: 0px; left: 0px; top: 0px; z-index: 700;"><span
                  class="BMap_Marker BMap_noprint" unselectable="on"
                  "="" style="position: absolute; padding: 0px; margin: 0px; border: 0px; cursor: pointer; background: url(&quot;https://api.map.baidu.com/images/blank.gif&quot;); width: 19px; height: 25px; left: 178px; top: 115px; z-index: -6264330; user-select: none;" title=""></span>
                </div>
                <div style="position: absolute; height: 0px; width: 0px; left: 0px; top: 0px; z-index: 600;"></div>
                <div style="position: absolute; height: 0px; width: 0px; left: 0px; top: 0px; z-index: 500;"><label
                  class="BMapLabel" unselectable="on"
                  style="position: absolute; display: none; cursor: inherit; background-color: rgb(190, 190, 190); border: 1px solid rgb(190, 190, 190); padding: 1px; white-space: nowrap; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 12px; line-height: normal; font-family: arial, sans-serif; z-index: -20000; color: rgb(190, 190, 190);">shadow</label>
                </div>
                <div style="position: absolute; height: 0px; width: 0px; left: 0px; top: 0px; z-index: 400;"><span
                  class="BMap_Marker" unselectable="on"
                  style="position: absolute; padding: 0px; margin: 0px; border: 0px; width: 0px; height: 0px; left: 178px; top: 115px; z-index: -6264330;"><div
                  style="position: absolute; margin: 0px; padding: 0px; width: 19px; height: 25px; overflow: hidden;"><img
                  src="https://api.map.baidu.com/images/marker_red_sprite.png"
                  style="display: block; border:none;margin-left:0px; margin-top:0px; "></div></span></div>
                <div style="position: absolute; height: 0px; width: 0px; left: 0px; top: 0px; z-index: 300;"><span
                  unselectable="on"
                  style="position: absolute; padding: 0px; margin: 0px; border: 0px; width: 20px; height: 11px; left: 182px; top: 129px;"><div
                  style="position: absolute; margin: 0px; padding: 0px; width: 20px; height: 11px; overflow: hidden;"><img
                  src="https://api.map.baidu.com/images/marker_red_sprite.png"
                  style="display: block; border:none;margin-left:-19px; margin-top:-13px; "></div></span></div>
                <div style="position: absolute; height: 0px; width: 0px; left: 0px; top: 0px; z-index: 201;"></div>
                <div style="position: absolute; height: 0px; width: 0px; left: 0px; top: 0px; z-index: 200;"></div>
              </div>
              <div style="position: absolute; overflow: visible; top: 0px; left: 0px; z-index: 1;">
                <div
                  style="position: absolute; overflow: visible; z-index: -100; left: 187px; top: 140px; display: block; transform: translate3d(0px, 0px, 0px);">
                  <img
                    src="https://gss0.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/tile/?qt=tile&amp;x=6567&amp;y=1783&amp;z=15&amp;styles=pl&amp;scaler=2&amp;udt=20180411"
                    style="position: absolute; border: none; width: 256px; height: 256px; left: -208px; top: -181px; max-width: none; opacity: 1;"><img
                  src="https://gss0.bdstatic.com/8bo_dTSlRMgBo1vgoIiO_jowehsv/tile/?qt=tile&amp;x=6568&amp;y=1783&amp;z=15&amp;styles=pl&amp;scaler=2&amp;udt=20180411"
                  style="position: absolute; border: none; width: 256px; height: 256px; left: 48px; top: -181px; max-width: none; opacity: 1;"><img
                  src="https://gss0.bdstatic.com/8bo_dTSlQ1gBo1vgoIiO_jowehsv/tile/?qt=tile&amp;x=6567&amp;y=1782&amp;z=15&amp;styles=pl&amp;scaler=2&amp;udt=20180411"
                  style="position: absolute; border: none; width: 256px; height: 256px; left: -208px; top: 75px; max-width: none; opacity: 1;"><img
                  src="https://gss0.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/tile/?qt=tile&amp;x=6568&amp;y=1782&amp;z=15&amp;styles=pl&amp;scaler=2&amp;udt=20180411"
                  style="position: absolute; border: none; width: 256px; height: 256px; left: 48px; top: 75px; max-width: none; opacity: 1;">
                </div>
              </div>
              <div style="position: absolute; overflow: visible; top: 0px; left: 0px; z-index: 2; display: none;">
                <div
                  style="position: absolute; overflow: visible; top: 0px; left: 0px; z-index: 0; display: none;"></div>
              </div>
              <div style="position: absolute; overflow: visible; top: 0px; left: 0px; z-index: 3;"></div>
            </div>
            <div class="pano_close" title="退出全景" style="z-index: 1201; display: none;"></div>
            <a class="pano_pc_indoor_exit" title="退出室内景" style="z-index: 1201; display: none;"><span
              style="float:right;margin-right:12px;">出口</span></a>
            <div unselectable="on" class=" BMap_stdMpCtrl BMap_stdMpType4 BMap_noprint anchorBR"
                 style="width: 35px; height: 71px; bottom: 10px; right: 10px; top: auto; left: auto; position: absolute; z-index: 1100; text-size-adjust: none;">
              <div class="BMap_stdMpPan">
                <div class="BMap_button BMap_panN" title="向上平移"></div>
                <div class="BMap_button BMap_panW" title="向左平移"></div>
                <div class="BMap_button BMap_panE" title="向右平移"></div>
                <div class="BMap_button BMap_panS" title="向下平移"></div>
                <div class="BMap_stdMpPanBg BMap_smcbg"></div>
              </div>
              <div class="BMap_stdMpZoom"
                   style="width: 35px; height: 71px; background: rgba(255,255,255,.8); -webkit-box-shadow: 1px 1px 2px rgba(0,0,0,.4); border-radius: 3px;">
                <div class="BMap_button BMap_stdMpZoomIn" title="放大一级"
                     style="position: initial; background: initial; border-radius: initial; box-shadow: initial; width: 35px; height: 35px;">
                  <div class="BMap_smcbg"
                       style="position: initial; width: 35px; height: 35px; background-image: url(https://api.map.baidu.com/images/navigation-control/mobile/plus-28x29.png); background-size: 14px 15px; background-position: center; background-repeat: no-repeat;"></div>
                </div>
                <div class="BMap_button BMap_stdMpZoomOut" title="缩小一级"
                     style="position: initial; background: initial; border-radius: initial; box-shadow: initial; width: 35px; height: 35px; border-top: 1px solid rgb(236, 236, 236); top: 44px;">
                  <div class="BMap_smcbg"
                       style="position: initial; width: 35px; height: 35px; background-image: url(https://api.map.baidu.com/images/navigation-control/mobile/minus-30x6.png); background-size: 15px 3px; background-position: center; background-repeat: no-repeat;"></div>
                </div>
                <div class="BMap_stdMpSlider" style="height: 0px;">
                  <div class="BMap_stdMpSliderBgTop" style="height: 0px;">
                    <div class="BMap_smcbg"></div>
                  </div>
                  <div class="BMap_stdMpSliderBgBot"></div>
                  <div class="BMap_stdMpSliderMask" title="放置到此级别"></div>
                  <div class="BMap_stdMpSliderBar" title="拖动缩放"
                       style="cursor: url(&quot;https://api.map.baidu.com/images/openhand.cur&quot;) 8 8, default;">
                    <div class="BMap_smcbg"></div>
                  </div>
                </div>
                <div class="BMap_zlHolder">
                  <div class="BMap_zlSt">
                    <div class="BMap_smcbg"></div>
                  </div>
                  <div class="BMap_zlCity">
                    <div class="BMap_smcbg"></div>
                  </div>
                  <div class="BMap_zlProv">
                    <div class="BMap_smcbg"></div>
                  </div>
                  <div class="BMap_zlCountry">
                    <div class="BMap_smcbg"></div>
                  </div>
                </div>
              </div>
              <div class="BMap_stdMpGeolocation"
                   style="position: initial; display: none; position: absolute; left: -329px; bottom: 0px;">
                <div class="BMap_geolocationContainer"
                     style="position: initial; width: 38px; height: 38px; overflow: hidden; margin: 0px; margin-left: 10px; margin-bottom: 20px; box-sizing: border-box;">
                  <div class="BMap_geolocationIconBackground"
                       style="position: initial; width: 38px; height: 38px; background-image: url('https://api.map.baidu.com/images/navigation-control/geolocation-control/mobile/background-76x76.png'); background-size: 38px 38px; background-repeat: no-repeat; background-position: center;">
                    <div style="position: initial; padding-top: 9px; padding-left: 9px;">
                      <div class="BMap_geolocationIcon"
                           style="position: initial; width: 20px; height: 20px; cursor: pointer; background-image: url('https://api.map.baidu.com/images/navigation-control/geolocation-control/mobile/default-40x40.png'); background-size: 20px 20px; background-repeat: no-repeat; background-position: center;"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class=" anchorBL"
                 style="height: 25px; position: absolute; z-index: 30; text-size-adjust: none; bottom: 1px; right: auto; top: auto; left: 1px;">
              <a title="到百度地图查看此区域" target="_blank" href="http://map.baidu.com/?sr=1" style="outline: none;"><img
                style="border:none;width:68px;height:25px" src="https://api.map.baidu.com/images/copyright_logo_hd.png"></a>
            </div>
            <div unselectable="on" class=" BMap_cpyCtrl BMap_noprint anchorBL"
                 style="cursor: default; white-space: nowrap; color: black; background: none; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 11px; line-height: 15px; font-family: arial, sans-serif; bottom: 0px; right: auto; top: auto; left: 72px; position: absolute; z-index: 10; text-size-adjust: none;"></div>
          </div>
          <p class="bus-subway" data-selector="bus-subway-line"></p>
        </div>

      </section>
      <section class="job-detail-list">
        <h3 class="h3-title">职位描述</h3>
        <div class="about-us-main" data-selector="about-us-main">
          <article class="content-word">
            {{jobData.desc}}
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
  import { Tabbar, TabbarItem } from 'vux'
  import ApiMixins from '../../assets/js/apiMixin'

  export default {
    name: 'App',
    components: {
      Tabbar,
      TabbarItem,
    },
    data: () => {
      return {
        jobData: {
          num: 0,
          tel: '',
          city: '',
          desc: '',
          date: '',
          title: '',
          salary: '',
          address: '',
          province: '',
          requirement: '',
        },
        companyData: {
          desc: '',
        },
      }
    },
    created() {
      console.log(this.$route.params.id)
      this.getDetailById(this.$route.params.id).then((res) => {
        this.$vux.loading.hide()
        if (res) {
          this.jobData = res

          this.getCompanyByName(res.company_name).then((companyRes) => {
            this.$vux.loading.hide()
            this.companyData = companyRes
          })
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
    display: inline;
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
</style>
