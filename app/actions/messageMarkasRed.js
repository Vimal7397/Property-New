"use server";
import connectdb from "@/config/database";
import Message from "@/models/Message"; // Renamed to avoid conflict
import { getSessionUser } from "@/util/getSessionUser";
import { revalidatePath } from "next/cache";

async function messageMarkasRed(messageId) {
    await connectdb();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error("User not authenticated");
    }

    const { userId } = sessionUser;

    // Find the message by ID
    const message = await Message.findById(messageId); // Use the renamed model
    if (!message) {
        throw new Error("Message not found");
    }

    // Verify ownership
    if (userId !== message.recipient.toString()) { // Ensure only the recipient can mark as read
        throw new Error("You are not authorized to update this message");
    }

    // Toggle the read status
    message.read = !message.read;

    // Revalidate the messages page
    revalidatePath("/messages");

    // Save the updated message
    await message.save();

    return message.read;
}

export default messageMarkasRed;