import React from "react";
import { Table, Button } from "antd";
import { IHobby } from "../../../services/hobbyService";
import { timeAgo } from "../../../utils/TimeToDateAgo";

interface HobbyTableProps {
  data: IHobby[];
  onEdit: (item: IHobby) => void;
  onDelete: (id: string) => void;
  pagination: { page: number; limit: number };
  isLoading: boolean
}

const HobbyTable: React.FC<HobbyTableProps> = ({ data, onEdit, onDelete, pagination, isLoading }) => {
  console.log(data);
  
  const columns = [
    {
      title: "Index",
      render: (_: any, __: any, index: number) =>
        index + 1 + (pagination.page - 1) * pagination.limit,
    },
    { title: "Hobby Name", dataIndex: "name" },
    { title: "Description", dataIndex: "description" },
    { title: "Created At", render: (record: IHobby) => timeAgo(record.createdAt) },
    { title: "Updated At", render: (record: IHobby) => timeAgo(record.updatedAt) },
    {
      title: "Action",
      render: (record: IHobby) => (
        <>
          <Button type="link" onClick={() => onEdit(record)}>Edit</Button>
          <Button danger onClick={() => onDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} loading={isLoading} bordered showSorterTooltip rowKey="id" pagination={false} className="my-5"/>;
};

export default HobbyTable;
