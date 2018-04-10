const fnMixins = {
  linkTo(path) {
    this.$router.push(path)
  },
}

export default {
  methods: fnMixins,
}
