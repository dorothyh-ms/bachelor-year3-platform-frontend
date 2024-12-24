
import React, { createContext, useState, ReactNode } from "react";

interface Notification {
    id: string;
    message: string;
}

interface NotificationContextProps {
    notifications: Notification[];
    addNotification: (notification: Notification) => void;
}

export const NotificationContext = createContext<NotificationContextProps>({
    notifications: [],
    addNotification: () => {},
});

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = (notification: Notification) => {
        setNotifications((prev) => [...prev, notification]);
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};
