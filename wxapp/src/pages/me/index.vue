<template>
  <view>
    <view class="userInfo">
      <view class="avatar">
        <image class="img" src="{{member.avatarUrl}}"></image>
      </view>
      <view class="name">{{member.nickName}}</view>
    </view>
  </view>
</template>
<script type="text/babel">
  import {page, observer} from 'vco'
  const stores = {
    member: 'wechat/member'
  }
  @observer
  export default class extends page {
    constructor() {
      this.appStore.register(stores)
      this.storeApp = 'me.vue'
    }
    state() {
      return {
        member: this.appStore.store[stores.member].member
      }
    }

    async onLoad() {
      //await this.appStore.store[stores.member].getMember()
    }
  }
</script>
<style>@import "./me.wxss";</style>