import { Form, Input, Modal } from 'antd';
import React, { useContext } from 'react';
import { AppProviderContext } from '../context/AppProvider';
import { AuthContext } from '../context/Auth';
import { addFireStore } from '../config/service';

export default function ModalAddRoom() {
    const { isOpenModalAddRoom, setIsOpenModalAddRoom } = useContext(AppProviderContext);
  const user = useContext(AuthContext);
  const [form] = Form.useForm();
  const handleOk = (values) => {
    addFireStore('rooms', {
      name: form.getFieldValue('nameRoom'),
      description: form.getFieldValue('desRoom'),
      uid: [user.uid]
    });
    form.resetFields();
    setIsOpenModalAddRoom(false);
  };
  const handleCancle = () => {
    setIsOpenModalAddRoom(false);
  };
  return (
    <Modal open={isOpenModalAddRoom} onOk={handleOk} onCancel={handleCancle}>
      <Form layout="vertical" form={form}>
        <Form.Item label="Tên Phòng" name="nameRoom">
          <Input placeholder="Nhập tên Phòng" />
        </Form.Item>
        <Form.Item label="Mô tả" name="desRoom">
          <Input placeholder="Nhập mô tả" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
