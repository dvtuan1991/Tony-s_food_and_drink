import Input from "antd/lib/input";
import Col from "antd/lib/col";
import Form from "antd/lib/form";
import Row from "antd/lib/row";
import Typography from "antd/lib/typography";
import { Button } from "antd";

const { Title, Text } = Typography;
const ShippingInfo = () => {
  return (
    <div className="py-5">
      <Title level={3}>Billing details</Title>
      <Row align="middle">
        <Col span={8}>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ textAlign: "center" }}
          >
            <Form.Item label="name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Adress" name="adress">
              <Input />
            </Form.Item>
            <Form.Item label="phone" name={"Phone"}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Place Order</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ShippingInfo;
