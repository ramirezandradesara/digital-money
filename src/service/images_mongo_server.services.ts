import { getUser } from "@/components/constants/mongo-config";
import { Img } from "@/types/image.type";
export const fetchMongoImagesServer = async () => {

    const user = await getUser();

    const mongoResponse = await user.functions.get_images_server();
    //get_texts
    //const mongoResponse= await user.functions.get_texts();
    const result:Img[] = mongoResponse.result.map(
        (image:any)=>{
            const ImgResult: Img = {
                _id: JSON.stringify(image._id) as string,
                src: image.src as string,
                alt: image.alt as string,
                device: image.device as string,
            }
            return ImgResult;
        }
    )    

    return result;
}


/**
 * Objeto o documento de la imagen q devuelve Mongo Atlas (REALM)
 *****Client:
{
result: [
{
_id: new ObjectId("646195dc6efc5a312ce00495"),
src: 'https://g10-front-images.s3.amazonaws.com/indexImg-d.jpg',
alt: 'imagen de persona con dispositivo',
device: 'desktop'
}
] 
}

****Server:

[
{
_id: new ObjectId("646195dc6efc5a312ce00495"),
src: 'https://g10-front-images.s3.amazonaws.com/image-desktop.png',
alt: 'imagen de persona con dispositivo',
device: 'desktop'
},
{
_id: new ObjectId("6461c3666efc5a312ce0049c"),
src: 'https://g10-front-images.s3.amazonaws.com/image-tablet.png',
alt: 'imagen de persona con dispositivo',
device: 'tablet'
},
{
_id: new ObjectId("6461c3866efc5a312ce0049d"),
src: 'https://g10-front-images.s3.amazonaws.com/image-mobile.png',
alt: 'imagen de persona con dispositivo',
device: 'mobile'
}
]
*/
