import React from "react";
import { Layout, Menu } from "antd";
import {withRouter} from 'react-router-dom'

// import { Sider, Menu } from "antd";
import {
  UserOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
// const { SubMenu}=Menu
// 新版Menu组件用法，items传items,考虑到后端数据，选用map遍历,考虑版本，用items
function getItem(label, key, icon, children, type) {
  return {
    label,
    key,
    icon,
    children,
    type,
  };
}
const items = [
  getItem("首页", "sub1", <UserOutlined />, [
    getItem(
      "Item 1",
      "g1",
      null,
      [getItem("Option 1", "1"), getItem("Option 2", "2")],
      "group"
    ),
    getItem(
      "Item 2",
      "g2",
      null,
      [getItem("Option 3", "/user-manage/list"), getItem("Option 4", "4")],
      "group"
    ),
  ]),
  getItem("Nav 2", "sub2", <AppstoreOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),
  ]),
  {
    type: "divider",
  },
  getItem("Navigation Three", "sub4", <SettingOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
  getItem(
    "Group",
    "grp",
    null,
    [getItem("Option 13", "13"), getItem("Option 14", "14")],
    "group"
  ),
];

// const items = [
//   { key: "11", title: "首页", icon: <UserOutlined /> },
//   {
//     key: "22",
//     title: "权限管理",
//     icon: <UserOutlined />,
//     children: [
//       {
//         key: "33",
//         title: "33",
//         icon: <UserOutlined />,
//       },
//       { key: "44", title: "44", icon: <UserOutlined /> },
//     ],
//   },
//   { key: "55", title: "55", icon: <UserOutlined /> },
//   { key: "66", title: "66", icon: <UserOutlined /> },
//   {
//     key: "77",
//     title: "77",
//     icon: <UserOutlined />,
//     children: [
//       { key: "88", title: "88", icon: <UserOutlined /> },
//       { key: "99", title: "99", icon: <UserOutlined /> },
//     ],
//   },
// ];

 function SideMenu(props) {
  // const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <Sider trigger={null} collapsible collapsed={props.collapsed}>
        <div
          style={{
            fontSize: "18px",
            color: "white",
            width: "180px",
            height: "40px",
            lineHeight: "40px",
            margin: "10px 10px",
            backgroundColor: "gray",
          }}
        >
          全球新闻发布管理系统
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
          onClick={(e)=>props.history.push(e.key)}
        />
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
      </Sider>
    </div>
  );
}

export default withRouter(SideMenu)