import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import hobbyService from "../../../services/hobbyService";
import { ToastContainer, toast } from "react-toastify";

interface HobbyModalProps {
  isOpen: boolean;
  isEdit: boolean;
  initialValues?: { id: string; name: string; description: string };
  onClose: () => void;
  onRefresh: () => void;
}

const HobbyModal: React.FC<HobbyModalProps> = ({ isOpen, isEdit, initialValues, onClose, onRefresh }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEdit && initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [isEdit, initialValues, isOpen]);

  const handleSubmit = async (values: { name: string; description: string }) => {
    try {
      if (isEdit) {
        await hobbyService.updateHobby(initialValues?.id || "", values.name, values.description);
        toast.success("Hobby updated successfully!");
      } else {
        await hobbyService.addHobby(values.name, values.description);
        toast.success("Hobby created successfully!");
      }
      onRefresh();
      onClose();
    } catch (error) {
      toast.error("Failed to submit data.");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Modal
        title={isEdit ? "Edit Hobby" : "Add Hobby"}
        open={isOpen}
        onCancel={onClose}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name is required!" }]}>
            <Input placeholder="Enter hobby name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Description is required!" }]}
          >
            <Input.TextArea placeholder="Enter hobby description" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default HobbyModal;
