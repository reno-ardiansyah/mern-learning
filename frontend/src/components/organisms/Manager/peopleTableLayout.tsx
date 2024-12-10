import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PaginationControl from "../Pagination/PaginationControl";
import Button from "../../atoms/Button/Button";
import { IHobby } from "../../../services/hobbyService";
import Search from "../../molecules/Search";
import useFetchPeoples from "../../../hooks/useFetchPeoples";
import PeopleTable from "../../molecules/Tables/PeopleTable";
import personService, { IPerson } from "../../../services/peopleService";
import PeopleModal from "../../molecules/Modals/PeopleModal";

const PeopleManager: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { data, fetchData, allHobby, isLoading } = useFetchPeoples();
  const [modalState, setModalState] = useState({
    isOpen: false,
    isEdit: false,
    initialValues: undefined as
      | {
          id: string;
          name: string;
          age: number;
          hobbies: IHobby[];
        }
      | undefined,
  });
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentLimit = Number(searchParams.get("limit")) || 10;

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-3xl font-semibold">People Manager</h3>
          <p className="">Manage your Peoples here</p>
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
            Add People
          </Button>
        </div>
      </div>
      <PeopleTable
        isLoading={isLoading}
        data={data?.data}
        onEdit={(item: any) => 
          setModalState({
            isOpen: true,
            isEdit: true,
            initialValues: {
              id: item.id,
              name: item.name,
              age: item.age,
              hobbies: item.hobbies?.map((hobby: any) => ({
                name: hobby.name,
                id: hobby.id,
              })) || [],
            },
          })
        }
        pagination={{ page: currentPage, limit: currentLimit }}
        onDelete={async (id: string) => {
          await personService.deletePerson(id);
          fetchData();
        }}
      />
      <PaginationControl
        currentPage={currentPage}
        total={data?.totalCount || 0}
        pageSize={currentLimit}
      />
      <PeopleModal 
          isOpen={modalState.isOpen}
          isEdit={modalState.isEdit}
          initialValues={modalState.initialValues}
          onClose={() => setModalState({ isOpen: false, isEdit: false, initialValues: undefined })}
          onRefresh={fetchData}
          availableHobbies={allHobby}
      />
    </div>
  );
};

export default PeopleManager;