<script type="text/babel">
  import {app,observer} from 'vco'
  const stores={
    member:'wechat/member'
  }
  @observer
  export default class extends app {
    constructor(){
      this.appStore.register(stores)
      this.storeApp = 'app.vue'
    }
    async onLaunch(){
      await this.appStore.store[stores.member].getMember()

    }
  }

</script>
<style rel="stylesheet/less">

</style>
