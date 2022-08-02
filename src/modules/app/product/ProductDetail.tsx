import { useParams, useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";

import { SERVICE_API } from "constants/configs";
import { fetchApi } from "helpers/function";
import { IProduct } from "types/product.model";
import CommentBox from "components/comment/CommentBox";
import ProductContent from "./ProductContent";

const ProductDetail = () => {
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

  return (
    <div className="product-content min-h-[500px]">
      {product && (
        <>
          <ProductContent product={product} />
          <CommentBox productId={product.id} />
        </>
      )}
    </div>
  );
};

export default ProductDetail;
