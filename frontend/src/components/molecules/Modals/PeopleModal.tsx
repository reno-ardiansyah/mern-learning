import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import personService from "../../../services/peopleService"; 
import { ToastContainer, toast } from "react-toastify";
import { IHobby } from "../../../services/hobbyService";

interface PeopleModalProps {
  isOpen: boolean;
  isEdit: boolean;
  initialValues?: { id: string; name: string; age: number; hobbies: IHobby[] };
  onClose: () => void;
  onRefresh: () => void;
  availableHobbies: IHobby[] | undefined;
}

const PeopleModal: React.FC<PeopleModalProps> = ({ isOpen, isEdit, initialValues, onClose, onRefresh, availableHobbies }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEdit && initialValues) {
      // Map hobbies to array of IDs for the form
      const mappedInitialValues = {
        ...initialValues,
        hobbies: initialValues.hobbies?.map((hobby) => hobby.id), // Extract IDs from hobbies
      };
      form.setFieldsValue(mappedInitialValues);
    } else {
      form.resetFields();
    }
  }, [isEdit, initialValues, isOpen]);

  const handleSubmit = async (values: { name: string; age: number; hobbies: string[] }) => {
    console.log('values', values);
    try {
      if (isEdit) {
        await personService.updatePerson(initialValues?.id || "", values.name, values.age, values.hobbies);
        toast.success("Person updated successfully!");
      } else {
        await personService.addPerson(values.name, values.age, values.hobbies);
        toast.success("Person created successfully!");
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
        title={isEdit ? "Edit Person" : "Add Person"}
        open={isOpen}
        onCancel={onClose}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name is required!" }]}>            
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item name="age" label="Age" rules={[{ required: true, message: "Age is required!" }]}>            
            <Input type="number" placeholder="Enter age" />
          </Form.Item>
          <Form.Item name="hobbies" label="Hobbies" rules={[{ required: true, message: "Select at least one hobby!" }]}>            
            <Select mode="multiple" placeholder="Select hobbies">              
              {availableHobbies?.map((hobby) => (
                <Select.Option key={hobby.id} value={hobby.id}>
                  {hobby.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PeopleModal;