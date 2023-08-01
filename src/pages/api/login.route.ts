import {
  INTERNAL_ERROR,
  INVALID_CREDENTIALS,
  USER_NOT_FOUND,
} from "@/helpers/loginErros";
import { API_URL } from "@/service/users.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  if (method === "POST") {
    try {
      let response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      let result = await response.json();

      if (result.error && response.status === 404) {
        res.status(404).json({
          error: USER_NOT_FOUND,
          message: `${result.error}`,
        });
        return;
      }

      if (result.error && response.status === 401) {
        res.status(401).json({
          error: INVALID_CREDENTIALS,
          message: `${result.error}`,
        });
        return;
      }

      return res.status(200).json(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({
          error: INTERNAL_ERROR,
          message: `${err.message}`,
        });
      }
      return;
    }
  }
}
