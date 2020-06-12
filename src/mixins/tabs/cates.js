import wepy from 'wepy';
export default class extends wepy.mixin{
    data={
        catesList:[],
        active:0,
        windowHeight:0,
        scrollTop:0
        
    }
    computed= {
        secondCate(){
           const second= this.catesList[this.active]||{}
           return second.children||[]
    }}
    methods={
        onChange({detail}){
            this.active=detail
            this.scrollTop=-!this.scrollTop
        },
        goToCate(cid){  
            wepy.navigateTo({
                url:`/pages/goods_list?cid=${cid}`
            })

        }
      
    }
    onLoad(){
        this.getCatesList()
        this.getWindowHeight()
    }
   async getCatesList(){
    const { data: res } = await wepy.get(
        '/categories'
      )
  
      if (res.meta.status === 200) {
        this.catesList = res.message;
        this.$apply()
      }else{
   return wepy.alert()
      }

    }
    async getWindowHeight(){
        const res=await wepy.getSystemInfo()
        try {
            this.windowHeight=res.windowHeight
            this.$apply()
        } catch (error) {
            wepy.alert('窗口适应失败，请重启小程序')
        }
     }


}