<template>
  <view>
    <view class="userInfo">
      <view class="avatar">
        <image class="img" src="{{props['wechat/member'].member.avatarUrl}}"></image>
      </view>
      <view class="name">{{props['wechat/member'].member.nickName}}</view>
    </view>
  </view>
</template>
<script type="text/babel">
  import {page, observer,inject} from 'vco'
  const stores = {
    member: 'wechat/member'
  }
  @inject(stores)
  export default class extends page {
    state(){
      return {
        member:this.store[stores.member].member
      }
    }
    async onLoad() {
      //await this.store[stores.member].getMember()
    }
  }
</script>
<style>@import "./me.wxss";</style>