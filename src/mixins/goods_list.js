import wepy from 'wepy';
export default class extends wepy.mixin {
  data = {
    pageSize: 10,
    pageNumber: 0,
    query: '',
    cid: '',
    goodslist: [],
    total: 1



  }
  isLoading = false
  computed = {
    canLoad() {
      return this.goodslist.length < this.total

    }

  }
  methods = {
    goGoodsDetail(id) {
      wepy.navigateTo({
        url: `/pages/goods_detail/main?goods_id=${id}`
      })

    }

  }
  onLoad({
    cid = '',
    query = ''
  }) {
    this.cid = cid,
      this.query = query
      this.getGoodsList()
      console.log('小程序开启了');
      

  }
  onReachBottom() {
    if (this.canLoad && !this.isLoading) {
      this.pageNumber++
      this.getGoodsList()
    }
  }
  onPullDownRefresh() {
    // 初始化必要的字段值
    this.pageNumber = 1
    this.goodslist = []


    // 重新发起数据请求
    this.getGoodsList(() =>
      wepy.stopPullDownRefresh()
    )

  }
  async getGoodsList(callback) {
    this.isLoading = true
    const {
      cid,
      query,
      pageSize: pagesize,
      pageNumber: pagenum
    } = this;
    const { data: res } = await wepy.get('/goods/search', { cid, query, pagesize, pagenum });
   

    if (res.meta.status !== 200) {
      return wepy.baseToast()
    }

    this.goodslist = this.goodslist.concat(res.message.goods)
    //测试
   
    this.total = res.message.total
    this.$apply()
    callback&&callback()
    this.isLoading = false
  }

}
