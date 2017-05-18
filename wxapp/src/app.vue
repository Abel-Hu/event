<script type="text/babel">
  import vco from 'vco'
  import {observer, inject} from 'utils/mobx-wechat'
  const stores={
    member:'wechat/member'
  }
  @inject(stores)
  @observer
  export default class extends vco.app {
    async onLaunch(){
      await this.store[stores.member].getMember()
    }
  }

</script>
<style rel="stylesheet/less">

</style>
