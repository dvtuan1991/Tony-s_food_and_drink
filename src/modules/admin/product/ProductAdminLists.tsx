import { useCallback, useEffect, useState } from "react"
import Pagination from "antd/lib/pagination";

import { SERVICE_API, PAGE_SIZE } from "constants/configs";
import { fetchApi } from "helpers/function";
import ProductTable from "./ProductTable";
import { IProduct } from "types/product.model";
import MainHeaderAdmin from "components/Main/MainHeaderAdmin";

const ProductAdminLists = () => {
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [listProduct, setListProduct] = useState<IProduct[]>();
  const [total, setTotal] = useState<number>()

  const handleClickPagination = (index: number) => {
    setPageIndex(index);
  };
  const handleClickDelete = async (id: number) => {
    const responseDelete = await fetch(`${SERVICE_API}/product/${id}/delete`, {
      method: 'DELETE'
    });
    if (responseDelete.ok) {
      getData(pageIndex)
    }
  }

  const getData = useCallback(async (pageIndex: number) => {
    const fetchData: { listProduct: IProduct[], totalProduct: number } = await fetchApi(`${SERVICE_API}/product/table?pageIndex=${pageIndex}&pageSize=${PAGE_SIZE}`);
    const updateListProduct = await Promise.all(fetchData.listProduct.map(async product => {
      const getCategory = await fetchApi(`${SERVICE_API}/category/${product.categoryId}`);
      return { ...product, categoryName: getCategory.name }
    }))
    setListProduct(updateListProduct)
    setTotal(fetchData.totalProduct)
  }, [pageIndex]);

  useEffect(() => {
    getData(pageIndex)
  }, [getData]);

  return (
    <>
      <MainHeaderAdmin />
      {listProduct &&
        <ProductTable data={listProduct} handleClickDelete={handleClickDelete} />}
      <Pagination total={total} pageSize={PAGE_SIZE} current={pageIndex} showSizeChanger={false} onChange={handleClickPagination} />
    </>
  )
}

export default ProductAdminLists