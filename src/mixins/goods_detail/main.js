import wepy from 'wepy';
export default class extends wepy.mixin{
    data={
        id:'',
        goodsDetail:{}
    }
    onLoad(options){
        this.id=options.goods_id;
        this.getGoodsInfo()
    }
   async getGoodsInfo(){
    
       const { data: res } = await wepy.get(
        '/goods/detail',{goods_id:this.id}
      )
  
      if (res.meta.status === 200) {
        this.goodsDetail = res.message;
        this.$apply()
      }else{
   return wepy.alert()
      }
    }
}