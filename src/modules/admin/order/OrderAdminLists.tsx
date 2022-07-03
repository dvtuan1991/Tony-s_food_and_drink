import { PAGE_SIZE, SERVICE_API } from "constants/configs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "antd/lib/pagination";

import { AppDispatch, RootState } from "store";
import { getOrderList } from "store/order.slice";
import OrderTable from "./OrderTable";
import SortAndFilter from "./SortAndFilter";

const OrderAdminLists = () => {
  const { orders, sortType, filter, totalLeng } = useSelector(
    (state: RootState) => state.orders
  );
  console.log(orders);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const handleClickPaga = (index: number) => {
    setPageIndex(index);
  };
  useEffect(() => {
    const url = `${SERVICE_API}/orderlist/adminlist?index=${pageIndex}&limit=${PAGE_SIZE}&sort=${sortType}&status=${filter}`;
    dispatch(getOrderList(url));
  }, [pageIndex, sortType, filter]);
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
