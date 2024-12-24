import React, { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { Box, Typography, List, ListItem } from "@mui/material";

const NotificationList = () => {
    const { notifications } = useContext(NotificationContext);

    return (
        <Box>
            <Typography variant="h6">Notifications</Typography>
            <List>
                {notifications.map((n) => (
                    <ListItem key={n.id}>{n.message}</ListItem>
                ))}
            </List>
        </Box>
    );
};

export default NotificationList;
