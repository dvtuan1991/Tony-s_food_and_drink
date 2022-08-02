import Input from "antd/lib/input";
import { useMemo, useRef } from "react";
import Col from "antd/lib/col";
import Form from "antd/lib/form";
import Row from "antd/lib/row";
import Typography from "antd/lib/typography";
import Button from "antd/lib/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";

import { RootState } from "store";
import { isVietnamesePhoneNumber, openNotification } from "helpers/function";
import { SERVICE_API } from "constants/configs";
import { changeCartToOrder, getCartByUserId } from "store/cart.slice";
import { PATH_APP_ORDER } from "routes/routes.paths";

interface InitFormUser {
  name: string;
  address: string;
  phone: string;
}

const { Title } = Typography;
const ShippingInfo = () => {
  const inputRef = useRef<any>();
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.users);
  const { totalPrice, cartsCheckOut } = useSelector(
    (state: RootState) => state.carts
  );
  const initFormValue: InitFormUser = useMemo(() => {
    if (user.id || user.id === 0) {
      return {
        name: user.name,
        address: user.address,
        phone: `0${user.phone}`
      };
    }
    return {
      name: "",
      address: "",
      phone: ""
    };
  }, [user]);

  const handleClickOrder = () => {
    inputRef.current && inputRef.current.click();
  };

  const handleSubmit = async (value: InitFormUser) => {
    const id = user.id ? user.id : Number(localStorage.getItem("guestId"));
    const data = {
      userId: id,
      userPhone: value.phone,
      userName: value.name,
      userAddress: value.address,
      createAt: Date.now(),
      totalPrice
    };
    const responseOrder = await fetch(`${SERVICE_API}/orderlist`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (responseOrder.ok) {
      const orderInfor = await responseOrder.json();
      const updateCart = await Promise.all(
        cartsCheckOut.map(async (cart) => {
          const responseUpdateCart = await fetch(
            `${SERVICE_API}/order/${cart.id}/update`,
            {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                ...cart,
                orderListId: orderInfor.id,
                isNew: false,
                isConfirm: true
              })
            }
          );
          if (responseUpdateCart.ok) {
            return responseUpdateCart.json();
          }
        })
      );
      dispatch(changeCartToOrder());
      dispatch(getCartByUserId(id));
      openNotification("success", "Order Sucess");
      navigate(`${PATH_APP_ORDER}`);
    }
  };

  return (
    <div className="py-5">
      <Title level={3}>Billing details</Title>
      <Row align="middle">
        <Col span={8}>
          <Form
            name="billing"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
            initialValues={initFormValue}
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name"
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Adress"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your address"
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone number"
              name={"phone"}
              rules={[
                {
                  required: true,
                  message: "Please input your phone number"
                },
                {
                  validator(_, value) {
                    if (isVietnamesePhoneNumber(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Phone number is not valid")
                    );
                  }
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }} hidden>
              <input type={"submit"} ref={inputRef} hidden />
            </Form.Item>
          </Form>
          <Row>
            <Col push={8}>
              <Button
                className="common-button"
                htmlType="submit"
                onClick={handleClickOrder}
              >
                Place Order
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ShippingInfo;
