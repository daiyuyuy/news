import React, { useEffect, useState, useRef } from "react";
import { Table, Button, Switch } from "antd";
import { DeleteOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { getUserInfo, deleteUser } from "../../../api";
import { http } from "../../../utils/request/request";
import AddUser from "./AddUser";
import Modal from "antd/es/modal/Modal";
import UpdateUser from "./UpdateUser";

const { confirm } = Modal;
export default function RoleList() {
  const [userInfo, setUserInfo] = useState([]);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const addFormRef = useRef(null);
  const updateFormRef = useRef(null);
  useEffect(() => {
    getUserInfo().then((res) => {
      setUserInfo(res);
    });
  }, []);

  const columns = [
    {
      title: "区域",
      dataIndex: "region",
      render: (region) => (
        <div>
          <b>{region === "" ? "全球" : region}</b>
        </div>
      ),
    },
    {
      title: "角色名称",
      dataIndex: "role",
      render: (role) => role.roleName,
    },
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "用户状态",
      dataIndex: "roleState",
      render: (roleState, item) => (
        <Switch
          checked={roleState}
          disabled={item.default}
          onChange={() => handleChange(item)}
        ></Switch>
      ),
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <>
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              style={{ marginRight: "5px" }}
              onClick={() => {
                console.log(item);
                deleteUserInfo(item);
              }}
              disabled={item.default}
            ></Button>

            <Button
              type="primary"
              shape="circle"
              icon={<UnorderedListOutlined />}
              onClick={() => {
                setUpdateOpen(true);
               updateFormRef.current.setFieldsValue(item);
              }}
              disabled={item.default}
            ></Button>
          </>
        );
      },
    },
  ];
  const deleteUserInfo = (item) => {
    confirm({
      title: "你是否要删除这个角色",
      content: "真的要删除吗",
      onOk() {
        deleteUser(item.id);
        getUserInfo().then((res) => {
          setUserInfo(res);
        });
      },
      onCancel() {
        console.log(item);
      },
    });
  };

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setFormOpen(false);
  };
  const onUpdate = (values) => {
    console.log("Received values of form: ", values);
    setUpdateOpen(false);
  };

  const handleChange = (item) => {
    item.roleState = !item.roleState;
    setUserInfo([...userInfo], item.roleState);

    http.patch(`/users/${item.id}`, {
      roleState: item.roleState,
    });
    getUserInfo();
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setFormOpen(true);
        }}
      >
        添加用户
      </Button>

      <AddUser
        open={formOpen}
        ref={addFormRef}
        onCreate={onCreate}
        onCancel={() => {
          setFormOpen(false);
        }}
      />
      <UpdateUser
        open={updateOpen}
        ref={updateFormRef}
        onUpdate={onUpdate}
        onCancel={() => {
          setUpdateOpen(false);
        }}
      />

      <Table
        dataSource={userInfo}
        columns={columns}
        rowKey={(item) => item.id}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </div>
  );
}
