import Table, { ColumnsType } from "antd/lib/table";
import Typography from "antd/lib/typography";
import ModalOrderAdmin from "components/Modal/ModalOrderAdmin";
import { changePriceOutput } from "helpers/function";
import { FC } from "react";

import { IOrder } from "types/order.model";

const { Text } = Typography;
const OrderTable: FC<{ orders: IOrder[] }> = ({ orders }) => {
  console.log(orders);

  const colums: ColumnsType<IOrder> = [
    {
      dataIndex: "ordinalNum",
      key: "ordinalNum",
      align: "center",
      width: "5%"
    },
    {
      title: "Shipping to",
      dataIndex: "userAddress",
      key: "userAddress"
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => <Text>{changePriceOutput(price)}</Text>
    },
    {
      title: "Status",
      render: (record: IOrder) => {
        if (record.isCancel) {
          return <Text>Cancel</Text>;
        }
        if (record.isComplete) {
          return <Text>Complete</Text>;
        }
        return <Text>Shipping</Text>;
      }
    },
    {
      title: "Action",
      render: (record) => {
        if (record.isCancel) {
          return <ModalOrderAdmin orderId={record.id} status={"cancel"} />;
        }
        if (record.isComplete) {
          return <ModalOrderAdmin orderId={record.id} status={"complete"} />;
        }
        return <ModalOrderAdmin orderId={record.id} status={"shipping"} />;
      }
    }
  ];
  return (
    <div className="py-5">
      <Table
        dataSource={orders}
        columns={colums}
        pagination={false}
        className="min-h-[300px]"
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default OrderTable;
