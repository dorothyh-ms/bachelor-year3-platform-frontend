import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useFetchProfile } from '../../hooks/useProfile';
export interface RequireAuthProps {
    children: ReactNode
}

export const RequireCompletedProfile = () => {
    const {profile} = useFetchProfile();
    
    return (
        profile ? <Outlet /> : <Navigate
            to='/'
            state={{ from: location }}
            replace
        />
    )
}

export default RequireCompletedProfile;