"use client";

import React, { createContext, useContext, useState } from "react";

interface AdminBarContextType {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const AdminBarContext = createContext<AdminBarContextType | undefined>(undefined);

export const AdminBarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <AdminBarContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
    </AdminBarContext.Provider>
  );
};

export const useAdminBar = () => {
  const context = useContext(AdminBarContext);
  if (context === undefined) {
    throw new Error("useAdminBar must be used within an AdminBarProvider");
  }
  return context;
};
