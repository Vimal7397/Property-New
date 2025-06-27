'use server'
import connectdb from "@/config/database"
import Property from "@/models/property";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/util/getSessionUser";

async function updateProperty(propertyId,formData) {
    await connectdb();
    const sessionUser=await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error("User not authenticated");
    }
    const existingProperty=await Property.findById(propertyId).lean();
    if(existingProperty.owner.toString()!==sessionUser.userId){
        throw new Error("Property not found");
    }
    const {userId}=sessionUser;
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
    amenities:formData.getAll('amenities'),      
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
};
const updateProperty=await Property.findByIdAndUpdate(propertyId,propertyDAta,{new:true});
revalidatePath('/','layout');
redirect(`/properties/${updateProperty._id}`);
}
export default updateProperty;