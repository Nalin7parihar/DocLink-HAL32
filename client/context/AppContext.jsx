import React from "react";
import { createContext } from "react";
import { doctors } from "../src/assets/assets";

export const AppContext = createContext();

export default function AppContextProvider(props) {
  
  const value = {
    doctors
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}