import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { SERVICE_API } from "constants/configs";
import { fetchApi } from "helpers/function";
import { IProduct } from "types/product.model";
import ProductAdminForm from "./ProductAdminForm";

const ProductAdminDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProduct>();
  const getData = useCallback(async () => {
    if (id) {
      const product: IProduct = await fetchApi(`${SERVICE_API}/product/${id}`);
      if (product) {
        setProduct(product);
      } else {
        navigate("/");
      }
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  return <div>{product && <ProductAdminForm product={product} />}</div>;
};

export default ProductAdminDetail;
