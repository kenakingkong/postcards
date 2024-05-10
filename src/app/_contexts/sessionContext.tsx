"use client";

import { createClient } from "@/_utils/supabase/client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ISessionContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const SessionContext = createContext<ISessionContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const useIsLoggedIn = () => {
  return useContext(SessionContext).isLoggedIn;
};

export const useSetIsLoggedIn = () => {
  return useContext(SessionContext).setIsLoggedIn;
};

export const SessionContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const supabase = createClient();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchAndSetUser() {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data.user.id && isMounted) {
        setIsLoggedIn(true);
      }
    }

    fetchAndSetUser();

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <SessionContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
