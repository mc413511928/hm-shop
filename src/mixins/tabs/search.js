import wepy from 'wepy';
const KEY_WORLS_KEY = 'KEY_WOEDS'
export default class extends wepy.mixin {
  data = {
    value: '',
    suggestList: [],
    kwList: []
  }
  timer = 0
  methods = {
    onChange({
      detail
    }) {
      this.value = detail.trim()
      clearTimeout(this.timer)
      this.value && (this.timer = setTimeout(() => this.getSuggestList(), 700))
    },
    goToGoodsDetail(id) {
      wepy.navigateTo({
        url: `/pages/goods_detail/main?goods_id=${id}`
      });


    },
    goGoodsList(keyword) {
      this.goGoodsList(keyword);
    },
    onSearch() {
      if (this.value) {
        this.kwList = [...new Set([this.value, ...this.kwList])].slice(0, 10)
        wepy.setStorageSync(KEY_WORLS_KEY, this.kwList);
        this.goGoodsList(this.value)
      } else wepy.alert('请输入关键字！')

    },
    deletList() {
      wepy.removeStorageSync(KEY_WORLS_KEY)
      this.kwList = []
    },
   
    onCancel() {


    }
  }
  goGoodsList(keyword) {
    wepy.navigateTo({
      url: `/pages/goods_list?query=${ keyword }`
    })
  }
  computed = {
    isShowSuggestList() {
      return !!this.value

    }
  }
  onLoad() {

    this.kwList = wepy.getStorageSync(KEY_WORLS_KEY) || []


  }
  async getSuggestList() {
    const {
      value
    } = this
    const {
      data: res
    } = await wepy.get(
      '/goods/qsearch', {
        query: value
      }
    )

    if (res.meta.status === 200) {
      this.suggestList = res.message;
      this.$apply()
    } else {
      return wepy.alert()
    }
  }
}
