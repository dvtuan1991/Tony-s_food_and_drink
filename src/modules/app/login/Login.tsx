import Button from "antd/lib/button";
import Checkbox from "antd/lib/checkbox";
import Col from "antd/lib/col";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Row from "antd/lib/row";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { SERVICE_API } from "constants/configs";
import { openNotification } from "helpers/function";
import { addUser } from "store/user.slice";
import { updateUserIdInCart } from "store/cart.slice";
import { IUser } from "types/user.model";
import styles from "../app.module.css";

const Login = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const guestId = localStorage.getItem("guestId");
  const handleClickSubmit = async (value: {
    userName: string;
    password: string;
  }) => {
    const data = { username: value.userName, password: value.password };
    const res = await fetch(`${SERVICE_API}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      const result = await res.json();
      localStorage.setItem("access_token", result.access_token);
      const responseUser = await fetch(`${SERVICE_API}/auth/user`, {
        headers: {
          Authorization: `Bearer ${result.access_token}`
        }
      });
      const user: IUser = await responseUser.json();
      if (guestId) {
        dispatch(
          updateUserIdInCart({ userId: user.id, guestId: Number(guestId) })
        );
        localStorage.removeItem("guestId");
      }
      dispatch(addUser(user));
      if (user.isAdmin) {
        navigate("/admin");
      }
      if (!user.isAdmin) {
        navigate("/");
      }
    }
    if (!res.ok) {
      openNotification("error", "Error");
    }
  };
  return (
    <Row justify="center">
      <Col span={24}>
        <div className={styles["form-box"]}>
          <Form
            name="login"
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={handleClickSubmit}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Username"
              name="userName"
              rules={[
                { required: true, message: "Please fill your username!" }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please fill your password!" }
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Row justify="space-between" align="middle" className="mb-5">
              <Col span={8}>
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  className="mb-0"
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8}>
                <div className="flex justify-end ">
                  <Link to="/register">
                    <span>Register new account</span>
                  </Link>
                </div>
              </Col>
            </Row>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                shape="round"
                size="large"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
