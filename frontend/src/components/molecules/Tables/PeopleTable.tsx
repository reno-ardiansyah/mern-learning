import React from "react";
import { Table, Button } from "antd";
import { timeAgo } from "../../../utils/TimeToDateAgo";
import { IPerson } from "../../../services/peopleService";


interface PeopleTableProps {
  data: IPerson[];
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  pagination: { page: number; limit: number };
  isLoading: boolean;
}

const PeopleTable: React.FC<PeopleTableProps> = ({ data, onEdit, onDelete, pagination, isLoading }) => {  
  const columns = [
    {
      title: "Index",
      render: (_: any, __: any, index: number) =>
        index + 1 + (pagination.page - 1) * pagination.limit,
    },
    { title: "Name", dataIndex: "name" },
    { title: "Umur", dataIndex: "age" },
    {
      title: "Hobbies",
      render: (record: IPerson) =>
        record.hobbies.length > 0
          ? record.hobbies.map((hobby) => hobby.name).join(", ")
          : "No hobbies",
    },
    { title: "Created At", render: (record: IPerson) => timeAgo(record?.createdAt) },
    { title: "Updated At", render: (record: IPerson) => timeAgo(record?.updatedAt) },
    {
      title: "Action",
      render: (record: IPerson) => (
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

export default PeopleTable;
