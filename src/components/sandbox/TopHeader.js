import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
// import { useState } from "react";

const { Header } = Layout;
const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
       超级管理员
      </a>
    ),
  },

  {
    key: "4",
    danger: true,
    label: "退出",
  },
];

export default function TopHeader({ collapsed, onShowChange }) {
  // const [collapsed, setCollapsed] = useState(false);
  return (
    <div>
      <Header style={{ padding: 0, backgroundColor: "white" }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onShowChange}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <div style={{float:"right",marginRight:"10px"}}>
        <Dropdown menu={{ items }} >
          <Space>
            欢迎亲爱的admin回来
            <DownOutlined />
          </Space>
        </Dropdown>
        </div>
      </Header>
    </div>
  );
}
