"use server";

import cloudinary from "@/config/cloudinary";
import connectdb from "@/config/database";
import Message from "@/models/Message"; // Renamed to avoid conflict
import { getSessionUser } from "@/util/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteMessage(messageId) {
  await connectdb(); // Ensure the database is connected
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User not authenticated");
  }

  const { userId } = sessionUser;

  // Fetch the message by ID
  const message = await Message.findById(messageId);
  if (!message) {
    throw new Error("Message not found");
  }

  // Verify ownership
  if (userId !== message.recipient.toString()) {
    throw new Error("You are not authorized to delete this message");
  }

  // Delete the message
  await Message.findByIdAndDelete(messageId);

  // Revalidate the messages page
  revalidatePath("/messages");

  return { success: true };
}

export default deleteMessage;