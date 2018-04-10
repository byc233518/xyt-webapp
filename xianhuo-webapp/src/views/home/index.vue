<template>
  <div>
    <div>111</div>
    <!--<table>-->
    <!--<tr>-->
    <!--<td>-->
    <!--{{treeData.name}}-->
    <!--</td>-->
    <!--<td>-->
    <!--<item-->
    <!--v-for="(item, key) in treeData.children"-->
    <!--:model="item.children"-->
    <!--:key="key"></item>-->
    <!--</td>-->
    <!--</tr>-->
    <!--</table>-->
    <div id="demo">
      <item
        class="item"
        :model="treeData">
      </item>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import {Tabbar, TabbarItem} from 'vux'
  import item from './tree.vue'

  export default {
    name: 'App',
    components: {
      Tabbar,
      TabbarItem,
      item,
    },
    data() {
      return {
        treeData: {
          name: '1级',
          children: [
            {name: '2级'},
            {
              name: '2级',
              children: [
                {name: '5级'},
                {
                  name: '5级',
                  children: [
                    {name: '6级'},
                    {name: '6级'},
                    {name: '6级'},
                    {name: '6级'},
                    {name: '6级'},
                  ],
                },
              ],
            },
            {
              name: '2级',
              children: [
                {
                  name: '3级',
                  children: [
                    {name: '4级'},
                    {
                      name: '4级',
                      children: [
                        {name: '5级'},
                        {
                          name: '5级',
                          children: [
                            {name: '6级'},
                            {name: '6级'},
                            {name: '6级'},
                            {name: '6级'},
                            {
                              name: '6级',
                              children: [
                                {name: '4级'},
                                {
                                  name: '4级',
                                  children: [
                                    {name: '5级'},
                                    {
                                      name: '5级',
                                      children: [
                                        {name: '6级'},
                                        {name: '6级'},
                                        {name: '6级'},
                                        {name: '6级'},
                                        {name: '6级'},
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      }
    },
  }
</script>

<style lang="less" scoped>

</style>
