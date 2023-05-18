import { request } from "../utils/request/request";

//侧边栏列表
export function getMenuData() {
    return request('get', '/rights?_embed=children');
  }