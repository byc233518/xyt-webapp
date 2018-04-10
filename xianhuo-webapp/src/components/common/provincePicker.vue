<template>
  <div>
    <div class="location-wrap">
      <img src="../../assets/imgs/定位@2x.png" alt="" @click="showModal">
      <span @click="showModal">{{location}}</span>
    </div>
    <div class="modal" v-show="modalIsShow">
      <div class="search-wrap">
        <Search @on-submit="onSearch"
                @on-change="onSearch"
                :auto-fixed="false"
                v-model="textKey"
                @on-cancel="closeModal">
        </Search>
      </div>
      <div style="height: 95vh; overflow-y: scroll;" ref="modal">
        <div class="history-list">
          <div class="">
            <div class="p-l-30 ">最近搜索城市</div>
            <div class="history-list-item-wrap p-15">
              <span @click="areaOnChange($event)">全国</span>
              <span v-for="(item, key) in historyList" @click="historyOnChange($event)">{{item}}</span>
            </div>
          </div>
        </div>
        <div class="area-list">
          <ul>
            <li v-for="(item, key) in provinceData">
              <div class="bordered p-t-20 p-b-20" @click="provinceOnChange($event)">{{item.province}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Httpservice from '../../service/http'
  import Config from '../../service/config'

  let ALLPROVINCE = []
  export default {
    data: () => ({
      location: '全国',
      modalIsShow: false,
      textKey: '',
      provinceData: [],
      historyList: [],
    }),
    methods: {
      showModal() {
        this.modalIsShow = true
        document.addEventListener("backbutton", this.closeModal, false);
        this.$store.dispatch('toggleNavBar', false)
        setTimeout(() => {
          this.$refs.modal.scrollTop = 0
        }, 10)
      },
      areaOnChange(e) {
        const value = e.target.textContent
        this.location = value
        this.$store.dispatch('toggleNavBar', true)
        this.$store.dispatch('updateBehaviorProvince', value)
        this.closeModal()
        this.updateHistoryList(value)
      },
      provinceOnChange(e) {
        const value = e.target.textContent
        this.location = value
        this.$store.dispatch('toggleNavBar', true)
        this.$store.dispatch('updateBehaviorProvince', value)
        this.closeModal()
        this.updateHistoryList(value)
      },
      historyOnChange(e) {
        const value = e.target.textContent
        if (value.indexOf('大区') !== -1) {
          this.areaOnChange(e)
        } else {
          this.provinceOnChange(e)
        }
      },
      updateHistoryList(value) {
        if (value === '全国') return
        this.$store.dispatch('toggleNavBar', true)
        const oldList = localStorage.getItem('provinceSearchHistory')
          ? JSON.parse(localStorage.getItem('provinceSearchHistory'))
          : []
        let newList = oldList
        newList.unshift(value)
        let uniqedNewList = _.uniq(newList)
        if (uniqedNewList.length > 5) {
          uniqedNewList = uniqedNewList.slice(0, 5)
        }
        this.historyList = uniqedNewList
        localStorage.setItem('provinceSearchHistory', JSON.stringify(uniqedNewList))
      },
      onSearch(v) {
        this.provinceData = ALLPROVINCE.filter((item) => {
          return item.province.indexOf(v) !== -1
        })
      },
      closeModal() {
        document.removeEventListener("backbutton", this.closeModal, false);
        this.$store.dispatch('toggleNavBar', true)
        this.modalIsShow = false
      },
      getAreaList() {
        Httpservice.get(Config.url.provinceUrl).then((res) => {
          ALLPROVINCE = res
          this.provinceData = res
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    computed: {},
    created() {
      this.getAreaList()
      this.historyList = localStorage.getItem('provinceSearchHistory')
        ? JSON.parse(localStorage.getItem('provinceSearchHistory'))
        : []
    },
    watch: {},
  }
</script>
<style scoped lang="scss">
  .location-wrap {
    text-align: right;
    position: relative;
    padding-right: .2rem;
    height: 0.78rem;
    line-height: 0.78rem;

    img {
      width: .38rem;
      height: .38rem;
      vertical-align: middle;
    }

    span {
      color: #58689D;
      vertical-align: middle;
    }
  }

  .modal {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    background: #061027;
    z-index: 502;

    /*.search-wrap {*/
    /*height: 5vh;*/
    /*}*/

    .history-list {
      .history-list-item-wrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;

        span {
          display: block;
          padding: .1rem .4rem;
          margin: 5px;
          vertical-align: middle;
          text-align: center;
          background-color: #212943;
          font-size: .28rem;
          border-radius: 3px;
        }
      }
    }

    .area-list {
      padding: 0 20px 30px 20px;
      color: #fff;
      font-size: .28rem;
    }

    ul, li {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .bordered {
      border-bottom: 1px solid #212943;
    }

  }
</style>
