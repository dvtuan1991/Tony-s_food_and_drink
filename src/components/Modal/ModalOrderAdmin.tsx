import { FC, useState } from "react";
import EditOutlined from "@ant-design/icons/EditOutlined";
import Modal from "antd/lib/modal";
import Select from "antd/lib/select";
import { AppDispatch } from "store";
import { useDispatch } from "react-redux";

import ActionButton from "components/Button/ActionButton";
import { updateStatusOrder } from "store/order.slice";

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
    value: "complete",
    title: "Complete"
  }
];

const { Option } = Select;
const ModalOrderAdmin: FC<{ orderId: string; status: string }> = ({
  orderId,
  status
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectStatus, setSelectStatus] = useState<string>(
    status.toLocaleLowerCase()
  );
  const dispatch = useDispatch<AppDispatch>();
  const handleClickOpen = () => {
    setIsModalVisible(true);
  };

  const handleChangeSelect = (value: string) => {
    setSelectStatus(value);
  };

  const handleChangeConfirm = async () => {
    if (selectStatus === status) {
      setIsModalVisible(true);
    }
    let data = { isComplete: false, isCancel: false };
    switch (selectStatus) {
      case "cancel":
        data = { isComplete: false, isCancel: true };
        break;
      case "complete":
        data = { isComplete: true, isCancel: false };
        break;
      default:
        break;
    }
    dispatch(updateStatusOrder({ id: orderId, ...data }))
      .unwrap()
      .then(() => {
        setIsModalVisible(false);
      });
  };

  const handleChangeCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <ActionButton action={handleClickOpen} icon={<EditOutlined />} />
      <Modal
        visible={isModalVisible}
        onCancel={handleChangeCancel}
        onOk={handleChangeConfirm}
        okText={<span className="text-[#000000d9]">OK</span>}
      >
        <div className="my-5 p-5">
          <Select
            defaultValue={selectStatus}
            onChange={handleChangeSelect}
            style={{ width: "100%" }}
          >
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
