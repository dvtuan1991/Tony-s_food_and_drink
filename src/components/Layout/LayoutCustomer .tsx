import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";

import styles from "./Layout.module.css";
import HeaderCustomer from "../Header/HeaderCustomer ";

const LayoutCustomer = () => {
  return (
    <div className="container mx-auto my-0">
      <div className={styles.wrapper}>
        <Row>
          <Col span={24}>
            <HeaderCustomer />
          </Col>
          <Col span={24}>
            <Outlet />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LayoutCustomer;
