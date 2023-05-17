import React, { useState } from "react";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import SideMenu from "../../components/sandbox/SideMenu";
import TopHeader from "../../components/sandbox/TopHeader";
import { Route, Redirect } from "react-router-dom/cjs/react-router-dom";
import Home from "./Home/Home";
import UserList from "./UserManage/UserList";
import RoleList from "./RightManage/RoleList";
import RightList from "./RightManage/RightList";
import NoPermission from "./NoPermission/NoPermission";
import styles from "./index.module.scss";
import { Layout } from "antd";
const { Content } = Layout;

export default function NewsLayout() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className={styles.root}>
      <Layout>
        <SideMenu collapsed={collapsed}></SideMenu>
        <Layout>
          <TopHeader
            onShowChange={() => {
              setCollapsed(!collapsed);
              
            }}
          ></TopHeader>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 500,
              backgroundColor: "white",
            }}
          >
            <Switch>
              <Route path="/home" exact component={Home}></Route>
              <Route
                path="/user-manage/list"
                exact
                component={UserList}
              ></Route>
              <Route
                path="/right-manage/role/list"
                exact
                component={RoleList}
              ></Route>
              <Route
                path="/right-manage/right/list"
                exact
                component={RightList}
              ></Route>
              <Redirect from="/" to="/home" exact />
              <Route path="*" component={NoPermission}></Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
