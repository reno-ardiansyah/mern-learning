import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import personService, { IgetByPagination } from "../services/peopleService";
import hobbyService, { IHobby } from "../services/hobbyService";

const useFetchPeoples = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<IgetByPagination>();
  const [allHobby, setAllHoby] = useState<IHobby[]>();

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentLimit = Number(searchParams.get("limit")) || 10;
  const query = String(searchParams.get('query')) || ''

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await personService.getPersons(currentPage, currentLimit, query);
      setData(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllHobbies = async () => {
    setIsLoading(true);
    try {
      const res: any = await hobbyService.getAllHobbies()
      setAllHoby(res.data.data);
    } catch (error: any) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    fetchAllHobbies()
  }, [])

  return { isLoading, data, fetchData, allHobby };
};

export default useFetchPeoples;
