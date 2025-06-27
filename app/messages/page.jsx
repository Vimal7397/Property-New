import connectdb from "@/config/database";
import Message from "@/models/Message";
import  "@/models/property";
import { convertToSerializableObject } from "@/util/convertToObject";
import { getSessionUser } from "@/util/getSessionUser";
import MessageCard from "@/components/MessageCard";

const MessagePage = async () => {
  await connectdb(); // Ensure the database is connected
  const sessionUser = await getSessionUser(); // Await the session user retrieval

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User not authenticated");
  }

  const { userId } = sessionUser;

  // Fetch read messages for the recipient
  const readMessages = await Message.find({ recipient: userId, read: true })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  // Fetch unread messages for the recipient
  const unreadMessages = await Message.find({ recipient: userId, read: false })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  // Combine and serialize messages
  const messages = [...readMessages, ...unreadMessages].map((messageDoc) => {
    const message = convertToSerializableObject(messageDoc);
    message.sender = convertToSerializableObject(message.sender);
    message.property = convertToSerializableObject(message.property);
    return message;
  });

  return (
    <section className="bg-blue-50">
      <div className="container mx-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-2xl font-bold mb-4">Messages</h1>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>No messages found</p>
            ) : (
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagePage;