import EditOutlined from "@ant-design/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import Table from "antd/lib/table";
import Space from "antd/lib/space";
import type { ColumnsType } from "antd/lib/table";

import ActionButton from "components/Button/ActionButton";
import { IProduct } from "types/product.model";
import PopConfirmDelete from "components/Button/PopConfirmDelete";

export type Breakpoint = "xxl" | "xl" | "lg" | "md" | "sm" | "xs";

const ProductTable: FC<{
  data: IProduct[];
  handleClickDelete: (id: number | string) => void;
}> = ({ data, handleClickDelete }) => {
  const navigate = useNavigate();
  const handleClickEdit = (id: number) => {
    navigate(`/admin/product/${id}`);
  };
  const colums: ColumnsType<IProduct> = [
    {
      dataIndex: "ordinalNum",
      align: "center" as "center",
      width: "10%"
    },
    {
      title: "Name",
      dataIndex: "name",
      align: "center" as "center",
      key: "name",
      className: "xs:w-20 sm:w-20 "
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      align: "center" as "center",
      key: "categoryName",
      className: "xs:w-[100px] sm:w-[100px]"
    },
    {
      title: "In Stock",
      dataIndex: "isStock",
      key: "isStock",
      className: "xs:w-[100px] sm:w-[100px] ",
      render: (isStock: boolean) => <span>{isStock ? "Yes" : "No"}</span>
    },
    {
      title: "Price",
      dataIndex: "newPrice",
      width: "10%",
      key: "Price",
      className: "xs:w-[100px] sm:w-[100px]",
      render: (text: string) => <span>{`${text} $`}</span>
    },
    {
      title: "Action",
      width: "10%",
      align: "center" as "center",
      fixed: "right",
      className: "xs:w-[100px] sm:w-[100px] lg:w-[10%]",
      render: (record: IProduct) => (
        <Space>
          <ActionButton
            icon={<EditOutlined />}
            id={record.id}
            action={handleClickEdit}
            className="text-cyan-700"
          />
          <PopConfirmDelete
            handleConfirmDelete={handleClickDelete}
            title={"Are you sure to delete this product?"}
            id={record.id}
          />
        </Space>
      )
    }
  ];
  return (
    <div className="py-5">
      <Table
        dataSource={data}
        pagination={false}
        columns={colums}
        rowKey={(record) => record.id}
        className="min-h-[300px]"
        scroll={{ x: 900 }}
      />
    </div>
  );
};

export default ProductTable;
