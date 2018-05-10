<template>
  <div>
    <div>
      <h3 class="tc fz-50 m-t-50">闲活邀请您发布职位<br/>免费招人才</h3>
    </div>
    <div class="p-20">
      <group title="">
        <x-input required title="电 话" v-model="mobilephone" :max="11" is-type="china-mobile"></x-input>
        <x-input required title="职位名称" v-model="username"></x-input>
        <x-input required title="学历要求" v-model="username"></x-input>
        <x-input required title="工作时间" v-model="username"></x-input>
        <x-input required title="所在城市" v-model="username"></x-input>
        <x-input required title="工作地点" v-model="username"></x-input>
        <x-input required title="招聘人数" v-model="username"></x-input>
        <x-input required title="薪  资" v-model="username"></x-input>
      </group>
      <group>
        <x-textarea title="职位介绍" v-model="desc" :rows=10></x-textarea>
      </group>
      <group>
        <x-textarea title="职位要求" v-model="desc" :rows=10></x-textarea>
      </group>
      <x-button @click.native="submit" class="m-t-20">确认发布</x-button>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        username: null,
        mobilephone: null,
        desc: null,
      }
    },
    methods: {
      submit() {
        const _this = this
        this.$vux.confirm.show({
          content: '确认信息真实无误并发布?',
          onCancel () {
            console.log(this) // 非当前 vm
            console.log(_this) // 当前 vm
          },
          onConfirm () {}
        })
      },
    }
  }
</script>

<style lang="less" scoped>

</style>
