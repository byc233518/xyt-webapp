<!--eslint-disable-->
<template>
  <!--<li>-->
  <!--<div>-->
  <!--{{model.name}}-->
  <!--</div>-->
  <!--<ul>-->
  <!--<item-->
  <!--v-for="(model, key) in model.children"-->
  <!--:model="model"-->
  <!--:key="key">-->
  <!--</item>-->
  <!--</ul>-->
  <!--</li>-->


  <table cellpadding="2" cellspacing="0" width="100%" v-if="model">
    <tr>
      <td v-if="model.name" :colspan="model.children ? model.children.length : 1" rowspan="1">
        <span>{{model.name}}</span>
      </td>
      <td v-if="model.children">
        <item v-for='(model, key) in model.children' :model='model' :key="key">
        </item>
      </td>
    </tr>
  </table>
</template>
<script type="text/babel">

  export default {
    name: 'item',
    props: {
      model: Object,
    },
    data() {
      return {}
    },
    computed: {},
    methods: {},
  }
</script>
<style>
  td {
    margin: 0;
    padding: 0;
    border: 1px solid #f00;
  }
</style>
