
import { Deposit } from "@/types/deposit.type"

export const postDeposit = async (token: string, accountId: string, deposit: Deposit) => {
    const URL = `https://digitalmoney.ctd.academy/api/accounts/${accountId}/deposits`

    const body: string = JSON.stringify(deposit)

    const res = await fetch(URL, {
        method: "POST",
        body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': (token ? token : '0')
        },
    });

    if (!res.ok) {
        throw new Error(`HTTP Code: ${res.status}`)
    }

    const jsonResponse = await res.json();

    return jsonResponse;
}
