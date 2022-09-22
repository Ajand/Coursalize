import { createContext, useState, useEffect, useCallback } from "react";
import CoursesAbi from "../abi/Courses.json";
import { ethers } from "ethers";
import { useContract, useContractRead, useContractWrite } from "wagmi";

export const DataContext = createContext({
  coursesContract: null,
  courseUser: null,
  setUser: null,
});

const coursesAddress = "0x0EaAADDF88f96ddf75AE3781be49f6F776f01E72";

export const DataProvider = ({ children }) => {
  const [coursesContract, setCoursesContract] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window?.ethereum);
      const signer = provider.getSigner();

      setCoursesContract(
        new ethers.Contract(coursesAddress, CoursesAbi, signer)
      );
    }
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

  return (
    <DataContext.Provider value={{ coursesContract, courseUser, setUser }}>
      {children}
    </DataContext.Provider>
  );
};
