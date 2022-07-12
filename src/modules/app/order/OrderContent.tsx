import { useEffect, useState } from "react";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Pagination from "antd/lib/pagination";
import Button from "antd/lib/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Typography from "antd/lib/typography";
import { getOrderList } from "store/order.slice";
import { AppDispatch, RootState } from "store";
import { ORDER_PAGE_SIZE, SERVICE_API } from "constants/configs";
import test from "assets/test.png";
import OrderItem from "./OrderItem";

const { Title } = Typography;
const OrderContent = () => {
  const { user } = useSelector((state: RootState) => state.users);
  const { orders, sortType, filter, totalLeng } = useSelector(
    (state: RootState) => state.orders
  );
  const [pageIndex, setPageIndex] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const guestId = localStorage.getItem("guestId");

  useEffect(() => {
    if (user.userName || Number(guestId)) {
      const userId = user.userName ? user.id : Number(guestId);
      const url = `${SERVICE_API}/orderlist/${userId}?index=${pageIndex}&limit=${ORDER_PAGE_SIZE}&sort=${sortType}&status=${filter}`;
      dispatch(getOrderList(url));
    }
  }, [user.id, guestId, dispatch, pageIndex]);

  if (orders.length === 0) {
    return (
      <div
        className="select-none w-[428px] my-0 mx-auto min-h-[500px] bg-no-repeat d-flex justify-center"
        style={{ backgroundImage: `url(${test})` }}
      >
        <Button
          className="block mt-10 mx-auto text-[#000000d9]"
          type="primary"
          onClick={() => navigate("/")}
        >
          Get Order Now
        </Button>
      </div>
    );
  }
  return (
    <Row justify="center">
      {orders.length && (
        <>
          <Col span={24}>
            <Title level={3}>Your Order</Title>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={24}>
                {orders.map((order) => (
                  <OrderItem order={order} key={order.id} />
                ))}
              </Col>
            </Row>
          </Col>
          <Col>
            <Pagination
              current={pageIndex}
              pageSize={ORDER_PAGE_SIZE}
              total={totalLeng}
              showSizeChanger={false}
              onChange={setPageIndex}
            />
          </Col>
        </>
      )}
    </Row>
  );
};

export default OrderContent;
