
import wepy from 'wepy'
const baseUrl='https://www.uinav.com/api/public/v1'
var request=(partalUrl,data={},isPost=false)=>
  wepy.request({
        url:baseUrl+partalUrl,data,method:isPost?'POST':'GET'
    })

wepy.get=(partalUrl,data)=>request(partalUrl,data)
wepy.post=(partalUrl,data)=>request(partalUrl,data,true)

wepy.alert=function(str="获取数据失败",isok=false){
wepy.showToast({
    title:str,
    icon:isok?'success':'none',
    duration:1500
})
}
