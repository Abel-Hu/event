<template>
    <view>
        <view class="userInfo">
            <view class="avatar"><image class="img" src="{{member.avatarUrl}}"></image></view>
            <view class="name">{{member.nickName}}</view>
        </view>
    </view>
</template>
<script type="text/babel">
  import vco from 'vco'
  import {observer, inject} from 'utils/mobx-wechat'
  const stores={
    member:'wechat/member'
  }
  @inject(stores)
  @observer
  export default class extends vco.page {
    state(){
      return{
        member:this.store[stores.member].member
      }
    }
  }
</script>
<style>@import "./me.wxss";</style>