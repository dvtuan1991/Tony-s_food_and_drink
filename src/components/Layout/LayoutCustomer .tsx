import { useEffect } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

import { RootState } from "store";
import { getCartByUserId } from "store/cart.slice";
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
      <Row>
        <Col span={24} className="bg-white">
          <HeaderCustomer />
        </Col>
        <Col span={24}>
          <Outlet />
        </Col>
      </Row>
    </div>
    // </div>
  );
};

export default LayoutCustomer;
