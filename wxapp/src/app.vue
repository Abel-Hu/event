<script type="text/babel">
  import {app, observer, inject} from 'vco'
  const stores = {
    member: 'wechat/member'
  }
  @inject(stores)
  export default class extends app {
    async onLaunch() {
      await this.store[stores.member].getMember()

    }
  }

</script>
<style rel="stylesheet/less">

</style>
