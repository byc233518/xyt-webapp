<template>
  <div class="map-wrap">
    <baidu-map class="map" :center="center" :zoom="13">
      <!--缩放控件-->
      <bm-navigation
        anchor="BMAP_ANCHOR_BOTTOM_LEFT"
        :offset="anchorOffset"
      ></bm-navigation>
      <!--定位控件-->
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_LEFT"
        :showAddressBar="true"
        :autoLocation="true"
        :offset="locationOffset"
      >
      </bm-geolocation>
      <!--覆盖物(点)-->
      <bm-point-collection
        :points="points"
        color="red"
        shape="BMAP_POINT_SHAPE_STAR"
        size="BMAP_POINT_SIZE_BIG"
        @click="clickHandler"
        @ready="addPoints"
      >
      </bm-point-collection>
      <!--全景-->
      <bm-panorama></bm-panorama>
      <!--城市选择-->
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
      <bm-info-window
        :show="infoWindowShow"
        :position="infoWindowPosition"
        @close="infoWindowClose"
        @open="infoWindowOpen">
        {{infoWindowText}}
        <router-link :to="{path: '/detail/' + infoWindowId}">
          <div>
            <button class="btn-goto-detail">详情</button>
          </div>
        </router-link>
      </bm-info-window>
      <!---->
      <!--<bm-circle-->
        <!--:center="circlePath.center"-->
        <!--:radius="circlePath.radius"-->
        <!--stroke-color="blue"-->
        <!--:stroke-opacity="0.1"-->
        <!--:stroke-weight="2"-->
        <!--:fill-opacity="0.5"-->
        <!--@lineupdate="updateCirclePath">-->
      <!--</bm-circle>-->
    </baidu-map>
  </div>
</template>

<script>
  import ApiMixins from '../../assets/js/apiMixin'
  import FnMixins from '../../assets/js/fnMixin'

  /* eslint-disable */
  export default {
    name: 'App',
    components: {},
    data: () => {
      return {
        center: {
          lng: 113.9454378,
          lat: 22.5427052,
        },
        anchorOffset: {
          width: 10,
          height: 60,
        },
        locationOffset: {
          width: 10,
          height: 140,
        },
        points: [],
        circlePath: {
          center: {
            lng: 113.9454378,
            lat: 22.5427052,
          },
          radius: 5000,
        },
        infoWindowText: 'info window',
        infoWindowShow: false,
        infoWindowId: 0,
        infoWindowPosition: {
          lng: 113.9454378,
          lat: 22.5427052,
        },
      }
    },
    methods: {
      clickHandler(e) {
//        window.alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat}`);
        console.log(e)
        this.infoWindowShow = true
        this.infoWindowPosition = {
          lng: e.point.lng,
          lat: e.point.lat,
        }
        this.infoWindowText = e.point.title
        this.infoWindowId = e.point.id
      },
      addPoints() {
        const points = [];
        this.getList().then((res) => {
          this.$vux.loading.hide()
          if (res && res.length) {
            _.forEach(res, (item) => {
              const position = {lng: item.lng, lat: item.lat, title: item.title, id: item._id}
              points.push(position)
            })
          }
        })
        this.points = points
      },
      updateCirclePath(e) {
        this.circlePath.center = e.target.getCenter()
        this.circlePath.radius = e.target.getRadius()
      },
      infoWindowClose () {
        this.infoWindowShow = false
      },
      infoWindowOpen () {
        this.infoWindowShow = true
      }
    },
    created() {
      const self = this
      let location = {
        lng: 113.9454378,
        lat: 22.5427052,
      }
      if (typeof(wx) !== 'undefined') {
        wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {
            const latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            const longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            if (res && res.latitude) {
              location.lng = res.longitude
              location.lat = res.latitude
            }
          }
        });
      } else {
        navigator.geolocation.getCurrentPosition(function (position) {
          console.log('position', position)
          if (position && position.coords) {
            location.lng = position.coords.longitude
            location.lat = position.coords.latitude
          }
        }, function (err) {
          console.log('err', err)
        }, {maximumAge: 600000, timeout: 10000, enableHighAccuracy: false})
      }
      this.center = location
      this.circlePath.center = location
      console.log('circlePath', this.circlePath)
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
