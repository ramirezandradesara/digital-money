 import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const DataUser = createContext();

const UserDataContext = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null)
  const [modalFlag, setModalFlag] = useState(false);

  let router = useRouter();

  useEffect(() => {
    setModalFlag(false)
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      setToken(token)
      getAccountData(token);
    } else {
      console.log("NO ESTA LOGEADO");
    }
  }, []);

  const getAccountData = async (token) => {
    const response = await fetch(`https://digitalmoney.ctd.academy/api/account`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    })

    const jsonResponse = await response.json()
    const responseUserData = await getUserData(jsonResponse.user_id, token);
    setUserData({ ...jsonResponse, ...responseUserData });
  };

  const getUserData = async (id, token) => {
    const response = await fetch(`https://digitalmoney.ctd.academy/api/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    })
    const jsonResponse = await response.json()

    const { firstname, lastname, email, dni, phone } = jsonResponse;
    return { firstname, lastname, email, dni, phone };
  }
  return (
    <DataUser.Provider value={{ userData, setUserData, token, setToken, modalFlag, setModalFlag }}>
      {children}
    </DataUser.Provider>
  );
};

export default UserDataContext; 
