import { Col, Row, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { IProduct } from "../../types/Product";
import HotProduct from "../Product/HotProduct";

const { Text } = Typography;
const MainHeading = () => {
  const [listProduct, setListProduct] = useState<IProduct[]>();

  const getData = useCallback(async () => {
    const fetchData = await fetch(`http://localhost:5000/product`);
    const list: IProduct[] = await fetchData.json();
    setListProduct(list);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <Row justify="space-around" align="middle">
      <Col span={12}>
        <p className="text-4xl font-bold">
          Order your <span className="text-[#ea2251]" >favorites</span>
        </p>
        <Text>Quick & Delicious</Text>
      </Col>
      <Col span={12}>
        {listProduct && <HotProduct listProduct={listProduct} />}
      </Col>
    </Row>
  );
};

export default MainHeading;
