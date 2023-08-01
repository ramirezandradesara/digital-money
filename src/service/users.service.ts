export const API_URL = "https://digitalmoney.ctd.academy";

import { responseHandler } from "../utils/handlers/response-handler";

export type RegisterType = {
  dni: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
};

export type RegisterReturnType = {
  account_id: number;
  email: string;
  user_id: number;
};

const UserService = {
  register: async (data: RegisterType): Promise<RegisterReturnType> => {
    const url = API_URL + "/api/users";

    const body = data as unknown as BodyInit;
    setTimeout(() => {
      console.log("body", body);
    }, 5000);

    const res = await fetch(url, {
      method: "POST",
      body,
    });

    const validatedResponse = await responseHandler(res, 201);

    if (!validatedResponse.data) throw new Error(validatedResponse.message);

    return validatedResponse?.data as RegisterReturnType;
  },
};

export default UserService;
