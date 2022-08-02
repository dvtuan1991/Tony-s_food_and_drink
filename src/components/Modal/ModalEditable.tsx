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
import { defaultValidateMessages } from "helpers/common";
import { useForm } from "antd/lib/form/Form";

const ModalEditable = ({
  handleEdit,
  isCreate,
  record
}: {
  handleEdit: () => void;
  isCreate?: boolean;
  record?: ICategory;
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const buttonRef = useRef<any>();
  const [form] = useForm();
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
        handleEdit();
        form.setFieldsValue({ name: "" });
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
          handleEdit();
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
          validateMessages={defaultValidateMessages}
          form={form}
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
