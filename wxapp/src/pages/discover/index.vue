<template>
    <view>
        发现
    </view>
</template>
<script type="text/babel">
  import vco from 'vco'
  import {observer, inject} from 'utils/mobx-wechat'
  const stores = {}
  @inject(stores)
  @observer
  export default class extends vco.page {

  }
</script>
<style>

</style>