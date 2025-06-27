
"use server";
import connectdb from "@/config/database";
import Message from "@/models/Message";
import {getSessionUser} from "@/util/getSessionUser";
import { revalidatePath } from "next/cache";



async function addmessage(previousState,formData) {
    await connectdb();
    const sessionUser=await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error("User not authenticated");
    }
    const {userId}=sessionUser;
    const recipient=formData.get('recipient');

    if (userId === recipient){
    return {
        error: "You cannot send a message to yourself",
    }
    }

    const newMessage = new Message({
        sender:userId,
        recipient,
        property:formData.get('property'),
        name:formData.get('name'),
        email:formData.get('email'),
        phone:formData.get('phone'),
        body:formData.get('body'),
    
    });

    await newMessage.save();

    return{
        submitted: true,
    }
}

export default addmessage;