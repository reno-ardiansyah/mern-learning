import React from "react";
import { Table, Button } from "antd";
import { timeAgo } from "../../../utils/TimeToDateAgo";
import { IPhoneNumber } from "../../../services/PhoneNumberService";

interface PhoneNumberTableProps {
  data: IPhoneNumber[];
  onEdit: (item: IPhoneNumber) => void;
  onDelete: (id: string) => void;
  pagination: { page: number; limit: number };
  isLoading: boolean;
}

const PhoneNumberTable: React.FC<PhoneNumberTableProps> = ({ data, onEdit, onDelete, pagination, isLoading }) => {  
  const columns = [
    {
      title: "Index",
      render: (_: any, __: any, index: number) =>
        index + 1 + (pagination.page - 1) * pagination.limit,
    },
    { title: "Number", dataIndex: "number" },
    { title: "Type", dataIndex: "type" },
    { title: "People ID", dataIndex: "peopleId" },
    { title: "Created At", render: (record: IPhoneNumber) => timeAgo(record.createdAt) },
    { title: "Updated At", render: (record: IPhoneNumber) => timeAgo(record.updatedAt) },
    {
      title: "Action",
      render: (record: IPhoneNumber) => (
        <>
          <Button type="link" onClick={() => onEdit(record)}>Edit</Button>
          <Button danger onClick={() => onDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      loading={isLoading}
      bordered
      showSorterTooltip
      rowKey="id"
      pagination={false}
      className="my-5"
    />
  );
};

export default PhoneNumberTable;
