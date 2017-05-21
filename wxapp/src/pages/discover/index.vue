<template>
  <view>
    发现
    <input class="inputSearch" bindinput="bindinput" name="checkCode" type="number" placeholder="请输入核销码或者扫描二维码" value="{{props['discover/index'].code}}" />
    <view>
      <text>{{props['discover/index'].code}}</text>
    </view>
  </view>
</template>
<script type="text/babel">
  import {page, observer,inject} from 'vco'
  const stores = {
    discover:'discover/index'
  }
  @inject(stores)
  export default class extends page {
    state(){
      return {
        code:this.store[stores.discover].code
      }
    }
    bindinput(e){
      this.store[stores.discover].setCode(e.detail.value)
    }
    onShow(){
      this.store[stores.discover].delayCode()
    }
    onHide(){
      this.store[stores.discover].cleanCode()
    }

  }
</script>
<style>

</style>