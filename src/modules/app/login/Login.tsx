import Button from "antd/lib/button";
import Checkbox from "antd/lib/checkbox";
import Col from "antd/lib/col";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Row from "antd/lib/row";
import { Link } from "react-router-dom";

import styles from "../app.module.css";

const Login = () => {
  const handleClickSubmit = (value: { userName: string; password: string }) => {
    console.log(value);
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
