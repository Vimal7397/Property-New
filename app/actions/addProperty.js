
"use server";
import connectdb from "@/config/database";
import property from "@/models/property";
import {getSessionUser} from "@/util/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";


async function addProperty(formData) {
    await connectdb();
    const sessionUser=await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error("User not authenticated");
    }
    const {userId}=sessionUser;

    const amenities=(formData.getAll('amenities'));
    const images=formData
        .getAll("images")
        .filter((image)=>image.name!=="")
 
        const propertyDAta={
            owner:userId,
            type:formData.get('type'),
            name:formData.get('name'),
            description:formData.get('description'),
            location:{
                street:formData.get('location.street'),
                city:formData.get('location.city'),
                state:formData.get('location.state'),
                zipcode:formData.get('location.zipcode'),
            },
        beds:formData.get('beds'),
        baths:formData.get('baths'),
        square_feet:formData.get('square_feet'),
        amenities,        
        rates:{
            monthly:formData.get('rates.monthly'),
            nightly:formData.get('rates.nightly'),
            weekly:formData.get('rates.weekly'),
            
        },
        seller_info:{
            name:formData.get('seller_info.name'),
            email:formData.get('seller_info.email'),
            phone:formData.get('seller_info.phone'),
        },
        }
    const imageUrls=[];
    for (const imageFile of images){
    const imageBuffer=await imageFile.arrayBuffer();
    const imageArray=Array.from(new Uint8Array(imageBuffer));
    const imageData=Buffer.from(imageArray);
    
    const imageBase64=imageData.toString('base64');

    const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
            folder: "propertypulse1",
        }

    );
    imageUrls.push(result.secure_url);
    }
    propertyDAta.images=imageUrls;

        const newProperty = new property(propertyDAta);
        await newProperty.save();

        revalidatePath('/', 'layout');

        redirect(`/properties/${newProperty._id}`);
}

export default addProperty;