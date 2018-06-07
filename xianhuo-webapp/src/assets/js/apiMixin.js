import axois from 'axios'

const isDebug = false
const domain = isDebug ? 'http://localhost:8360' : 'http://wx.ngrok.xetong.cn'
const apiMixins = {
  handleReqError(req) {
    this.$vux.loading.hide()
    if (req.data.error) {
      // this.$Message.error(`${req.data && req.data.error ? req.data.error : '未知错误'}`)
    }
    return req.data.error
  },
  handleCatchError() {
    this.$vux.loading.hide()
    // this.$Message.error(`${err.response
    // && err.response.statusText ? err.response.statusText : '未知错误'}`)
    return false
  },
  async getList() {
    this.$vux.loading.show({
      text: '数据加载中...',
    })
    try {
      // this.handleReqError(req)
      const res = await axois.get(`${domain}/list`)
      return res.data
    } catch (err) {
      // this.handleCatchError(err)
      return err
    }
  },
  async getListWithParams(params) {
    console.log(params)
    this.$vux.loading.show({
      text: '数据加载中...',
    })
    try {
      // this.handleReqError(req)
      const res = await axois.post(`${domain}/list-with-params`, params)
      return res.data
    } catch (err) {
      // this.handleCatchError(err)
      return err
    }
  },
  async getDetailById(id) {
    this.$vux.loading.show({
      text: '数据加载中...',
    })
    try {
      // this.handleReqError(req)
      const res = await axois.get(`${domain}/list/${id}`)
      return res.data
    } catch (err) {
      // this.handleCatchError(err)
      return err
    }
  },
  async getCompanys() {
    // this.$vux.loading.show({
    //   text: '数据加载中...',
    // })
    try {
      // this.handleReqError(req)
      const res = await axois.get(`${domain}/company`)
      return res.data
    } catch (err) {
      // this.handleCatchError(err)
      return err
    }
  },
  async getCompanyByName(name) {
    this.$vux.loading.show({
      text: '数据加载中...',
    })
    try {
      // this.handleReqError(req)
      const res = await axois.get(`${domain}/company/${name}`)
      return res.data
    } catch (err) {
      // this.handleCatchError(err)
      return err
    }
  },
  async address2location(city, address) {
    this.$vux.loading.show({
      text: '数据加载中...',
    })
    try {
      // this.handleReqError(req)
      const res = await axois.get(`http://api.map.baidu.com/geocoder/v2/?ak=KMVMX2ByWjGDolZ1M8SYTmHQ&output=json&address=${address}&city=${city}`)
      return res.data
    } catch (err) {
      // this.handleCatchError(err)
      return err
    }
  },
  async saveNewJob(params) {
    this.$vux.loading.show({
      text: '数据加载中...',
    })
    try {
      // this.handleReqError(req)
      const res = await axois.post(`${domain}/list/`, params)
      return res.data
    } catch (err) {
      // this.handleCatchError(err)
      return err
    }
  },
  async saveNewCompany(params) {
    this.$vux.loading.show({
      text: '数据加载中...',
    })
    try {
      // this.handleReqError(req)
      const res = await axois.post(`${domain}/company/`, params)
      return res.data
    } catch (err) {
      // this.handleCatchError(err)
      return err
    }
  },
  async delJob(id) {
    this.$vux.loading.show({
      text: '数据加载中...',
    })
    try {
      // this.handleReqError(req)
      const res = await axois.delete(`${domain}/list/${id}`)
      return res.data
    } catch (err) {
      // this.handleCatchError(err)
      return err
    }
  },
  async getWxUserDetail(params) {
    try {
      // this.handleReqError(req)
      const res = await axois.post(`${domain}/getWxUserInfo/`, params)
      console.log(res)
      return res.data
    } catch (err) {
      // this.handleCatchError(err)
      return err
    }
  },
  async saveFeedBack(params) {
    try {
      const res = await axois.post(`${domain}/feedback/`, params)
      console.log(res)
      return res.data
    } catch (err) {
      // this.handleCatchError(err)
      return err
    }
  },
  async saveJobRequest(params) {
    try {
      const res = await axois.post(`${domain}/savejobrequest/`, params)
      console.log(res)
      return res.data
    } catch (err) {
      // this.handleCatchError(err)
      return err
    }
  },
}

export default {
  methods: apiMixins,
}
