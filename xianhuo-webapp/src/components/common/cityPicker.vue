<template>
  <div>
    <div class="location-wrap">
      <i class="fa fa-location" @click="showModal"></i>
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
      <div class="container" ref="modal">
        <div ref="arealist">
          <div class="history-list">
            <div class="">
              <div class="p-l-30 ">最近搜索城市</div>
              <div class="history-list-item-wrap p-15">
                <span @click="areaOnChange($event)">全国</span>
                <span v-for="(item, key) in historyList"
                      @click="historyOnChange($event)"
                      :key="key">
                  {{item}}
                </span>
              </div>
            </div>
          </div>
          <div class="area-list">
            <ul v-for="(item, key) in cityData" :key="key">
              <div class="bordered p-t-20 p-b-20" :id=item.name ref=item.name>{{item.name}}</div>
              <li v-for="(city, key) in item.children" :key="key">
                <div class="bordered p-l-50 p-t-20 p-b-20" @click="cityOnChange($event)">
                  {{city.cityName}}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="letter-wrap">
          <ul>
            <li
              v-for="(item, key) in cityData"
              @click="linkTo(item.name)"
              @touchmove="showBigNumber($event)"
              @touchend="hideBigNumber($event)"
              :key="key"
            >
              {{item.name}}
            </li>
          </ul>
        </div>
        <div class="big-number" v-if="bigNumber">
          {{bigNumber}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ALLCITY from '../../assets/faker/city.json'

  export default {
    data: () => {
      return {
        location: '全国',
        modalIsShow: false,
        textKey: '',
        cityData: [],
        historyList: [],
        bigNumber: null,
      }
    },
    methods: {
      showModal() {
        this.modalIsShow = true
        this.$store.dispatch('toggleNavBar', false)
        document.addEventListener('backbutton', this.closeModal, false);
        console.log(this.$refs.modal)
        setTimeout(() => {
          this.$refs.modal.scrollTop = 0
        }, 10)
      },
      areaOnChange(e) {
        const value = e.target.textContent
        this.location = value
        this.$store.dispatch('updatePerformanceCity', value)
        this.modalIsShow = false
        this.updateHistoryList(value)
      },
      cityOnChange(e) {
        const value = e.target.textContent
        this.location = value
        this.$store.dispatch('updatePerformanceCity', value)
        this.modalIsShow = false
        this.updateHistoryList(value)
      },
      historyOnChange(e) {
        const value = e.target.textContent
        if (value.indexOf('大区') !== -1) {
          this.areaOnChange(e)
        } else {
          this.cityOnChange(e)
        }
      },
      updateHistoryList(value) {
        this.$store.dispatch('toggleNavBar', true)
        if (value === '全国') return
        const oldList = localStorage.getItem('citySearchHistory')
          ? JSON.parse(localStorage.getItem('citySearchHistory'))
          : []
        const newList = oldList
        newList.unshift(value)
        let uniqedNewList = _.uniq(newList)
        if (uniqedNewList.length > 5) {
          uniqedNewList = uniqedNewList.slice(0, 5)
        }
        this.historyList = uniqedNewList
        localStorage.setItem('citySearchHistory', JSON.stringify(uniqedNewList))
      },
      onSearch(v) {
        const res = ALLCITY.filter((item) => {
          return item.cityName.indexOf(v) !== -1
        })
        const ArrGroupByLetter = _.groupBy(res, 'firstLetter')
        const newArr = []
        _.forEach(ArrGroupByLetter, (item, key) => {
          const obj = {
            name: key,
            children: ArrGroupByLetter[key],
          }
          newArr.push(obj)
        })
        this.cityData = newArr
      },
      closeModal() {
        document.removeEventListener('backbutton', this.closeModal, false);
        this.$store.dispatch('toggleNavBar', true)
        this.modalIsShow = false
      },
      getCityList() {
        const ArrGroupByLetter = _.groupBy(ALLCITY, 'firstLetter')
        const newArr = []
        _.forEach(ArrGroupByLetter, (item, key) => {
          const obj = {
            name: key,
            children: ArrGroupByLetter[key],
          }
          newArr.push(obj)
        })
        this.cityData = newArr
      },
      linkTo(letter) {
        if (/[A-Z]/.test(letter)) {
          const ele = document.querySelector(`#${letter}`)
          const top = document.querySelector('#A').offsetTop || document.querySelector('#B').offsetTop
          this.$refs.modal.scrollTop = ele.offsetTop - top
        }
      },
      showBigNumber(event) {
        const realTarget = document.elementFromPoint(
          event.changedTouches[0].clientX, event.changedTouches[0].clientY)
        if (realTarget && realTarget.innerText) {
          this.bigNumber = realTarget.innerText
          this.linkTo(realTarget.innerText)
        }
      },
      hideBigNumber(event) {
        console.log(event)
        this.bigNumber = null
      },
    },
    computed: {},
    created() {
      this.getCityList()
      this.historyList = localStorage.getItem('citySearchHistory')
        ? JSON.parse(localStorage.getItem('citySearchHistory'))
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
      color: #b3b4b7;
      vertical-align: middle;
    }
  }

  .modal {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    background: #fff;
    z-index: 502;

    .search-wrap {
      z-index: 502;
    }

    .container {
      height: 95vh;
      overflow-y: scroll;
      z-index: 505;
    }

    .history-list {
      .history-list-item-wrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        span {
          display: block;
          padding: .1rem .4rem;
          margin: 5px;
          vertical-align: middle;
          text-align: center;
          background-color: #b3b4b7;
          font-size: .28rem;
          border-radius: 3px;
        }
      }
    }

    .area-list {
      padding: 0 20px 30px 20px;
      color: #666;
      font-size: .28rem;
    }

    ul, li {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .bordered {
      border-bottom: 1px solid #b3b4b7;
    }

    .letter-wrap {
      position: fixed;
      right: 0;
      top: 10vh;
      z-index: 505;

      li {
        padding: .03rem .3rem .03rem 1rem;
        z-index: 505;
      }
    }

    .big-number {
      position: fixed;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
      text-align: center;
      font-size: .8rem;
      border-radius: .3rem;
      background: rgba(0, 0, 0, 0.35);
    }

  }
</style>
