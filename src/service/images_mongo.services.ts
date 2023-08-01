import { getUser } from "@/components/constants/mongo-config";
import { Img } from "@/types/image.type";
export const fetchMongoImages = async (device: string) => {

    const user = await getUser();

    const mongoResponse = await user.functions.get_image(device);

    //get_texts
    //const mongoResponse= await user.functions.get_texts();
    const result = mongoResponse.result[0];


    const ImgResult: Img = {
        _id: result._id as string,
        src: result.src as string,
        alt: result.alt as string,
        device: result.device as string,
    }

    return ImgResult;
}


/**
 * Objeto o documento de la imagen q devuelve Mongo Atlas (REALM)
 * {
result: [
{
_id: new ObjectId("646195dc6efc5a312ce00495"),
src: 'https://g10-front-images.s3.amazonaws.com/indexImg-d.jpg',
alt: 'imagen de persona con dispositivo',
device: 'desktop'
}
] 
}
*/
