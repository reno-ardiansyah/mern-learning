import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Pagination } from "antd";

type Props = {
  currentPage: number;
  total: number;
  pageSize: number;
};

const PaginationControl: React.FC<Props> = ({
  currentPage,
  total,
  pageSize,
}) => {
  const navigate = useNavigate(); 
  const [searchParams] = useSearchParams(); 

  const handlePageChange = (page: number, pageSize: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    params.set("limit", pageSize.toString());
    navigate(`?${params.toString()}`);
  };

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);

  return (
    <div className="flex justify-between mt-3">
      <p className="mt-2 text-sm">
        Showing <strong>{start}-{end}</strong> of <strong>{total}</strong> items
      </p>
      <Pagination
        current={currentPage}
        total={total}
        pageSize={pageSize}
        onChange={handlePageChange}
        showSizeChanger
      />
    </div>
  );
};

export default PaginationControl;
