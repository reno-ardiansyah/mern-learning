import React, { useState } from "react";
import { useSearchParams} from "react-router-dom";
import HobbyTable from "../../molecules/Tables/HobbyTable";
import PaginationControl from "../Pagination/PaginationControl";
import HobbyModal from "../../molecules/Modals/HobbyModal";
import Button from "../../atoms/Button/Button";
import hobbyService, { IHobby } from "../../../services/hobbyService";
import Search from "../../molecules/Search";
import useFetchHobbies from "../../../hooks/useFetchHobbies";

const HobbyManager: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isLoading, hobbyList, fetchData } = useFetchHobbies();
  const [modalState, setModalState] = useState({
    isOpen: false,
    isEdit: false,
    initialValues: undefined as { id: string; name: string; description: string } | undefined,
  });
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentLimit = Number(searchParams.get("limit")) || 10;
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-3xl font-semibold">Hobby Manager</h3>
          <p className="">Manage your hobbies here</p>
        </div>
        <div className="flex gap-3">
          <Search />
          <Button
            type="primary"
            onClick={() => setModalState({ isOpen: true, isEdit: false, initialValues: undefined })}
          >
            Add Hobby
          </Button>
        </div>
      </div>
      <HobbyTable
        isLoading={isLoading}
        data={hobbyList?.data || []}
        onEdit={(item: IHobby) =>
          setModalState({
            isOpen: true,
            isEdit: true,
            initialValues: { id: item.id, name: item.name, description: item.description },
          })
        }
        onDelete={async (id: string) => {
          await hobbyService.deleteHobby(id);
          fetchData();
        }}
        pagination={{ page: currentPage, limit: currentLimit }}
      />
      <PaginationControl
        currentPage={currentPage}
        total={hobbyList?.totalCount || 0}
        pageSize={currentLimit}
      />
      <HobbyModal
        isOpen={modalState.isOpen}
        isEdit={modalState.isEdit}
        initialValues={modalState.initialValues}
        onClose={() => setModalState({ isOpen: false, isEdit: false, initialValues: undefined })}
        onRefresh={fetchData}
      />
    </div>
  );
};

export default HobbyManager;
