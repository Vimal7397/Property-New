"use server"

import cloudinary from "@/config/cloudinary"
import connectdb from "@/config/database";  
import Property from "@/models/property";
import {getSessionUser} from "@/util/getSessionUser";
import {revalidatePath} from "next/cache" 

async function deleteProperty(propertyId) {
    const sessionUser=await getSessionUser();
    if(!sessionUser||!sessionUser.user){
        throw new Error("User not authenticated")
    }
    const {userId}=sessionUser;
    const property=await Property.findById(propertyId);

    if (!property) {
        throw new Error("Property not found")
    }

    if(property.owner.toString()!==userId){
        throw new Error("You are not authorized to delete this property")
    }

    const publicIds = property.images.map((imageUrl) => {
        const parts=imageUrl.split("/");
        return parts.at(-1).split(".")[0];
    });
    if(publicIds.length>0){
        for(let publicId of publicIds){
            await cloudinary.uploader.destroy("propertypulse1/"+publicId);
        }
    }

    await property.deleteOne();
    revalidatePath("/","layout"); //revalidate the properties page
    //cloudinary id extraction
 


}

export default deleteProperty;

