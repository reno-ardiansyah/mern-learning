import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import hobbyService, { IgetByPagination } from "../services/hobbyService";

const useFetchHobbies = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hobbyList, setHobbyList] = useState<IgetByPagination>();

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentLimit = Number(searchParams.get("limit")) || 10;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await hobbyService.getHobbies(currentPage, currentLimit);
      setHobbyList(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  return { isLoading, hobbyList, fetchData };
};

export default useFetchHobbies;
