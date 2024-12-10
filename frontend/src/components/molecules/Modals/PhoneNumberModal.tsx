import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import phoneNumberService from "../../../services/PhoneNumberService";
import { ToastContainer, toast } from "react-toastify";
import { IPerson } from "../../../services/peopleService";

interface PhoneNumberModalProps {
  isOpen: boolean;
  isEdit: boolean;
  initialValues?: { id: string; number: string; type: string; peopleId: string };
  onClose: () => void;
  onRefresh: () => void;
  availablePeople: IPerson[] | undefined;
}

const PhoneNumberModal: React.FC<PhoneNumberModalProps> = ({ isOpen, isEdit, initialValues, onClose, onRefresh, availablePeople }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEdit && initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [isEdit, initialValues, isOpen]);

  const handleSubmit = async (values: { number: string; type: string; peopleId: string }) => {
    console.log('values', values);
    try {
      if (isEdit) {
        await phoneNumberService.updatePhoneNumber(initialValues?.id || "", values.number, values.type, values.peopleId);
        toast.success("PhoneNumber updated successfully!");
      } else {
        await phoneNumberService.addPhoneNumber(values.number, values.type, values.peopleId);
        toast.success("PhoneNumber created successfully!");
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
        title={isEdit ? "Edit PhoneNumber" : "Add PhoneNumber"}
        open={isOpen}
        onCancel={onClose}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="number" label="Number" rules={[{ required: true, message: "Number is required!" }]}>            
            <Input placeholder="Enter phone number" />
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true, message: "Type is required!" }]}>            
            <Input placeholder="Enter phone type" />
          </Form.Item>
          <Form.Item name="peopleId" label="People ID" rules={[{ required: true, message: "Select a person!" }]}>
            <Select placeholder="Select person">
              {availablePeople?.map((person) => (
                <Select.Option key={person.id} value={person.id}>
                  {person.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PhoneNumberModal;
