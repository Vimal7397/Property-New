"use server";
import connectdb from "@/config/database";
import Message from "@/models/Message"; // Renamed to avoid conflict
import { getSessionUser } from "@/util/getSessionUser";


async function getunreadmessageCount() {
    await connectdb();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error("User not authenticated");
    }

    const { userId } = sessionUser;

    const count = await Message.countDocuments({ recipient: userId, read: false });
    return {count};
}

export default getunreadmessageCount;