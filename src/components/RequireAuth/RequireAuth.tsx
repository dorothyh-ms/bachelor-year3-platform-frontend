import {ReactNode, useContext} from 'react'
import {Navigate, Outlet} from 'react-router-dom';
import SecurityContext from '../../context/SecurityContext';
export interface RequireAuthProps {
    children: ReactNode
}

export const RequireAuth = () => {
    const {isAuthenticated} = useContext(SecurityContext);


    
    return (
        isAuthenticated() ? <Outlet /> : <Navigate
            to='/'
            state={{ from: location }}
            replace
        />
    )
}