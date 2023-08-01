import type { NextApiRequest, NextApiResponse } from "next";
import UserService, {
  RegisterReturnType,
  RegisterType,
} from "../../service/users.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterReturnType | { message: string }>
) {
  const body: RegisterType = req.body;
 
  if (!body) return res.status(400).json({ message: "Invalid data" });
  const response = await UserService.register(body);
  

  res.status(201).json(response);
}
