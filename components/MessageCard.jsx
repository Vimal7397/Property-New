"use client";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "react-toastify";
import deleteMessage from "@/app/actions/deleteMessages";
import { useGlobalContext } from "@/context/GlobalContext";
import messageMarkasRed from "@/app/actions/messageMarkasRed";

const markAsReadHandler = async (messageId, setIsread, setUnreadCount) => {
    const read = await messageMarkasRed(messageId);
    setIsread(read);
    setUnreadCount((prevCount) => prevCount + (read ? -1 : 1)); // Update unread count
};

const deleteMessageHandler = async (messageId, isread, setIsdelete, setUnreadCount) => {
    await deleteMessage(messageId);
    setIsdelete(true);

    // Only decrement unread count if the message is unread
    if (!isread) {
        setUnreadCount((prevCount) => Math.max(prevCount - 1, 0)); // Ensure count doesn't go below 0
    }
};

const MessageCard = ({ message }) => {
    const [isread, setIsread] = useState(message.read);
    const [isdelete, setIsdelete] = useState(false);
    const { setUnreadCount } = useGlobalContext(); // Access the global context to update unread count

    const handleReadClick = () => {
        markAsReadHandler(message._id, setIsread, setUnreadCount);
    };

    const handleDeleteClick = () => {
        deleteMessageHandler(message._id, isread, setIsdelete, setUnreadCount);
    };

    if (isdelete) {
        return <p>Deleted message</p>; // Don't render anything if the message is deleted
    }

    return (
        <div className="p-4 border rounded-md shadow-sm bg-white relative">
            {!isread && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-md">
                    NEW
                </div>
            )}
            <h2 className="text-xl mb-4">
                <span className="font-bold">Property Inquiry:</span>{' '}
                {message.property?.name || "Property not available"}
            </h2>
            <p className="text-gray-700">{message.body || "No message content available"}</p>
            <ul className="mt-4 space-y-2">
                <li>
                    <span className="font-bold">Sender:</span>{' '}
                    {message.sender?.username || "Unknown"}
                </li>
                <li>
                    <span className="font-bold">Phone:</span>{' '}
                    {message.phone || "Unknown"}
                </li>
                <li>
                    <span className="font-bold">Date:</span>{' '}
                    {message.createdAt
                        ? format(new Date(message.createdAt), "MMMM d, yyyy h:mm a")
                        : "Date not available"}
                </li>
            </ul>
            <button
                onClick={handleReadClick}
                className="mt-4 mr-3 bg-blue-600 text-white py-1 px-3 rounded-md"
            >
                {isread ? "Mark as New" : "Mark as Read"}
            </button>
            <button
                onClick={handleDeleteClick}
                className="mt-4 bg-red-600 text-white py-1 px-3 rounded-md"
            >
                Delete
            </button>
        </div>
    );
};

export default MessageCard;