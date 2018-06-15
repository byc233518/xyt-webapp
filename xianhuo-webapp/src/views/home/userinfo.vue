<template>
  <div>
    <divider class="m-t-50">基本信息</divider>
    <group>
      <x-input required title="姓名"
               v-model="userInfo.realName"
      ></x-input>
      <x-input required title="电 话"
               v-model="userInfo.tel"
               :max="11"
               is-type="china-mobile"
      ></x-input>
      <x-input title="年龄"
               placeholder="请填写年龄"
               v-model="userInfo.age"
      ></x-input>
    </group>
    <group title="性别">
      <radio :options="[{key: 1, value: '男'}, {key: 0, value: '女'}]" v-model="userInfo.sex"></radio>
    </group>
    <divider class="m-t-50">技能</divider>
    <multiselect
      v-model="userInfo.skills"
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
    <divider class="m-t-50">履历</divider>
    <group title="教育经历" class="p-20 p-t-1">
      <div>
        <x-textarea  v-model="userInfo.eduexperience" :rows=5></x-textarea>
      </div>
    </group>
    <group title="工作经历" class="p-20 p-t-1">
      <div>
        <x-textarea v-model="userInfo.resume" :rows=5  ></x-textarea>
      </div>
    </group>
    <x-button @click.native="submit" class="m-t-20 m-b-50">保存</x-button>
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
          realName: '',
          tel: '',
          skills: [],
          resume: '',
          eduexperience: '',
        },
        options: [
          { name: '技工类', code: '技工类' },
          { name: '餐饮类', code: '餐饮类' },
          { name: '工程类', code: '工程类' },
          { name: '服装类', code: '服装类' },
          { name: '汽修类', code: '汽修类' },
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
      submit() {
        this.saveUserInfo({
          openid: this.userInfo.openid,
          age: this.userInfo.age,
          sex: this.userInfo.sex,
          realName: this.userInfo.realName,
          tel: this.userInfo.tel,
          skills: this.userInfo.skills,
          resume: this.userInfo.resume,
          eduexperience: this.userInfo.eduexperience,
        }).then(() => {
          this.$vux.toast.show({
            text: '保存成功',
             type: 'success',
          })
        })
      },
    },
    created() {
      this.$vlf.getItem('wxUserInfo').then((res) => {
        this.getUserByOpenid(res.openid).then((userinfo) => {
          this.userInfo = _.assign({}, this.userInfo, userinfo[0])
          this.$vlf.setItem('wxUserInfo', userinfo[0])
          this.userInfo.realName = userinfo[0].nickname
        })
      })
    },
    mixins: [ApiMixins, FnMixins],
  }
</script>

<style lang="less" scoped>

</style>
