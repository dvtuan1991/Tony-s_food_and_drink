import { FC, useCallback, useEffect, useState } from "react";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import InputNumber from "antd/lib/input-number";
import Space from "antd/lib/space";
import Spin from "antd/lib/spin";
import Typography from "antd/lib/typography";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

import { RootState } from "store";
import { ICart } from "types/cart.model";
import ProductImage from "components/Product/ProductImage";
import { IProduct } from "types/product.model";
import { fetchApi, openNotification } from "helpers/function";
import { SERVICE_API } from "constants/configs";
import PopConfirmDelete from "components/Button/PopConfirmDelete";
import { changeQuantity, removeCart } from "store/cart.slice";

const { Text } = Typography;
const CartItem: FC<{ cart: ICart }> = ({ cart }) => {
  const { isCartLoading } = useSelector((state: RootState) => state.carts);
  const dispatch: Dispatch<any> = useDispatch();
  const [product, setProduct] = useState<IProduct>();

  const [productQuantity, setCartQuantity] = useState<number>(cart.quantity);
  const handleClickDelete = async () => {
    const res = await fetch(`${SERVICE_API}/order/${cart.id}/delete`, {
      method: "DELETE"
    });
    if (res.ok) {
      dispatch(removeCart(cart.id));
      openNotification("info", "remove success");
    }
  };

  const handleChange = (value: number) => {
    setCartQuantity(value);
    if (product) {
      const price = value * product.newPrice;
      dispatch(changeQuantity({ id: cart.id, quantity: value, price }));
    }
  };

  const getData = useCallback(async () => {
    const getProduct = await fetchApi(
      `${SERVICE_API}/product/${cart.productId}`
    );
    setProduct(getProduct);
  }, [cart.productId]);

  useEffect(() => {
    getData();
  }, [getData, cart]);

  if (isCartLoading) {
    return <Spin spinning={isCartLoading} />;
  }
  return (
    <Row align="middle" className="w-full">
      {product && (
        <>
          <Col span={8}>
            <Space size={"large"}>
              <div className="w-20 h-16 p-1">
                <ProductImage product={product} />
              </div>
              <Text>{product.name}</Text>
            </Space>
          </Col>
          <Col span={16}>
            <Row align="middle">
              <Col span={6}>
                {product.oldPrice && product.oldPrice > product.newPrice ? (
                  <Space>
                    <Text delete>{`$${product.oldPrice.toFixed(2)}`}</Text>
                    <Text>{`$${product.newPrice.toFixed(2)}`}</Text>
                  </Space>
                ) : (
                  <Text>{`$${product.newPrice.toFixed(2)}`}</Text>
                )}
              </Col>
              <Col span={6}>
                <InputNumber
                  value={productQuantity}
                  onChange={handleChange}
                  disabled={isCartLoading}
                  min={1}
                />
              </Col>
              <Col span={6}>{`$${(productQuantity * product.newPrice).toFixed(
                2
              )}`}</Col>
              <Col span={6}>
                <PopConfirmDelete
                  id={cart.id}
                  handleConfirmDelete={handleClickDelete}
                  title="Are you sure delete"
                />
              </Col>
            </Row>
          </Col>
        </>
      )}
    </Row>
  );
};

export default CartItem;
