import { useCallback, useState } from "react"

import { SERVICE_API } from "constants/configs";
import { fetchApi } from "helpers/function";

const ProductAdminLists = () => {
  const [listProduct, setListProduct] = useState();
  const getData = useCallback(async () => {
    const fetchData = await fetchApi(`${SERVICE_API}/product`);
  }, []);

  return (
    <div>

    </div>
  )
}

export default ProductAdminLists