import { createContext, useContext } from "react";

const RoleContext = createContext("ADMIN");

export function RoleProvider({ role = "ADMIN", children }) {
  return (
    <RoleContext.Provider value={role}>
      {children}
    </RoleContext.Provider>
  );
}

export const useRole = () => useContext(RoleContext);
