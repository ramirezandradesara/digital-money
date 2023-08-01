import { getUser } from "@/components/constants/mongo-config";
import { serviceImg } from "@/types/service_image.type";
export const fetchMongoServiceImagesServer = async () => {

    const user = await getUser();

    const mongoResponse = await user.functions.get_services_images();
    const result:serviceImg[] = mongoResponse.result.map(
        (image:any)=>{
            const ImgResult: serviceImg = {
                _id: JSON.stringify(image._id) as string,
                src: image.src as string,
                name: image.name as string,
            }
            return ImgResult;
        }
    )    

    return result;
}