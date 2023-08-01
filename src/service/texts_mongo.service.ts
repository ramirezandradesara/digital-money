import { getUser } from "@/components/constants/mongo-config";
import { Text } from "@/types/cardText.type";
export const fetchMongoText = async () => {

    const user= await getUser();

    const mongoResponse= await user.functions.get_text();
    
    //get_texts
    //const mongoResponse= await user.functions.get_texts();
    const result= mongoResponse.result;
    
//CONVIRTIENDO EL ELEMENTO QUE RETORNA DE MONGO ATLAS
    const cardTextResult:Text[] = result.map(
        (element:any)=>{
            const textElement:Text ={
                title: element?.title as string,
                content: element?.content as string,
            }
            return textElement
        }
    )  
    
    return cardTextResult;
  }