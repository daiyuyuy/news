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

//超级用户列表（角色名称）
export function getSuperUser(){
  return request('get','/roles')
}
export function deleteSuperUser(id){
  return request('delete',`/roles/${id}`)
}
//更新选中的树型权限
// export function patchCurrentList(rights){
//   return request('patch','/roles',{rights})
// }

//获取用户名称(联合role，按照roleId拼对象)
export function getUserInfo(){
  return request('get','/users?_expand=role')
  // return request('get','/users')
}

//删除用户
export function deleteUser(id){
  return request('delete',`/users/${id}`)
}
//获取区域
export function getUserRegion(){
  return request('get','/regions')
}
//获取用户
export function getUser(){
  return request('get','/users')
}
