import { request } from "../utils/request/request";

//第一层,权限列表
export function getFirstData() {
    return request('get', '/rights');
  }

//  删除第一层权限
export function deleteFirstData(id){
  return request('delete',`/rights/${id}`)
}
//删除第二层权限
export function deleteSecondData(id){
  return request('delete',`/children/${id}`)
}

// //更改grade=1
// export function patchFirstData(id,pagepermisson){
//   return request('patch',`/rights/${id}`,{pagepermisson})
// }
// //更改grade!=1
// export function patchSecondData(id,pagepermisson){
//   return request('patch',`/children/${id}`,{pagepermisson})
// }

//侧边栏列表
export function getMenuData() {
    return request('get', '/rights?_embed=children');
  }

