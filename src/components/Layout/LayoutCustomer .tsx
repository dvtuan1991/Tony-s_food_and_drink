import { useEffect } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import BackTop from "antd/lib/back-top";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

import { RootState } from "store";
import { getCartByUserId } from "store/cart.slice";
import FooterApp from "components/Footer/FooterApp";
import HeaderCustomer from "../Header/HeaderCustomer ";
import styles from "./layout.module.css";

const LayoutCustomer = () => {
  const guestId = localStorage.getItem("guestId");
  const { user } = useSelector((state: RootState) => state.users);
  const dispatch: Dispatch<any> = useDispatch();
  useEffect(() => {
    if (user.id || user.id === 0) {
      dispatch(getCartByUserId(user.id));
    }
    if (guestId) {
      dispatch(getCartByUserId(Number(guestId)));
    }
  }, [dispatch, user.id, guestId]);
  return (
    // <div className="container mx-auto my-0">
    <div className={styles.wrapper}>
      <BackTop visibilityHeight={200} className="right-10" />
      <Row>
        <Col span={24} className="bg-white">
          <HeaderCustomer />
        </Col>
        <Col span={24}>
          <Outlet />
        </Col>
        <Col span={24}>
          <FooterApp />
        </Col>
      </Row>
    </div>
    // </div>
  );
};

export default LayoutCustomer;
