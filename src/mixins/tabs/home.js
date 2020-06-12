import wepy from 'wepy';
export default class extends wepy.mixin{
  
    data = {
      swiperList: [],
      cateList:[],
      floorData:[]
    };
   
    onLoad() {
      this.getSwiperDate();
      this.getCateItems()
      this.getFloorDate()
    }
    methods={
     
      
      goGoodsList(url){
        console.log('123');
        wepy.navigateTo({
          url
        })
      }
    }
  //   获取轮播图数据项
    async getSwiperDate() {
      const { data: res } = await wepy.get(
        '/home/swiperdata'
      )
  
      if (res.meta.status === 200) {
        this.swiperList = res.message;
        this.$apply()
      }else{
   return wepy.alert()
      }
    }
  //   获取分类数据项
   async getCateItems(){
       const { data: res } = await wepy.get(
        '/home/catitems'
      )
  
      
       if (res.meta.status === 200) {
        this.cateList = res.message;
        this.$apply()
      }else{
           return wepy.alert()
  
      }
  
  } 
  async getFloorDate(){
    const { data: res } = await wepy.get(
      '/home/floordata'
    )
    console.log(res);
    
     if (res.meta.status === 200) {
      this.floorData = res.message;
      this.$apply()
    }else{
         return wepy.alert()

    }

  } 
}