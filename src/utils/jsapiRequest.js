import dd from '@ali/gdt-jsapi';
import startRequest from '@ali/gdt-jsapi/startRequest';

export async function baseRequest(url, params, showLoading = true) {
  showLoading && dd.showLoading();
  return startRequest({ apiName: url, params }).then((res)=>{
    return res;
  }).catch((res)=>{
    dd.alert({
      message: JSON.stringify(res),
      title: '接口返回错误'
    })
  }).finally(()=>{
    dd.hideLoading();
  })
}

// 文档库列表
export async function getLibsList(params) {
  const reqBody = await baseRequest('/govdoc/files/library', params);
  return reqBody;
}
