import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { withRouter } from "react-router-dom";

import { useHistory, useLocation } from "react-router-dom";
import { getMenuData } from "../../api";
import { mapMenuData } from "../../utils/sideutils";
const { Sider } = Layout;
// const { SubMenu}=Menu
// 新版Menu组件用法，items传items,考虑到后端数据，选用map遍历,考虑版本，用items
// function getItem(id, title, rightId, key, pagepermission, grade, chidren) {
//   return {
//     id,
//     title,
//     rightId,
//     key,

//     pagepermission,

//     grade,
//     chidren,
//   };
// }
// const items = [
//   getItem("1", "首页", null, "/home", "1", "1", []),
//   getItem("2", "用户管理", null, "/user-manage", "1", "1", [
//     getItem("3", "添加用户", "2", "/user-manage/add", null, "2"),
//     getItem("4", "删除用户", "2", "/user-manage/delete", null, "2"),
//     getItem("5", "修改用户", "2", "/user-manage/update", null, "2"),
//     getItem("6", "用户列表", "2", "/user-manage/list", "1", "2"),
//   ]),
//   getItem("7", "权限管理",null, "/right-manage", "1", "1",[
//     getItem("8", "角色列表", "7", "/right-manage/role/list", "1", "2"),
//     getItem("9", "权限列表", "7", "/right-manage/right/list", "1", "2"),
//     getItem("10", "修改角色", "7", "/right-manage/role/update", null, "2"),
//     getItem("11", "删除角色", "7", "/right-manage/role/delete", null, "2"),
//     getItem("12", "修改权限", "7", "/right-manage/right/update", null, "2"),
//     getItem("13", "删除权限", "7", "/right-manage/right/delete", null, "2"),
//   ]),
//   getItem("14", "新闻管理",null, "/news-manage", "1", "1",[
//     getItem("15", "新闻列表", "14", "/news-manage/list", null, "2"),
//     getItem("16", "撰写新闻", "14", "/news-manage/add", "1", "2"),
//     getItem("17", "新闻更新", "14", "/news-manage/update/:id", "1", "2"),
//     getItem("18", "新闻预览", "14", "/news-manage/preview/:id", "1", "2"),
//     getItem("19", "草稿箱", "14", "/news-manage/draft", "1", "2"),
//     getItem("20", "新闻分类", "14", "/news-manage/category", "1", "2"),
//   ]),
//   getItem("21", "审核管理",null, "/audit-manage", "1", "1",[
//     getItem("22", "审核新闻", "21", "/audit-manage/audit", "1", "2"),
//     getItem("23", "审核列表", "21", "/audit-manage/list", "1", "2"),
//   ]),
//   getItem("24", "发布管理",null, "/publish-manage", "1", "1",[
//     getItem("25", "待发布", "24", "/publish-manage/unpublished", "1", "2"),
//     getItem("26", "已发布", "24", "/publish-manage/published", "1", "2"),
//     getItem("27", "已下线", "24", "/publish-manage/sunset", "1", "2"),

//   ]),
// ];

function SideMenu(props) {
  // const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const [menu, setMenu] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectKeys] = useState([]);
  useEffect(() => {
    getMenuData().then((res) => {
      const datas = mapMenuData(res);
      console.log(datas);
      delete datas[0].children;
      setMenu(datas);
    },[]);
   
    const currentMenu = JSON.parse(
      window.localStorage.getItem("currentMenu") || "[]"
    );
    setOpenKeys(currentMenu);
  }, []);

  useEffect(() => {
    //当前选中
    const keys =
      JSON.parse(window.localStorage.getItem("currentSelectMenu")) ||
      location.pathname;
    setSelectKeys(keys);
  }, [location]);

  const menuClick = (menu) => {
    history.push(menu.key);
    const currentMenu = JSON.stringify([menu.keyPath[menu.keyPath.length - 1]]);
    window.localStorage.setItem("currentMenu", currentMenu);
  };

  // const [menu, setMenu] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:8080/rights?_embed=children").then((res) => {
  //     console.log(res);
  //   });
  // });

  return (
    <div>
      <Sider
        trigger={null}
        collapsible
        collapsed={props.collapsed}
        style={{ height: "100vh" }}
      >
        <div
          style={{
            fontSize: "18px",
            color: "white",
            height: "40px",
            lineHeight: "40px",
            margin: "10px 10px",
            backgroundColor: "gray",
            overflow: "hidden",
            textAlign:"center"
          }}
        >
          {props.collapsed ? " News" : "全球新闻发布管理系统"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          items={menu}
          onClick={menuClick}
          onOpenChange={(data) => setOpenKeys(data)}
        >
          {/* {items.map((item) => {
          if (item.children) {
            return (
              <SubMenu key={item.key} title={item.title} icon={item.icon}>
                {item.title}
              </SubMenu>
            );
          }
          return (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.title}
            </Menu.Item>
          );
        })} */}
        </Menu>
      </Sider>
    </div>
  );
}

export default withRouter(SideMenu);
