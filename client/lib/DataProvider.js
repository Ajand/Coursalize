import { createContext, useState, useEffect, useCallback } from "react";
import CoursesAbi from "../abi/Courses.json";
import { ethers } from "ethers";
import { useContract, useContractRead, useContractWrite } from "wagmi";
import axios from "axios";
import { connect } from "@tableland/sdk";

export const DataContext = createContext({
  coursesContract: null,
  courseUser: null,
  setUser: null,
  getUserInfo: null,
  tableland: null,
  courseIds: null,
  getCourseInfo: null,
});

const TABLE_LAND_URI = "https://testnet.tableland.network";
const coursesAddress = "0xC10C99f625E851593AA1D450DF1db9e040bc19eA";
const userTable = "coursalize_80001_2725";
const lectureTable = "coursalize_80001_2724"; 
const courseTable = "coursalize_80001_2723";

export const DataProvider = ({ children }) => {
  const [coursesContract, setCoursesContract] = useState(null);
  const [tableland, setTableland] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window?.ethereum);
      const signer = provider.getSigner();

      setCoursesContract(
        new ethers.Contract(coursesAddress, CoursesAbi, signer)
      );
    }

    const main = async () => {
      const tableland = await connect({
        network: "testnet",
        chain: "polygon-mumbai",
      });

      setTableland(tableland);
    };

    main();
  }, []);

  const courseIds = (userAddress) =>
    useContractRead({
      addressOrName: coursesAddress,
      contractInterface: CoursesAbi,
      functionName: "_courseIds",
    });

  const courseUser = (userAddress) =>
    useContractRead({
      addressOrName: coursesAddress,
      contractInterface: CoursesAbi,
      functionName: "_users",
      args: userAddress,
    });

  const setUser = (args) =>
    useContractWrite({
      addressOrName: coursesAddress,
      contractInterface: CoursesAbi,
      functionName: "setUser",
      args,
    });

  const getUserInfo = async (address) => {
    if (tableland) {
      return tableland.read(
        `SELECT * FROM ${userTable} WHERE address='${address}'`
      );
    }
  };

  const getCourseInfo = async (id) => {
    if (tableland) {
      return tableland.read(`SELECT * FROM ${courseTable} WHERE id=id`);
    }
  };

  return (
    <DataContext.Provider
      value={{
        coursesContract,
        courseUser,
        setUser,
        getUserInfo,
        tableland,
        courseIds,
        getCourseInfo,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
