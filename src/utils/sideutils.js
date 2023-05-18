import _ from "lodash";

import {
  HomeOutlined,
  UnlockOutlined,
  UserOutlined,
  TableOutlined,
  ReadOutlined,
  AuditOutlined,
} from "@ant-design/icons";
// import store from "../store";

// 递归生成动态菜单
export function mapMenuData(datas) {
  datas = _.cloneDeep(datas);
  return deepDatas(datas);
}
// 非侧边栏数据不进行渲染并根据当前用户的权限渲染菜单
// const isShowAside = item => {
//   const { loginReducer } = store.getState();
//   let rights = [];
//   if (loginReducer.userInfo) {
//     rights = loginReducer.userInfo[0].role.rights;
//   }
//   return item.pagepermisson === 1 && rights.includes(item.key);
// };

// const checkPagepermission = (item) => {
//   return item.pagepermission;
// };
// 递归处理数据
function deepDatas(datas) {
  return datas.map((item) => {
    const currentData = {
      ...item,
      icon: mapMenuIcon(item),
      label: item.title,
    };
    // fix console bug,rightId无法在Dom根组件渲染
    delete currentData.rightId;
    //     if (item.children?.length>0 && isShowAside(item)) {
    //       currentData.children = deepDatas(item.children);
    //     }
    //     return isShowAside(item) && currentData;
    if (item.children?.length > 0 ) {
      currentData.children = deepDatas(item.children);
    }
    return  currentData;
  });
}
// 根据菜单生成对应的 icon
function mapMenuIcon(menuItem) {
  switch (menuItem.title) {
    case "首页":
      return <HomeOutlined />;
    case "用户管理":
      return <UserOutlined />;
    case "权限管理":
      return <UnlockOutlined />;
    case "新闻管理":
      return <ReadOutlined />;
    case "审核管理":
      return <TableOutlined />;
    case "发布管理":
      return <AuditOutlined />;
    default:
      break;
  }
}
