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
  getCourseLectures: null,
  getLecture: null,
  getUserCourses: null,
  getAllCourses: null,
  getUserEnrollments: null,
  getCoursesByIds: null,
});

const TABLE_LAND_URI = "https://testnet.tableland.network";
const coursesAddress = "0xdE07a326c07c0427022A8FA9193401Aa238EF6F3";
const userTable = "coursalize_80001_2749";
const lectureTable = "coursalize_80001_2748";
const courseTable = "coursalize_80001_2747";

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
      return tableland.read(`SELECT * FROM ${courseTable} WHERE id=${id}`);
    }
  };

  const getUserCourses = async (userAddress) => {
    if (tableland) {
      return tableland.read(
        `SELECT * FROM ${courseTable} WHERE instructor='${userAddress}'`
      );
    }
  };

  const getAllCourses = async () => {
    if (tableland) {
      return tableland.read(`SELECT * FROM ${courseTable}`);
    }
  };

  const getCourseLectures = async (courseId) => {
    if (tableland) {
      return tableland.read(
        `SELECT * FROM ${lectureTable} WHERE courseId=${courseId}`
      );
    }
  };

  const getLecture = async (lectureId) => {
    if (tableland) {
      return tableland.read(
        `SELECT * FROM ${lectureTable} WHERE id=${lectureId}`
      );
    }
  };

  const getUserEnrollments = async (userAddress) => {
    const key = "ckey_c9c5be34b110429bab5387c7873";
    const baseUri = "https://api.covalenthq.com/v1";

    const options = {
      method: "GET",
      url: `https://api.covalenthq.com/v1/80001/address/${userAddress}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=true&key=${key}`,
      headers: {
        accept: "application/json",
      },
    };

    return axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        return response.data.data;
      })
      .then((result) => result.items)
      .then((items) =>
        items.filter((item) => {
          console.log(item)
          return (
            item.contract_address.toLowerCase() === coursesAddress.toLowerCase()
          );
        })
      )
      .catch(function (error) {
        return error;
      });
  };

  const getCoursesByIds = async (ids) => {
    console.log(ids);
    if (tableland) {
      console.log(
        `SELECT * FROM ${courseTable} WHERE id IN (${ids.join(", ")})`
      );

      try {
        const a = await tableland.read(
          `SELECT * FROM ${courseTable} WHERE id IN (${ids.join(", ")})`
        );

        return a;
      } catch (err) {
        console.log(err);
      }
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
        getCourseLectures,
        getLecture,
        getUserCourses,
        getAllCourses,
        getUserEnrollments,
        getCoursesByIds,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
