import Button from "antd/lib/button";
import Col from "antd/lib/col";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Row from "antd/lib/row";
import { SERVICE_API } from "constants/configs";
import { isVietnamesePhoneNumber, openNotification } from "helpers/function";
import { useNavigate } from "react-router-dom";

import styles from "../app.module.css";

interface RegisterForm {
  name: string;
  userName: string;
  email: string;
  password: string;
  confirm: string;
  phone: string;
  address: string;
}

const Register = () => {
  const navigate = useNavigate();
  const handleClickSubmit = async (value: RegisterForm) => {
    const { confirm, ...data } = value;
    const res = await fetch(`${SERVICE_API}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      openNotification("success", "Success");
      navigate("/login");
    }
    if (!res.ok) {
      openNotification("error", "error");
    }
  };

  return (
    <Row>
      <Col span={24}>
        <div className={styles["form-box"]}>
          <Form
            name="register"
            wrapperCol={{ span: 24 }}
            onFinish={handleClickSubmit}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="Your Name"
              rules={[{ required: true, message: "Please input your name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="userName"
              label="User Name"
              rules={[
                { required: true, message: "Please input your username" }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true
                },
                {
                  min: 6,
                  message: "Password at least 6 character"
                },
                {
                  max: 20,
                  message: "Password max 20 character"
                }
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number"
                },
                {
                  validator(_, value) {
                    if (isVietnamesePhoneNumber(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Phone number is not valid")
                    );
                  }
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Please input your adress"
                }
              ]}
            >
              <Input />
            </Form.Item>
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

export default Register;
