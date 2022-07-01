import Table, { ColumnsType } from "antd/lib/table";
import Typography from "antd/lib/typography";
import { FC } from "react";

import { IOrder } from "types/order.model";

const {Text} = Typography;
const OrderTable: FC<{ orders: IOrder[] }> = (orders) => {
  const colums: ColumnsType<IOrder> = [
    {
      dataIndex: "ordinalNum",
      key: "ordinalNum"
    },
    {
      title: "Shipping to",
      dataIndex: "userAddress",
      key: "userAddress"
    },
    {
      title: "Status",
      render: (record: IOrder) => {
        if(record.isCancel) {
          return (<Text>Cancel</Text>)
        }
        if(record.isComplete) {
          return (<Text>Complete</Text>)
        }
        return <Text>Shipping</Text>
      }
    },
    {
      title: "Action",
      render: (record) => <></>
    }
  ];
  return <div></div>;
};

export default OrderTable;
