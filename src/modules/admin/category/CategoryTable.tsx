import Space from "antd/lib/space";
import Table, { ColumnsType } from "antd/lib/table";
import { FC } from "react";

import { ICategory } from "types/category.model";
import ModalEditable from "components/Modal/ModalEditable";
import PopConfirmDelete from "components/Button/PopConfirmDelete";

const CategoryTable: FC<{
  data: ICategory[];
  handleClickDelete: (id: number | string) => void;
}> = ({ data, handleClickDelete }) => {
  const colums: ColumnsType<ICategory> = [
    {
      dataIndex: "ordinalNum",
      key: "ordinalNum",
      align: "center" as "center",
      width: "5%"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "categoryname"
    },
    {
      title: "Action",
      width: "10%",
      align: "center" as "center",
      key: "action",
      render: (record: ICategory) => (
        <Space>
          <ModalEditable record={record} />
          <PopConfirmDelete
            title={"Are you sure to delete this category"}
            id={record.id}
            handleConfirmDelete={handleClickDelete}
          />
        </Space>
      )
    }
  ];

  return (
    <div className="py-5">
      <Table
        dataSource={data}
        columns={colums}
        pagination={false}
        className="min-h-[300px]"
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default CategoryTable;
