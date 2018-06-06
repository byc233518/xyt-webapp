/* eslint-disable */
const fnMixins = {
  linkTo(path) {
    this.$router.push(path)
  },
  urlParamToObj() {
    let fn = null
    let item = null
    let j = null
    let len = null
    let p = null
    let sear = null
    let u = null
    if (location.search) {
      u = location.search
    } else {
      u = location.href
      u = u.slice(0, u.indexOf('#'))
    }
    p = {}
    if (u.indexOf('?') !== -1) {
      sear = u.slice(u.indexOf('?') + 1).split('&')
      fn = (item) => {
        let s
        s = item.split('=')
        return p[s[0]] = s[1]
      }
      for (j = 0, len = sear.length; j < len; j++) {
        item = sear[j]
        fn(item)
      }
    }
    return p
  },
}

export default {
  methods: fnMixins,
}
