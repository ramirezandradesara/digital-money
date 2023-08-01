import { BankCard } from "@/types/bank_card.type";
const getCards = async (user_id: number, token: string):Promise<BankCard[]> => {
    //const token = localStorage.getItem("token");
    try {
        const response = await fetch(
            `https://digitalmoney.ctd.academy/api/accounts/${user_id}/cards`,
            {
                method: "GET",
                headers: {
                    Authorization: `${token}`,
                },
            }
        )
        if(!response.ok){
            throw new Error(`HTTP Code: ${response.status}`);
        }

        const jsonResponse= await response.json();
        return jsonResponse as BankCard[];
    }
    catch (error) {
        console.error("Error:", error);
        return []
    }
};
export default getCards;