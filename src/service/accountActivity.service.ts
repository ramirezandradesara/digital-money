import { getAccountStorage } from "../utils/types/account";
import { getAuthStorage, removeAuthStorage } from "../utils/types/auth";

const API_URL = "https://digitalmoney.ctd.academy";

export const getAccountActivity = async (userData: any) => {
  const token = getAuthStorage();
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  try {
    const response = await fetch(
      `${API_URL}/api/accounts/${userData?.id}/activity`,
      config as RequestInit
    );
    if (response.ok) {
      return response.json();
    } else {
      console.error("Error de la API:", response.statusText);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};

export const getAccount = async () => {
  const token = localStorage.getItem("token");
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  try {
    const response = await fetch(
      `${API_URL}/api/account`,
      config as RequestInit
    );
    if (response.ok) {
      return response.json();
    } else {
      console.error("Error de la Api", response.statusText);
    }
  } catch (error) {
    console.error("Error en la solicitud", error);
  }
};

export const getTransactions = async (
  accountId: number,
  transactionId: string
) => {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  };
  const response = await fetch(
    `${API_URL}/api/accounts/${accountId}/transactions/${transactionId}`,
    config as RequestInit
  );
  if (response.status === 401) {
    removeAuthStorage();
    return false;
  }
  return response.json();
};

export const getTransaction = async (
  accountId: number,
  transactionId: string
) => {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthStorage(),
    },
  };
  const response = await fetch(
    `${API_URL}/api/accounts/${accountId}/transactions/${transactionId}`,
    config as RequestInit
  );
  if (response.status === 401) {
    removeAuthStorage();
    return false;
  }
  return response.json();
};
