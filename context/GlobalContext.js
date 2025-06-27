"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getunreadmessageCount from "@/app/actions/getUnreadmessage";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [unreadcount, setUnreadCount] = useState(0); // Fixed typo in setter function
    const { data: session } = useSession();

    const fetchUnreadCount = async () => {
        if (session && session.user) {
            try {
                const res = await getunreadmessageCount();
                setUnreadCount(res.count || 0); // Update unread count
            } catch (error) {
                console.error("Error fetching unread message count:", error);
            }
        }
    };

    useEffect(() => {
        fetchUnreadCount(); // Fetch unread count on session change
    }, [session]);

    return (
        <GlobalContext.Provider value={{ unreadcount, setUnreadCount, fetchUnreadCount }}>
            {children}
        </GlobalContext.Provider>
    );
};

export function useGlobalContext() {
    return useContext(GlobalContext);
}