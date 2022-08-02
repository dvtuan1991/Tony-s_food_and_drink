import { PAGE_SIZE, SERVICE_API } from "constants/configs";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "antd/lib/pagination";
import { useSearchParams } from "react-router-dom";

import { AppDispatch, RootState } from "store";
import { getOrderList } from "store/order.slice";
import OrderTable from "./OrderTable";
import SortAndFilter from "./SortAndFilter";

const OrderAdminLists = () => {
  const [searchQuerry, setSearchQuerry] = useSearchParams();
  const { orders, totalLeng } = useSelector((state: RootState) => state.orders);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const handleClickPaga = (index: number) => {
    setPageIndex(index);
    const queryObj: any = {};
    searchQuerry.forEach((value, key) => {
      queryObj[key] = value;
    });
    queryObj.index = index + "";
    setSearchQuerry(queryObj);
  };

  const getData = useCallback(
    async (index: number) => {
      const queryObj: any = {};
      searchQuerry.forEach((value, key) => {
        queryObj[key] = value;
      });
      const url = `${SERVICE_API}/orderlist/adminlist?${
        queryObj.index ? "" : `index=${index}`
      }
      &limit=${PAGE_SIZE}&${new URLSearchParams(queryObj)}`;
      if (queryObj.index) {
        setPageIndex(Number(queryObj.index));
      }
      dispatch(getOrderList(url));
    },
    [dispatch, pageIndex, searchQuerry]
  );

  useEffect(() => {
    getData(pageIndex);
  }, [getData]);
  return (
    <div>
      <SortAndFilter />
      <OrderTable orders={orders} />
      <Pagination
        current={pageIndex}
        total={totalLeng}
        pageSize={PAGE_SIZE}
        showSizeChanger={false}
        onChange={handleClickPaga}
        className="pb-5"
      />
    </div>
  );
};

export default OrderAdminLists;
