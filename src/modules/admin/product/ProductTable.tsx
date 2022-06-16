import EditOutlined from '@ant-design/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

import ActionButton from "components/Button/ActionButton"
import { IProduct } from 'types/product.model';
import { Table } from 'antd';

const ProductTable: FC<{ data: IProduct[], handleClickDelete: () => void }> = ({ data, handleClickDelete }) => {
  const navigate = useNavigate()
  const handleClickEdit = (id: number) => {
    navigate(`/${id}`)
  }
  const colums = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Decription',
    dataIndex: "decription",
    key: 'decription'
  },
  {
    title: 'Category Name',
    dataIndex: 'categoryName',
    key: 'categoryName'
  },
  {
    title: 'Status',
    dataIndex: 'isStock',
    key: 'isStock'
  },
  {
    title: 'Action',
    align: 'center' as 'center',
    render: (record: IProduct) => (
      <div >
        <ActionButton title={<EditOutlined />} id={record.id} action={handleClickEdit} />
        <ActionButton title={<DeleteOutlined />} id={record.id} action={handleClickDelete} />
      </div>
    )
  }
  ]
  return (
    <div>
      <Table dataSource={data} pagination={false} columns={colums} rowKey={record => record.id} />
    </div>
  )
}

export default ProductTable