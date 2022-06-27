import Form from "antd/lib/form";
import Input from "antd/lib/input/Input";
import Modal from "antd/lib/modal/Modal";
import { useRef, useState } from "react";
import EditOutlined from "@ant-design/icons/EditOutlined";

import ActionButton from "components/Button/ActionButton";
import { ICategory } from "types/category.model";
import { openNotification } from "helpers/function";
import { SERVICE_API } from "constants/configs";
import ButtonAddNew from "components/Button/ButtonAddNew";

const ModalEditable = ({
  isCreate,
  record
}: {
  isCreate?: boolean;
  record?: ICategory;
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const buttonRef = useRef<any>();
  const handleClickOpen = () => {
    setIsModalVisible(true);
  };

  const handleFormValue = async (value: ICategory) => {
    if (isCreate) {
      const res = await fetch(`${SERVICE_API}/category`, {
        method: "POST",
        body: JSON.stringify(value),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (res.ok) {
        openNotification("success", "Create Success");
        setIsModalVisible(false);
      }
      if (!res.ok) {
        openNotification("error", "Update Falied");
      }
    }
    if (!isCreate) {
      if (record?.name === value.name.trim()) {
        openNotification("info", "No thing change");
        setIsModalVisible(false);
      }
      if (record?.name !== value.name.trim()) {
        const resUpdate = await fetch(
          `${SERVICE_API}/category/${record?.id}/update`,
          {
            method: "PUT",
            body: JSON.stringify(value),
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        if (resUpdate.ok) {
          openNotification("success", "Update Success");
          setIsModalVisible(false);
        }
        if (!resUpdate.ok) {
          openNotification("error", "Update Falied, Try again later");
        }
      }
    }
  };

  const hanleClickConfirm = () => {
    buttonRef.current && buttonRef.current.click();
  };

  const handleClickCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      {isCreate ? (
        <ButtonAddNew onClick={handleClickOpen} />
      ) : (
        <ActionButton action={handleClickOpen} icon={<EditOutlined />} />
      )}
      <Modal
        visible={isModalVisible}
        onOk={hanleClickConfirm}
        onCancel={handleClickCancel}
        okText={<span className="text-[#000000d9]">OK</span>}
        
      >
        <Form
          initialValues={{ name: isCreate ? "" : record?.name }}
          onFinish={handleFormValue}
          className="p-5"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, max: 20 }]}
          >
            <Input />
          </Form.Item>
          <input type="submit" value="Submit" ref={buttonRef} hidden={true} />
        </Form>
      </Modal>
    </>
  );
};

ModalEditable.defaultProps = {
  isCreate: false,
  record: {} as ICategory
};

export default ModalEditable;
