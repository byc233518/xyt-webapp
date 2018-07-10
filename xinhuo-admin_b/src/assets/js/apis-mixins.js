import axios from 'axios'

const DOMAIN = 'http://39.108.77.185:8081'

const ApiMixin = {
  handleReqError(req) {
    if (req.data.error) {
      // this.$vux.toast.show({
      //   type: 'text',
      //   text: req.data && req.data.error ? req.data.error : '未知错误',
      // })
    }
    return req.data.error
  },
  handleCatchError() {
    // this.$vux.toast.show({
    //   type: 'text',
    //   text: err.response && err.response.statusText ? err.response.statusText : '未知错误',
    // })
    return false
  },
  getResume(params = {}, pagenum = 1, rownum = 10) {
    return new Promise((resolve, reject) => {
			try {
				axios.post(`${DOMAIN}/xinhuo/resume/query?pagenum=${pagenum}&rownum=${rownum}`, params).then((res) => {
				  if (res) {
						resolve(res.data)
          } else {
						reject(res)
          }
        })
			} catch (err) {
				this.handleCatchError(err)
				reject(err)
			}
    })
  },
	getJobs(params = {}, pagenum = 1, rownum = 10) {
		return new Promise((resolve, reject) => {
			try {
				axios.post(`${DOMAIN}/xinhuo/job/query?pagenum=${pagenum}&rownum=${rownum}`, params).then((res) => {
					if (res) {
						resolve(res.data)
					} else {
						reject(res)
					}
				})
			} catch (err) {
				this.handleCatchError(err)
				reject(err)
			}
		})
	},
	addJob(params = {}) {
		return new Promise((resolve, reject) => {
			try {
				axios.post(`${DOMAIN}/xinhuo/job/insert`, params).then((res) => {
					if (res) {
						resolve(res.data)
					} else {
						reject(res)
					}
				})
			} catch (err) {
				this.handleCatchError(err)
				reject(err)
			}
		})
	},
	deleteJob(id) {
		return new Promise((resolve, reject) => {
			try {
				axios.post(`${DOMAIN}/xinhuo/job/delete?id=${id}`).then((res) => {
					if (res) {
						resolve(res.data)
					} else {
						reject(res)
					}
				})
			} catch (err) {
				this.handleCatchError(err)
				reject(err)
			}
		})
	},
}

export default {
  created() {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  },
  methods: ApiMixin,
}