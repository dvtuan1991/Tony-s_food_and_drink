import Typography from "antd/lib/typography";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import Checkbox from "antd/lib/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "antd/lib/button";

import { AppDispatch, RootState } from "store";
import {
  changePriceOutput,
  getTotalPrice,
  openNotification
} from "helpers/function";
import { PATH_APP_CHECK_OUT } from "routes/routes.paths";
import { setCartCheckOut } from "store/cart.slice";
import CartItem from "./CartItem";

const { Title, Text } = Typography;

const CartList = () => {
  const { carts, cartsCheckOut } = useSelector(
    (state: RootState) => state.carts
  );
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleChangeCheckbox = (checkedValues: CheckboxValueType[]) => {
    setCheckedList(checkedValues);
    dispatch(setCartCheckOut(checkedValues));
  };

  const handleClickCheckOut = () => {
    if (checkedList.length === 0) {
      openNotification("warning", "You forgot choose food");
      return null;
    }
    dispatch(setCartCheckOut(checkedList));
    navigate(`${PATH_APP_CHECK_OUT}`);
  };

  if (carts.length === 0) {
    return (
      <div className="mt-5">
        <div className="mb-5">
          <Title level={3}>
            Choose Your <span className="text-[#ea2251]">Food</span> :
          </Title>
        </div>
        <div className="p-5 border border-solid border-t-4 border-t-[#ea2251] rounded-t">
          <Text>Your cart is currently empty.</Text>
        </div>
        <Button
          className="mt-5 bg-[#ea2251] rounded-[5px]"
          type="primary"
          size="large"
          onClick={() => navigate("/")}
        >
          Return My Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="">
      <div className="mb-5">
        <Title level={3}>
          Choose Your <span className="text-[#ea2251]">Food</span> :
        </Title>
      </div>
      <Row className="mb-5">
        <Col span={23} push={1}>
          <Row>
            <Col span={8}>
              <Title level={5}>Product</Title>
            </Col>
            <Col span={16}>
              <Row>
                <Col span={6}>
                  <Title level={5}>Unit Price</Title>
                </Col>
                <Col span={6}>
                  <Title level={5}>Quantity</Title>
                </Col>
                <Col span={6}>
                  <Title level={5}>Total Price</Title>
                </Col>
                <Col span={6}>
                  <Title level={5}>Actions</Title>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row align="middle">
        <Checkbox.Group
          onChange={handleChangeCheckbox}
          style={{ width: "100%" }}
        >
          {carts.map((cart, index) => (
            <Col span={24} key={cart.id}>
              <div
                className={`flex items-center py-5 bg-white  rounded border-solid border border-[#ccc] ${
                  index < carts.length - 1 && "mb-3"
                } w-full `}
              >
                <Checkbox value={cart.id} className="seft-center mx-5" />
                <CartItem cart={cart} />
              </div>
            </Col>
          ))}
        </Checkbox.Group>
      </Row>
      <div>
        <Row>
          <Col span={6} push={18}>
            <div className="flex items-center justify-between p-5">
              <Text>{`Total: ${changePriceOutput(
                getTotalPrice(cartsCheckOut)
              )}`}</Text>
              <Text
                className="p-3 cursor-pointer bg-[#ea2251] text-white hover:border-[#ea2251] hover:text-black rounded"
                onClick={handleClickCheckOut}
              >
                Check Out
              </Text>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CartList;
