//权限列表
import React, { useEffect, useState } from "react";
import { Button, Table, Tag, Modal, Popover, Switch } from "antd";
import {
  deleteFirstData,
  deleteSecondData,
  getMenuData,
 
} from "../../../api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { http } from "../../../utils/request/request";
const { confirm } = Modal;
export default function RightList() {
  const [dataSource, setDataSource] = useState([]);

  //获取菜单，遍历，如果没有children，就没有展开项，重新渲染菜单
  const dispatchList = () => {
    getMenuData().then((res) => {
      res.forEach((item) => {
        if (item.children.length === 0) {
          delete item.children;
          setDataSource(res);
        }
      });
    });
  };

  useEffect(() => {
    dispatchList();
    // delete res[0].children;
    //res[0].children=" "
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => {
        return <div>{id}</div>;
      },
    },
    {
      title: "权限名称",
      dataIndex: "title",
    },
    {
      title: "权限路径",
      dataIndex: "key",
      render: (key) => {
        return <Tag color="gold">{key}</Tag>;
      },
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
            <Popover
              content={
                <div style={{ textAlign: "center" }}>
                  <Switch
                    checked={item.pagepermisson}
                    onChange={() => switchChange(item)}
                  ></Switch>
                </div>
              }
              title="页面配置项"
              trigger={item.pagepermisson===undefined ? "" : "click"}
            >
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                disabled={item.pagepermisson === undefined}
              ></Button>
            </Popover>
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
    if (item.children) {
      deleteFirstData(item.id);
    } else {
      deleteSecondData(item.id);
    }
    // setDataSource([...dataSource])
    // getMenuData().then((res) => {
    //   setDataSource(res);
    // });
    //调用渲染菜单。
    dispatchList();
  };

  const switchChange = (item) => {
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1;
    console.log(item);

    setDataSource([...dataSource]);
    if (item.grade === 1) {
     http.patch(`/rights/${item.id}`,{
      pagepermisson :item.pagepermisson 
     })
    }else{
      http.patch(`/children/${item.id}`,{
        pagepermisson :item.pagepermisson 
       })
    }
  };
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </div>
  );
}
