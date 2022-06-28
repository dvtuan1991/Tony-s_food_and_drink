import Typography from "antd/lib/typography";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { RootState } from "store";
import { changePriceOutput, getTotalPrice, openNotification } from "helpers/function";
import { setCartCheckOut } from "store/cart.slice";
import CartItem from "./CartItem";

const { Title, Text } = Typography;

const CartList = () => {
  const { carts, isCartLoading, cartsCheckOut } = useSelector(
    (state: RootState) => state.carts
  );
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChangeCheckbox = (checkedValues: CheckboxValueType[]) => {
    if (checkedValues.length > 0) {
      setIsCheck(true);
    }
    if (checkedValues.length < 0) {
      setIsCheck(false);
    }
    dispatch(setCartCheckOut(checkedValues));
  };

  const handleClickCheckOut = () => {
    if (!isCheck) {
      openNotification("warning", "You forgot choose food");
      return null;
    }
    !isCartLoading && navigate("/checkout");
  };

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
              <Text>{`Total: ${changePriceOutput(getTotalPrice(cartsCheckOut))}`}</Text>
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
