import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Typography from "antd/lib/typography";

import NewUpdate from "./NewUpdate";
import styles from "./index.module.css";

const { Title, Text } = Typography;
const DashBoard = () => {
  return (
    <div className="mt-12">
      <Row>
        <Col span={24}>
          <Row gutter={32}>
            <Col span={6}>
              <div className={`${styles.card} ${styles["card-red"]}`}>
                <Row align="middle" justify="space-between">
                  <Col span={18}>
                    <Text className="block text-base">Total Profit</Text>
                    <Text className="mt-0 text-2xl font-semibold">$500</Text>
                  </Col>
                  <Col span={6}>
                    <div className={`${styles.circle}`}>
                      <FontAwesomeIcon
                        icon="money-bill-1"
                        className="text-xl text-[#ff5370]"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={6}>
              <div className={`${styles.card} ${styles["card-blue"]}`}>
                <Row align="middle" justify="space-between">
                  <Col span={18}>
                    <Text className="block text-base">Total Order</Text>
                    <Text className="mt-0 text-2xl font-semibold">50</Text>
                  </Col>
                  <Col span={6}>
                    <div className={`${styles.circle}`}>
                      <FontAwesomeIcon
                        icon="cart-shopping"
                        className="text-xl text-[#0486db]"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={6}>
              <div className={`${styles.card} ${styles["card-yellow"]}`}>
                <Row align="middle" justify="space-between">
                  <Col span={18}>
                    <Text className="block text-base">Total User</Text>
                    <Text className="mt-0 text-2xl font-semibold">50</Text>
                  </Col>
                  <Col span={6}>
                    <div className={`${styles.circle}`}>
                      <FontAwesomeIcon
                        icon="user"
                        className="text-xl text-[#fe9365]"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={6}>
              <div className={`${styles.card} ${styles["card-green"]}`}>
                <Row align="middle" justify="space-between">
                  <Col span={18}>
                    <Text className="block text-base">Product Sold</Text>
                    <Text className="mt-0 text-2xl font-semibold">50</Text>
                  </Col>
                  <Col span={6}>
                    <div className={`${styles.circle}`}>
                      <FontAwesomeIcon
                        icon="utensils"
                        className="text-xl text-[#0df3a3]"
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
