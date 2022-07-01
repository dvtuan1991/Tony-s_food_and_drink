import { useCallback, useState, useEffect } from "react";
import { ICategory } from "types/category.model";
import Pagination from "antd/lib/pagination";

import { fetchApi, openNotification } from "helpers/function";
import { PAGE_SIZE, SERVICE_API } from "constants/configs";
import ModalEditable from "components/Modal/ModalEditable";
import { IProduct } from "types/product.model";
import CategoryTable from "./CategoryTable";

const CategoryAdminLists = () => {
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [listCategory, setListCategory] = useState<ICategory[]>();
  const [total, setTotal] = useState<number>();

  const handleClickPagination = (index: number) => {
    setPageIndex(index);
  };

  const getData = useCallback(
    async (index: number) => {
      const fetchData: { listCategory: ICategory[]; totalCategory: number } =
        await fetchApi(
          `${SERVICE_API}/category/table?pageIndex=${index}&pageSize=${PAGE_SIZE}`
        );
      setListCategory(fetchData.listCategory);
      setTotal(fetchData.totalCategory);
    },
    [pageIndex]
  );

  const handleClickDelete = async (id: number | string) => {
    const responseProduct: IProduct[] = await fetchApi(
      `${SERVICE_API}/product/category/${id}`
    );
    if (responseProduct.length > 0) {
      console.log(responseProduct.length);
    }
    if (responseProduct.length === 0) {
      const responseDelete = await fetch(
        `${SERVICE_API}/category/${id}/delete`,
        {
          method: "DELETE"
        }
      );
      if (responseDelete.ok) {
        getData(pageIndex);
        openNotification("success", "Delete Success");
      }
    }
  };
  useEffect(() => {
    getData(pageIndex);
  }, [getData, pageIndex]);

  return (
    <>
      <ModalEditable isCreate={true} />
      {listCategory && (
        <CategoryTable
          data={listCategory}
          handleClickDelete={handleClickDelete}
        />
      )}
      <Pagination
        total={total}
        pageSize={PAGE_SIZE}
        current={pageIndex}
        showSizeChanger={false}
        onChange={handleClickPagination}
        className="pb-5"
      />
    </>
  );
};

export default CategoryAdminLists;
