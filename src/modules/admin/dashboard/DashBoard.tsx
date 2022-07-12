import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Typography from "antd/lib/typography";

import { useEffect, useState } from "react";
import { fetchApi } from "helpers/function";
import { SERVICE_API } from "constants/configs";
import styles from "./index.module.css";

interface DashBoardState {
  totalIncome: number;
  totalUser: number;
  totalOrder: number;
  totalProductSold: number;
}

const { Text } = Typography;
const DashBoard = () => {
  const [analytic, setAnalyticData] = useState<DashBoardState>();
  useEffect(() => {
    (async () => {
      const getAnalyticsOrder = await fetchApi(
        `${SERVICE_API}/order/adminanalytics`
      );
      const getAnalyticsUser = await fetchApi(
        `${SERVICE_API}/user/adminstatic`
      );
      const getAnalyticOrderList = await fetchApi(
        `${SERVICE_API}/orderlist/adminstatic`
      );

      setAnalyticData({
        totalIncome: getAnalyticsOrder.totalPrice,
        totalUser: getAnalyticsUser,
        totalOrder: getAnalyticOrderList,
        totalProductSold: getAnalyticsOrder.totalSold
      });
    })();
  }, []);
  return (
    <div className="mt-12">
      {analytic && (
        <Row>
          <Col span={24}>
            <Row gutter={32}>
              <Col xs={24} md={12} xl={6}>
                <div className={`${styles.card} ${styles["card-red"]}`}>
                  <Row align="middle" justify="space-between">
                    <Col span={18}>
                      <Text className="block text-base">Total Income</Text>
                      <Text className="mt-0 text-2xl font-semibold">
                        ${analytic.totalIncome}
                      </Text>
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
              <Col xs={24} md={12} xl={6}>
                <div className={`${styles.card} ${styles["card-blue"]}`}>
                  <Row align="middle" justify="space-between">
                    <Col span={18}>
                      <Text className="block text-base">Total Order</Text>
                      <Text className="mt-0 text-2xl font-semibold">
                        {analytic.totalOrder}
                      </Text>
                    </Col>
                    <Col  span={6}>
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
              <Col xs={24} md={12} xl={6}>
                <div className={`${styles.card} ${styles["card-yellow"]}`}>
                  <Row align="middle" justify="space-between">
                    <Col span={18}>
                      <Text className="block text-base">Total User</Text>
                      <Text className="mt-0 text-2xl font-semibold">
                        {analytic.totalUser}
                      </Text>
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
              <Col xs={24} md={12} xl={6}>
                <div className={`${styles.card} ${styles["card-green"]}`}>
                  <Row align="middle" justify="space-between">
                    <Col span={18}>
                      <Text className="block text-base">Product Sold</Text>
                      <Text className="mt-0 text-2xl font-semibold">
                        {analytic.totalProductSold}
                      </Text>
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
      )}
    </div>
  );
};

export default DashBoard;
