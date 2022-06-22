import Row from "antd/lib/row";
import { useCallback, useEffect, useState } from "react";

import { SERVICE_API } from "constants/configs";
import { fetchApi } from "helpers/function";
import { IProduct } from "types/product.model";
import ProductItem from "./ProductItem";

const ProductContainer = () => {
  const [listProduct, setListProduct] = useState<IProduct[]>();

  const getData = useCallback(async () => {
    const fetchListProduct = await fetchApi(`${SERVICE_API}/product`);
    setListProduct(fetchListProduct);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <Row gutter={16}>
      {listProduct &&
        listProduct.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
    </Row>
  );
};

export default ProductContainer;
