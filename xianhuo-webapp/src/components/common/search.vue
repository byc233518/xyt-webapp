<template>
  <div class="search-box">
    <div class="location-wrap" @click="showModal">
      <i class="icon"></i>
      <span>{{location}}</span>
    </div>
    <div class="modal" v-show="modalIsShow">
      <div class="search-wrap">
        <Search @on-submit="onSearch"
                @on-change="onSearch"
                :auto-fixed="false"
                v-model="textKey"
                auto-scroll-to-top top="46px"
                @on-cancel="onCancel">
        </Search>
      </div>
      <div style="height: 95vh; overflow-y: scroll;" ref="modal">
        <div class="history-list">
          <div class="">
            <div class="p-l-30 ">最近搜索</div>
            <div class="history-list-item-wrap p-15">
              <span v-for="(item, key) in historyList" @click="historyChooseItem(item)">{{item}}</span>
            </div>
          </div>
        </div>
        <div class="area-list">
          <ul >
            <li v-for="(item, key) in vtypesData">
              <div class="bordered p-l-50 p-t-20 p-b-20" @click="chooseItem(item)">{{item.vType}} ({{item.powerType}})</div>
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
      location: '选择车型',
      modalIsShow: false,
      textKey: '',
      vtypesData: [],
      historyList: [],

      allVtypesData: [],
    }),
    methods: {
      cloneData(val) {
        return JSON.parse(JSON.stringify(val));
      },
      showModal() {
        this.modalIsShow = true

        this.$store.dispatch('toggleNavBar', false)
        document.addEventListener("backbutton", this.closeModal, false);
        console.log(this.$refs.modal)
        setTimeout(() => {
          this.$refs.modal.scrollTop = 0
        }, 10)
      },
      historyChooseItem (itemstr) {
        let arr = itemstr.replace(')', '').split('(');
        let item = {vType: arr[0], powerType: arr[1]};
        this.chooseItem(item);
      },
      chooseItem (item) {
        this.$store.dispatch('toggleNavBar', true)
        this.updateHistoryList(item.vType + '(' + item.powerType + ')')
        this.location = item.vType
        this.$emit('fun', item);
        this.modalIsShow = false
      },
      updateHistoryList(value) {
        const oldList = localStorage.getItem('vtypeHistory')
          ? JSON.parse(localStorage.getItem('vtypeHistory'))
          : []
        let newList = oldList
        newList.unshift(value)
        let uniqedNewList = _.uniq(newList)
        if (uniqedNewList.length > 6) {
          uniqedNewList = uniqedNewList.slice(0, 6)
        }
        this.historyList = uniqedNewList
        localStorage.setItem('vtypeHistory', JSON.stringify(uniqedNewList))
      },
      onSearch(v) {
        let val = v.toUpperCase()
        const res = this.allVtypesData.filter((item) => {
          return item.vType.indexOf(val) !== -1
        })
        this.vtypesData = res
      },
      onCancel() {
        this.$store.dispatch('toggleNavBar', true)
        this.modalIsShow = false
      },
      closeModal() {
        document.removeEventListener("backbutton", this.closeModal, false);
        this.$store.dispatch('toggleNavBar', true)
        this.modalIsShow = false
      },
    },
    computed: {},
    created () {
      this.historyList = localStorage.getItem('vtypeHistory')
        ? JSON.parse(localStorage.getItem('vtypeHistory'))
        : []
    },
    watch: {
      modalIsShow (val) {
        if (val) {
          this.vtypesData = this.cloneData(this.$store.state.vTypes)
          this.allVtypesData = this.cloneData(this.$store.state.vTypes)
        }
      }
    },

  }
</script>
<style scoped lang="scss">
  .search-box{
    width: 100%;
    background-color: #1F223B;;
    .location-wrap {
      width: 100%;
      display: flex;
      height: 0.6rem;
      line-height: 0.6rem;
      align-items: center;
      padding-left: .1rem;
      .icon{
        display: block;
        width: .3rem;
        height: .3rem;
        margin-right: .1rem;
        background-image: url("../../assets/imgs/searchicon2x.png");
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
      }
      span {
        display: block;
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
  }

</style>
