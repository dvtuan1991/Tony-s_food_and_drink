import React from "react";
import { Button, Col, Row } from "antd";
import { useSelector } from "react-redux";

import NavbarCustomer from "../NavBar/NavbarCustomer";
import ButtonCart from "../Button/ButtonCart";
import ButtonUser from "../Button/ButtonUser";
import { RootState } from "../../store";
import mylogo from '../../assets/mylogo.png'

const HeaderCustomer = () => {
  const { user } = useSelector((state: RootState) => state.users);
  return (
    <header>
      <Row justify="space-between" align="middle" className="pt-3 mb-7">
        <Col span={4}>
          <Row align="middle">
            <Col xs={24} md={12}>
              <img
                src={mylogo}
                alt="logo"
                className="w-full  h-12 object-cover"
              />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <NavbarCustomer />
        </Col>
        <Col span={4}>
          <Row justify="end" align="middle" className="flex-nowrap" gutter={16}>
            <Col>
              <ButtonCart />
            </Col>
            <Col>{user ? <ButtonUser /> : <Button>Log In</Button>}</Col>
          </Row>
        </Col>
      </Row>
    </header>
  );
};

export default HeaderCustomer;
