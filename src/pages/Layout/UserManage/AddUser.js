import { Form, Input, Modal, Select } from "antd";
import { http } from "../../../utils/request/request";
import { forwardRef, useEffect, useState } from "react";
import { getSuperUser,  getUserRegion } from "../../../api";
const { Option } = Select;
const AddUser = forwardRef(({ open, onCreate, onCancel }, ref) => {
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState([]);

  const [roleList, setRoleList] = useState([]);
  const [superUser, setSuperUser] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    getUserRegion().then((res) => {
      setRoleList(res);
    });
    getSuperUser().then((res) => {
      setSuperUser(res);
    });
    // getUserInfo().then((res) => {
    //   setUserInfo(res);
    // });
  }, []);

  //   const superName=()=>{
  //     superUser.map(item=>item.roleName)
  //   }
  // const superOptions=()=>{
  //   // superUser.map(item=>{
  //   // return  item.roleName
  //   // })
  //   console.log(superUser);
  // }
  return (
    <Modal
      open={open}
      title="添加用户信息"
      okText="确认"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);

            http
              .post("/users", {
                ...values,
                roleState: true,
                default: false,
              })
              .then((res) => {
                setUserInfo([...userInfo, res]);
               
                // setDataSource([...dataSource,res]);
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          })
          .catch((err) => console.log(err));
      }}
    >
      <Form form={form} ref={ref} layout="vertical">
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: "请输入用户名!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: "请输入密码!",
            },
          ]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item
          name="region"
          label="区域"
          rules={
            isDisabled
              ? []
              : [
                  {
                    required: true,
                    message: "请输入区域!",
                  },
                ]
          }
        >
          <Select
            // defaultValue=" "
            style={{
              width: "473px",
            }}
            disabled={isDisabled}
            // onChange={handleChange}
          >
            {roleList.map((item) => (
              <Option value={item.value} key={item.id}>
                {item.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="roleId"
          label="角色"
          rules={
            isDisabled
              ? []
              : [
                  {
                    required: true,
                    message: "请输入角色!",
                  },
                ]
          }
        >
          <Select
            defaultValue=""
            style={{
              width: "473px",
            }}
            onChange={(value) => {
              console.log(value);
              if (value === 1) {
                setIsDisabled(true);
                form.setFieldsValue({
                  region: "",
                });
              } else {
                setIsDisabled(false);
              }
            }}
          >
            {superUser.map((item) => (
              <Option value={item.id} key={item.id}>
                {item.roleName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
});
export default AddUser;
