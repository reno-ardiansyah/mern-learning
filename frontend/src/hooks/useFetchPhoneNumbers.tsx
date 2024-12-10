import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import phoneNumberService, { IgetByPagination } from "../services/PhoneNumberService";
import personService, { IPerson } from "../services/peopleService";

const useFetchPhoneNumbers = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<IgetByPagination>();
  const [allPeople, setAllPeople] = useState<IPerson[]>();

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentLimit = Number(searchParams.get("limit")) || 10;
  const query = String(searchParams.get('query')) || '';

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await phoneNumberService.getPhoneNumbers(currentPage, currentLimit, query);
      setData(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllPeople = async () => {
    setIsLoading(true);
    try {
      const res: any = await personService.getPersons(1, 1000); // Fetch all people with a reasonable limit
      setAllPeople(res.data);
    } catch (error: any) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    fetchAllPeople();
  }, []);

  return { isLoading, data, fetchData, allPeople };
};

export default useFetchPhoneNumbers;
