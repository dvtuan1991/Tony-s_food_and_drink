import { Col, Row } from "antd";
import React from "react";

import styles from "./Layout.module.css";
import HeaderCustomer from "../Header/HeaderCustomer ";

const LayoutCustomer: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="container mx-auto my-0">
      <div className={styles.wrapper}>
        <Row>
          <Col span={24}>
            <HeaderCustomer />
          </Col>
          <Col span={24}>{children}</Col>
        </Row>
      </div>
    </div>
  );
};

export default LayoutCustomer;
