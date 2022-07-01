import { FC, useState } from "react";
import Button from "antd/lib/button";
import Popconfirm from "antd/lib/popconfirm";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";

interface PopConfirmDeleteProps {
  title: string;
  id: number | string;
  handleConfirmDelete: (id: number | string) => void;
}

const PopConfirmDelete: FC<PopConfirmDeleteProps> = ({
  title,
  id,
  handleConfirmDelete
}) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleCancel = () => {
    setVisible(false);
  };

  const handleok = () => {
    setConfirmLoading(true);
    handleConfirmDelete(id);
  };

  const handleClickButton = () => {
    setVisible(true);
  };

  return (
    <div>
      <Popconfirm
        title={title}
        visible={visible}
        placement="left"
        onConfirm={handleok}
        okType={"danger"}
        okButtonProps={{ loading: confirmLoading }}
        onCancel={handleCancel}
      >
        <Button
          icon={<DeleteOutlined />}
          onClick={handleClickButton}
          shape="circle"
          danger
        />
      </Popconfirm>
    </div>
  );
};

export default PopConfirmDelete;
