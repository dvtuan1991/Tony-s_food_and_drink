import { Button, Col, Row } from "antd";
import { Link } from "react-router-dom";

import NavbarCustomer from "../NavBar/NavbarCustomer";
import ButtonCart from "../Button/ButtonCart";
import ButtonUser from "../Button/ButtonUser";

import mylogo from "../../assets/mylogo.png";

const HeaderCustomer = () => {
  return (
    <header>
      <Row justify="space-between" align="middle" className="pt-3 mb-7">
        <Col span={4}>
          <Row align="middle">
            <Col xs={24} md={12}>
              <Link to="/">
                <img
                  src={mylogo}
                  alt="logo"
                  className="w-full  h-12 object-cover"
                />
              </Link>
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
            <Col>
              <ButtonUser />
            </Col>
          </Row>
        </Col>
      </Row>
    </header>
  );
};

export default HeaderCustomer;
