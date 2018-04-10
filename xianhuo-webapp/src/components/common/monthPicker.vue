<template>
  <div class="date-wrap">
    <img src="../../assets/imgs/日期@2x.png" alt="">
    <span>{{date}}</span>
    <input type="month"
           @change="dateOnChange"
           ref="date"
           id="date">
  </div>
</template>
<style scoped lang="scss">
  .date-wrap {
    position: relative;
    padding-left: .2rem;
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

  #date {
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    height: 75%;
    color: transparent;
    background: transparent;
    border: transparent;
    outline: transparent;
    z-index: 100;
  }

  ::-webkit-calendar-picker-indicator,
  ::-webkit-datetime-edit-year-field,
  ::-webkit-datetime-edit-month-field,
  ::-webkit-date-and-time-value,
  ::-webkit-inner-spin-button,
  ::-webkit-datetime-edit-text {
    background: transparent;
  }
</style>
<script>
  export default {
    data: () => ({
    }),
    methods: {
      dateOnChange(e) {
        const value = `${e.target.value}`
        this.$store.dispatch('updateDate', value)
      },
    },
    computed: {
      date() {
        return this.$store.getters.getDate
      }
    },
    created() {
      const year = new Date().getFullYear()
      const month = new Date().getMonth() + 1
      this.$store.dispatch('updateDate', `${year}-${month}`)
    },
  }
</script>
