import { createContext, useState, useEffect, useCallback } from "react";
import CoursesAbi from "../abi/Courses.json";
import { ethers } from "ethers";
import { useContract, useContractRead } from "wagmi";

export const DataContext = createContext({
  coursesContract: null,
  courseUser: null,
});

export const DataProvider = ({ children }) => {
  const coursesContract = useContract({
    addressOrName: "0x966304d033F5a4064419CaE9288d2b30DC83D9d4",
    contractInterface: CoursesAbi,
  });

  const courseUser = (userAddress) =>
    useContractRead({
      addressOrName: "0x966304d033F5a4064419CaE9288d2b30DC83D9d4",
      contractInterface: CoursesAbi,
      functionName: "_users",
      args: userAddress,
    });

  return (
    <DataContext.Provider value={{ coursesContract, courseUser }}>
      {children}
    </DataContext.Provider>
  );
};
