<template>
  <view>
    发现
    <input class="inputSearch" bindinput="bindinput" name="checkCode" type="number" placeholder="请输入核销码或者扫描二维码" value="{{code}}" />
    <view>
      <text>{{code}}</text>
    </view>
  </view>
</template>
<script type="text/babel">
  import {page, observer} from 'vco'
  const stores = {
    discover:'discover/index'
  }
  @observer
  export default class extends page {
    constructor(){
      this.storeApp = 'discover.vue'
      this.appStore.register(stores)
    }
    state(){
      return {
        code:this.appStore.store[stores.discover].code
      }
    }
    bindinput(e){
      //this.setData({code:e.detail.value})
      this.appStore.store[stores.discover].setCode(e.detail.value)
    }
    onLoad(){
      this.appStore.store[stores.discover].delayCode()
    }

  }
</script>
<style>

</style>