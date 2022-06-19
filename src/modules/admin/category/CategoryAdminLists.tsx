import { useCallback, useState, useEffect } from "react"
import { ICategory } from "types/category.model";
import Pagination from "antd/lib/pagination";

import { fetchApi } from "helpers/function";
import { PAGE_SIZE, SERVICE_API } from "constants/configs";
import CategoryTable from "./CategoryTable";
import MainHeaderAdmin from "components/Main/MainHeaderAdmin";
import ModalEditable from "components/Modal/ModalEditable";

const CategoryAdminLists = () => {
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [listCategory, setListCategory] = useState<ICategory[]>();
  const [total, setTotal] = useState<number>();

  const handleClickPagination = (index: number) => {
    setPageIndex(index);
  }
  const handleClickDelete = async (id: number) => {
    const responseDelete = await fetch(`${SERVICE_API}/category/${id}/delete`, {
      method: 'DELETE'
    });
    if (responseDelete.ok) {
      getData(pageIndex)
    }
  };

  const getData = useCallback(async (index: number) => {
    const fetchData: { listCategory: ICategory[], totalCategory: number } = await fetchApi(`${SERVICE_API}/category/table?pageIndex=${pageIndex}&pageSize=${PAGE_SIZE}`);
    setListCategory(fetchData.listCategory);
    setTotal(fetchData.totalCategory);
  }, [pageIndex]);

  useEffect(() => {
    getData(pageIndex)
  }, [getData, pageIndex]);

  return (
    <>
      <ModalEditable isCreate={true} />
      {listCategory &&
        <CategoryTable data={listCategory} handleClickDelete={handleClickDelete} />}
      <Pagination total={total} pageSize={PAGE_SIZE} current={pageIndex} showSizeChanger={false} onChange={handleClickPagination} className='pl-5' />
    </>
  )
}

export default CategoryAdminLists