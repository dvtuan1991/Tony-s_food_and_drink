import { Link } from "react-router-dom";

import { SERVICE_API } from "constants/configs";
import { IProduct } from "../../types/product.model";

const ProductImage: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <img
        src={`${SERVICE_API}/${product.thumbnail}`}
        alt={product.name}
        className="w-full h-full object-cover"
      />
    </Link>
  );
};

export default ProductImage;
