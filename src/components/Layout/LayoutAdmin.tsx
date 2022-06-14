
import Row from "antd/lib/row"
import { Outlet } from "react-router-dom"
import Col from "antd/lib/col"

import NavBarAdmin from "components/NavBar/NavBarAdmin"


const LayoutAdmin = () => {
  return (
    <Row>
      <Col span={4} className='h-screen'>
        <NavBarAdmin />
      </Col>
      <Col span={20}>
        <div className="container">
          <main>
            <Outlet />
          </main>
        </div>
      </Col>
    </Row>
  )
}

export default LayoutAdmin