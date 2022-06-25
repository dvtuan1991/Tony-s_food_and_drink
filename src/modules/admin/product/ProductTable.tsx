import EditOutlined from "@ant-design/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import Table from "antd/lib/table";
import Space from "antd/lib/space";
import type { ColumnsType } from "antd/lib/table";

import ActionButton from "components/Button/ActionButton";
import { IProduct } from "types/product.model";
import { setLimitTring } from "helpers/function";

export type Breakpoint = "xxl" | "xl" | "lg" | "md" | "sm" | "xs";

const ProductTable: FC<{
  data: IProduct[];
  handleClickDelete: (id: number) => void;
}> = ({ data, handleClickDelete }) => {
  const navigate = useNavigate();
  const handleClickEdit = (id: number) => {
    navigate(`/admin/product/${id}`);
  };
  const colums: ColumnsType<IProduct> = [
    {
      dataIndex: "ordinalNum",
      align: "center" as "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      align: "center" as "center",
      width: "10%",
      key: "name",
    },
    {
      title: "Decription",
      dataIndex: "decription",
      key: "decription",
      width: "40%",
      responsive: ["lg"] as Breakpoint[],
      align: "center" as "center",
      render: (text: string) => <span>{setLimitTring(text, 120)}</span>,
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      align: "center" as "center",
      key: "categoryName",
    },
    {
      title: "Status",
      dataIndex: "isStock",
      key: "isStock",
      render: (isStock: boolean) => <span>{isStock ? "Yes" : "No"}</span>,
    },
    {
      title: "Price",
      dataIndex: "newPrice",
      key: "Price",
      render: (text: string) => <span>{`${text} $`}</span>,
    },
    {
      title: "Action",
      width: "10%",
      align: "center" as "center",
      render: (record: IProduct) => (
        <Space>
          <ActionButton
            icon={<EditOutlined />}
            id={record.id}
            action={handleClickEdit}
            className="text-cyan-700"
          />
          <ActionButton
            icon={<DeleteOutlined />}
            id={record.id}
            action={handleClickDelete}
            className="text-red-700"
          />
        </Space>
      ),
    },
  ];
  return (
    <div className="py-5">
      <Table
        dataSource={data}
        pagination={false}
        columns={colums}
        rowKey={(record) => record.id}
        className="min-h-[300px]"
      />
    </div>
  );
};

export default ProductTable;
