import { FC, useCallback, useEffect, useState } from "react";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import InputNumber from "antd/lib/input-number";
import Space from "antd/lib/space";
import Typography from "antd/lib/typography";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

import { RootState } from "store";
import { ICart } from "types/cart.model";
import ProductImage from "components/Product/ProductImage";
import { IProduct } from "types/product.model";
import { fetchApi } from "helpers/function";
import { SERVICE_API } from "constants/configs";
import PopConfirmDelete from "components/Button/PopConfirmDelete";
import { updateCart } from "store/cart.slice";

const { Text } = Typography;
const CartItem: FC<{ cart: ICart }> = ({ cart }) => {
  const { isCartLoading } = useSelector((state: RootState) => state.carts);
  const dispatch: Dispatch<any> = useDispatch();
  const [product, setProduct] = useState<IProduct>();
  const [productQuantity, setCartQuantity] = useState<number>(cart.quantity);
  const handleClickDelete = async () => {
    const res = await fetch(`${SERVICE_API}`);
  };

  const handleChange = (value: number) => {
    setCartQuantity(value);
  };

  const handleBlur = () => {
    if (product) {
      console.log("fetch");
      const price = productQuantity * product.newPrice;
      dispatch(updateCart({ ...cart, quantity: productQuantity, price }));
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
                  onBlur={handleBlur}
                  onPressEnter={handleBlur}
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
