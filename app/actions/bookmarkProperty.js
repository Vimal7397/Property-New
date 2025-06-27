"use server";

import connectdb from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/util/getSessionUser";
import { revalidatePath } from "next/cache";


async function bookmarkProperty(propertyId) {
    await connectdb();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser) {
        throw Error("User not authenticatedl");
    }
    const {userId}=sessionUser;
    const user = await User.findById(userId);
    let isBookmarked = user.bookmarks.includes(propertyId);
    let message;
    if (isBookmarked) {
        user.bookmarks.pull(propertyId);
        message ='Bookmrked removed successfully';
        isBookmarked = false;
    }
    else {
        user.bookmarks.push(propertyId);
        message ='Bookmrked added successfully';
        isBookmarked = true;
    }
    await user.save();
    revalidatePath("/properties/saved","page");
    return{
        message,
        isBookmarked,
    }
        }


export default bookmarkProperty;    