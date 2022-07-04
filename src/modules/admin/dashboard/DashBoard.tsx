import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Typography from "antd/lib/typography";

const { Title, Text } = Typography;
const DashBoard = () => {
  return (
    <div className="mt-5">
      <Row>
        <Col span={24}>
          <Title>Order</Title>
        </Col>
        <Col span={24}>
          <Row>
            <Col span={6}>
              <div className="p-5 bg-[#ff5370] min-h-[144px] w-full rounded-md">
                <Row align="middle">
                  <Col span={18}>
                    <Text>Total Profit</Text>
                    <Title level={3}>$500</Title>
                  </Col>
                  <Col span={6}>
                    <div className="w-[40px] h-[40px] rounded-[40px] flex items-center justify-center bg-white">
                      <FontAwesomeIcon
                        icon="money-bill-1"
                        className="text-xl text-[#ff5370]"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default DashBoard;
