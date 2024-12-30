
import { useEffect, useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

const useWebSocket = (url: string) => {
    const { addNotification } = useContext(NotificationContext);

    useEffect(() => {
        const socket = new WebSocket(url);

        socket.onopen = () => console.log('WebSocket connected:', url);
        socket.onmessage = (event) => {
            const notification = JSON.parse(event.data);
            console.log('WebSocket message received:', notification);
            addNotification(notification);
        };
        socket.onerror = (error) => console.error('WebSocket error:', error);

        return () => socket.close();
    }, [url, addNotification]);

};

export default useWebSocket;
