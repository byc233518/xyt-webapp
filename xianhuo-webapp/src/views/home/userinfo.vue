<template>
  <div>
    <divider class="m-t-50">基本信息</divider>
    <group>
      <cell title="姓名" :value="userInfo.nickname"></cell>
      <cell title="性别" :value="userInfo.sex === 1 ? '男' : '女'"></cell>
      <x-input title="年龄" placeholder="请填写年龄" v-model=" userInfo.age"></x-input>
      <x-input title="技能" placeholder="请填写技能" v-model=" userInfo.skill"></x-input>
    </group>
    <divider class="m-t-50">技能</divider>
    <multiselect
      v-model="value"
      tag-placeholder="增加新技能"
      placeholder="可选择亦可输入后新增"
      selectLabel="点击选择"
      selectedLabel="已选中"
      deselectLabel="点击删除"
      deselectGroupLabel="点击删除整组"
      label="name" track-by="code"
      :options="options"
      :multiple="true"
      :taggable="true"
      @tag="addTag"
    ></multiselect>
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  import ApiMixins from '../../assets/js/apiMixin'
  import FnMixins from '../../assets/js/fnMixin'

  export default {
    components: {
      Multiselect,
    },
    data() {
      return {
        userInfo: {
          age: 60,
          skill: 'test, test1',
        },
        value: [
          { name: 'Javascript', code: 'js' },
        ],
        options: [
          { name: '', code: 'vu' },
          { name: 'Javascript', code: 'js' },
          { name: 'Open Source', code: 'os' },
        ],
      }
    },
    computed: {},
    methods: {
      addTag(newTag) {
        const tag = {
          name: newTag,
          code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000)),
        }
        this.options.push(tag)
        this.value.push(tag)
      },
    },
    created() {
      this.$vlf.getItem('wxUserInfo').then((res) => {
        this.userInfo = _.assign({}, this.userInfo, res)
      })
    },
    mixins: [ApiMixins, FnMixins],
  }
</script>

<style lang="less" scoped>

</style>
