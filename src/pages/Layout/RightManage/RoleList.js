
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Tree } from "antd";
import { deleteSuperUser, getMenuData, getSuperUser } from "../../../api";
import { DeleteOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { http } from "../../../utils/request/request";

const { confirm } = Modal;
export default function UserList() {
  //展示权限
  const [superUser, setSuperUser] = useState();
  const [isModalShow, setIsModalShow] = useState(false);
  // const [dataMenu, setDataMenu] = useState([]);
  //弹出框内容是侧边栏菜单的数据
  const [rightsList, setRightsList] = useState([]);
  //树型组件弹出框数据(选不选中的数据)
  const [currentList, setCurrentList] = useState([]);
  const [currentId, setCurrentId] = useState();

  useEffect(() => {
    getSuperUser().then((res) => {
      setSuperUser(res);
      // res.map((item) => {
      //   return ;
      // });
    });
  }, []);
  useEffect(() => {
    getMenuData().then((res) => {
      setRightsList(res);
    });
  });
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => <div><b>{id}</b></div>,
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
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
              onClick={() => showConfirm(item)}
            ></Button>

            <Button
              type="primary"
              shape="circle"
              icon={<UnorderedListOutlined />}
              onClick={() => {
                setIsModalShow(true);
                console.log(item.rights);
                setCurrentList(item.rights);
                setCurrentId(item.id);
              }}
            ></Button>
          </>
        );
      },
    },
  ];

  const showConfirm = (item) => {
    confirm({
      title: "Do you Want to delete these items?",
      content: "Some descriptions",
      onOk() {
        deleteAuthority(item);
      },
      onCancel() {
        console.log(item);
      },
    });
  };
  const deleteAuthority = (item) => {
    //     dataSource.filter((x) => {
    //       return x.id !== item.id;
    //     })
    //   );
    deleteSuperUser(item.id);
    // setDataSource([...dataSource])
    // getMenuData().then((res) => {
    //   setDataSource(res);
    // });
    //调用渲染菜单。
    getSuperUser();
  };
  const handleOk = () => {
    //这段代码看起来好混乱，大致是说，遍历，id和当前点击的id相同的，
    //更新rights，由于原方法定义的状态太多，
    //所以采取了更新接口，调接口重新渲染页面的方法
    // currentList.map((item) => {
    //   if (item.id === currentId) {
    //     return {
    //       ...item,
    //       rightsList: currentList,
    //     };
    //   }
    //   return item;
    // })

    http.patch(`/roles/${currentId}`, {
      rights: currentList,
    });
    getSuperUser().then((res) => {
      console.log(res);
      setSuperUser(res);
    });
    setIsModalShow(false);

    // setSuperUser();
  };
  const handleCancel = () => {
    setIsModalShow(false);
  };

  // const onSelect = (selectedKeys, info) => {
  //   console.log("selected", selectedKeys, info);
  // };
  const onCheck = (checkedKeys) => {
    console.log("onCheck", checkedKeys);
    setCurrentList(checkedKeys);
  };

  return (
    <div>
      <Table
        dataSource={superUser}
        columns={columns}
        rowKey={(item) => item.id}
      ></Table>

      <Modal
        title="权限分配"
        open={isModalShow}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tree
          checkable
          // defaultExpandedKeys={currentList}
          // defaultSelectedKeys={currentList}
          checkedKeys={currentList}
          // checkStrictly={true}
          onCheck={onCheck}
          treeData={rightsList}
        />
      </Modal>
    </div>
  );
}
