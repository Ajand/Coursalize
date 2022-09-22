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
});

const TABLE_LAND_URI = "https://testnet.tableland.network";
const coursesAddress = "0x0EaAADDF88f96ddf75AE3781be49f6F776f01E72";
const userTable = "coursalize_80001_2641";

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

  return (
    <DataContext.Provider
      value={{ coursesContract, courseUser, setUser, getUserInfo, tableland }}
    >
      {children}
    </DataContext.Provider>
  );
};
