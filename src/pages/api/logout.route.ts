import { INTERNAL_ERROR } from "@/helpers/loginErros";
import { API_URL } from "@/service/users.service";
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body } = req

    if (method === "POST") {
        try {
            let response = await fetch(`${API_URL}/api/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

            })

            let result = await response.json();

            return res.status(202).json(result);

        } catch (err: unknown) {
            if (err instanceof Error) {
                res.status(500).json({
                    error: INTERNAL_ERROR,
                    message: `${err.message}`
                });
            }
            return;
        }
    }
}
