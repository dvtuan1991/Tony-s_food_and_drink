import Row from "antd/lib/row";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import Pagination from "antd/lib/pagination";

import { RootState } from "store";
import { getListProductApp } from "store/product.slice";
import { APP_PAGE_SIZE } from "constants/configs";
import SelectSort from "components/SelectCategory/SelectSort";
import ProductItem from "./ProductItem";

const ProductContainer = () => {
  const [pageIndex, setPageIndex] = useState<number>(1);
  const { productList, sortType, filterList, totalProduct } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch: Dispatch<any> = useDispatch();
  const handleClickPagi = (index: number) => {
    setPageIndex(index);
  };
  useEffect(() => {
    const sortAndFilter = {
      sortType,
      filterList
    };
    dispatch(getListProductApp({ sortAndFilter, pageIndex }));
  }, [sortType, dispatch, filterList.price, pageIndex]);
  return (
    <div className="flex flex-col">
      <div className="flex  w-1/5 py-5 self-end">
        <SelectSort />
      </div>
      <Row gutter={16}>
        {productList.length > 0 &&
          productList.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
      </Row>
      <div className="mb-5">
        <Pagination
          current={pageIndex}
          showSizeChanger={false}
          pageSize={APP_PAGE_SIZE}
          total={totalProduct}
          onChange={handleClickPagi}
        />
      </div>
    </div>
  );
};

export default ProductContainer;
