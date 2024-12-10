import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PaginationControl from "../Pagination/PaginationControl";
import Button from "../../atoms/Button/Button";
import Search from "../../molecules/Search";
import useFetchPhoneNumbers from "../../../hooks/useFetchPhoneNumbers";
import PhoneNumberTable from "../../molecules/Tables/PhoneNumberTable";
import phoneNumberService, { IPhoneNumber } from "../../../services/PhoneNumberService";
import PhoneNumberModal from "../../molecules/Modals/PhoneNumberModal";

const PhoneNumberManager: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { data, fetchData, allPeople, isLoading } = useFetchPhoneNumbers();
  const [modalState, setModalState] = useState({
    isOpen: false,
    isEdit: false,
    initialValues: undefined as
      | {
          id: string;
          number: string;
          type: string;
          people: { id: string; name: string };
        }
      | undefined,
  });
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentLimit = Number(searchParams.get("limit")) || 10;

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-3xl font-semibold">PhoneNumber Manager</h3>
          <p className="">Manage your Phone Numbers here</p>
        </div>
        <div className="flex gap-3">
          <Search />
          <Button
            type="primary"
            onClick={() =>
              setModalState({
                isOpen: true,
                isEdit: false,
                initialValues: undefined,
              })
            }
          >
            Add Phone Number
          </Button>
        </div>
      </div>
      <PhoneNumberTable
        isLoading={isLoading}
        data={data?.phoneNumbers || []}
        onEdit={(item: IPhoneNumber) =>
          setModalState({
            isOpen: true,
            isEdit: true,
            initialValues: {
              id: item.id,
              number: item.number,
              type: item.type,
              people: { id: item.people.id, name: item.people.name },
            },
          })
        }
        pagination={{ page: currentPage, limit: currentLimit }}
        onDelete={async (id: string) => {
          await phoneNumberService.deletePhoneNumber(id);
          fetchData();
        }}
      />
      <PaginationControl
        currentPage={currentPage}
        total={data?.totalCount || 0}
        pageSize={currentLimit}
      />
      <PhoneNumberModal 
        isOpen={modalState.isOpen}
        isEdit={modalState.isEdit}
        initialValues={modalState.initialValues}
        onClose={() => setModalState({ isOpen: false, isEdit: false, initialValues: undefined })}
        onRefresh={fetchData}
        availablePeople={allPeople}
      />
    </div>
  );
};

export default PhoneNumberManager;
