import { useCallback, useEffect, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Pagination from "antd/lib/pagination";
import { useNavigate } from "react-router-dom";

import { SERVICE_API, PAGE_SIZE } from "constants/configs";
import { IProduct } from "types/product.model";
import { fetchApi } from "helpers/function";
import SelectSort from "components/SelectCategory/SelectSort";
import ButtonAddNew from "components/Button/ButtonAddNew";
import ProductTable from "./ProductTable";

const ProductAdminLists = () => {
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [listProduct, setListProduct] = useState<IProduct[]>();
  const [total, setTotal] = useState<number>();
  const navigate = useNavigate();
  const handleClickPagination = (index: number) => {
    setPageIndex(index);
  };

  const getData = useCallback(
    async (index: number) => {
      const fetchData: { listProduct: IProduct[]; totalProduct: number } =
        await fetchApi(
          `${SERVICE_API}/product/table?pageIndex=${index}&pageSize=${PAGE_SIZE}`
        );
      const updateListProduct = await Promise.all(
        fetchData.listProduct.map(async (product) => {
          const getCategory = await fetchApi(
            `${SERVICE_API}/category/${product.categoryId}`
          );
          return { ...product, categoryName: getCategory.name };
        })
      );
      setListProduct(updateListProduct);
      setTotal(fetchData.totalProduct);
    },
    [pageIndex]
  );

  const handleClickDelete = async (id: number | string) => {
    const responseDelete = await fetch(`${SERVICE_API}/product/${id}/delete`, {
      method: "DELETE"
    });
    if (responseDelete.ok) {
      getData(pageIndex);
    }
  };

  const handleClickAdd = () => {
    navigate("/admin/product/create");
  };

  useEffect(() => {
    getData(pageIndex);
  }, [getData, pageIndex]);

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col>
          <ButtonAddNew onClick={handleClickAdd} />
        </Col>
        <Col>
          <SelectSort />
        </Col>
      </Row>

      {listProduct && (
        <ProductTable
          data={listProduct}
          handleClickDelete={handleClickDelete}
        />
      )}
      <Pagination
        total={total}
        pageSize={PAGE_SIZE}
        current={pageIndex}
        showSizeChanger={false}
        onChange={handleClickPagination}
      />
    </>
  );
};

export default ProductAdminLists;
