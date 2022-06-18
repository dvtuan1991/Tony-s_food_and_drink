import Space from 'antd/lib/space';
import Table, { ColumnsType } from 'antd/lib/table';
import ActionButton from 'components/Button/ActionButton';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import { FC } from 'react';

import { ICategory } from 'types/category.model';
import ModalEditable from 'components/Modal/ModalEditable';

const CategoryTable: FC<{ data: ICategory[], handleClickDelete: (id: number) => void }> = ({ data, handleClickDelete }) => {
  const colums: ColumnsType<ICategory> = [{
    dataIndex: 'ordinalNum',
    key: 'ordinalNum',
    align: 'center' as 'center',
    width: '5%'
  }, {
    title: 'Name',
    dataIndex: 'name',
    key: 'categoryname'
  }, {
    title: 'Action',
    width: "10%",
    align: 'center' as 'center',
    key: 'action',
    render: (record: ICategory) => (
      <Space >
        <ModalEditable record={record} />
        <ActionButton icon={<DeleteOutlined />} id={record.id} action={handleClickDelete} className="text-red-700" />
      </Space>
    )

  }]


  return (
    <div className='pt-5 pb-5'>
      <Table dataSource={data} pagination={false} columns={colums} className="min-h-[150px]" rowKey={record => record.id} />
    </div>
  )
}

export default CategoryTable