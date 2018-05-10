import axois from 'axios'
// import urlencode from 'urlencode'

const isDebug = false
const domain = isDebug ? 'http://localhost:9000' : 'http://39.108.77.185:9000'
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
  async getListWithParams(queryString) {
    this.$vux.loading.show({
      text: '数据加载中...',
    })
    try {
      // this.handleReqError(req)
      const res = await axois.get(`${domain}/list-with-params?${queryString}`)
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
  // async getWxUserInfo() {
  //   try {
  //     // this.handleReqError(req)
  //     const res = await axois.get(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx185463cc92b5ca47&redirect_uri=${urlencode(location.href)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`)
  //     return res.data
  //   } catch (err) {
  //     // this.handleCatchError(err)
  //     return err
  //   }
  // },
}

export default {
  methods: apiMixins,
}
