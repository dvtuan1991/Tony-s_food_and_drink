import { FC, useState } from "react";
import EditOutlined from "@ant-design/icons/EditOutlined";
import Modal from "antd/lib/modal";
import Select from "antd/lib/select";

import ActionButton from "components/Button/ActionButton";

const selectList = [
  {
    id: 0,
    value: "cancel",
    title: "Cancel"
  },
  {
    id: 1,
    value: "shipping",
    title: "Shipping"
  },
  {
    id: 2,
    value: "Complete",
    title: "Complete"
  }
];

const { Option } = Select;
const ModalOrderAdmin: FC<{orderId: string ;status: string}> = ({orderId, status}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleClickOpen = () => {
    setIsModalVisible(true);
  };
  return (
    <div>
      <ActionButton action={handleClickOpen} icon={<EditOutlined />} />
      <Modal visible={isModalVisible}>
        <div>
          <Select defaultValue={status}>
            {selectList.map((item) => (
              <Option key={item.id} label={item.title} value={item.value}>
                {item.title}
              </Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default ModalOrderAdmin;
