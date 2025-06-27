"use server";
import connectdb from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/util/getSessionUser";

async function checkBookmarkStatus(propertyId){
    await connectdb();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser) {
        throw Error("User not authenticatedl");
    }
    const {userId}=sessionUser;
    const user = await User.findById(userId);
    let isBookmarked = user.bookmarks.includes(propertyId);

    return {isBookmarked};
}

export default checkBookmarkStatus;