import { ListItem, ListItemButton, ListItemIcon, Typography } from "@mui/material"
import { NavigationLink } from "../../layouts/MainLayout"
interface NavigationTabProps {
    link: NavigationLink
}
const NavigationTab = (props: NavigationTabProps) => {
    const {link} = props;
    return <ListItem key={link.route}  >
                <ListItemButton 
                
                onClick={link.handleClick}
                >
                    <ListItemIcon>
                        {link.icon}
                    </ListItemIcon>
                    <Typography color="secondary">{link.text}</Typography>
                </ListItemButton>
            </ListItem>
}

export default NavigationTab;