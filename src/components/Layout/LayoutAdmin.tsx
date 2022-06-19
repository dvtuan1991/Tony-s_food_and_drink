import Row from "antd/lib/row";
import { Outlet } from "react-router-dom";
import Col from "antd/lib/col";

import NavBarAdmin from "components/NavBar/NavBarAdmin";
import MainHeaderAdmin from "components/Main/MainHeaderAdmin";

const LayoutAdmin = () => {
  return (
    <Row>
      <Col span={4} className=" bg-[#001529]">
        <NavBarAdmin />
      </Col>
      <Col span={20}>
        <div className="container">
          <main>
            <MainHeaderAdmin />
            <Outlet />
          </main>
        </div>
      </Col>
    </Row>
  );
};

export default LayoutAdmin;
