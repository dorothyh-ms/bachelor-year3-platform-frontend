
import {createContext} from 'react'
import User from '../types/User'

export interface ISecurityContext {
    isAuthenticated: () => boolean
    loggedInUser: User | undefined
    login: () => void
    logout: () => void
}

export default createContext<ISecurityContext>({
    isAuthenticated: () => false,
    loggedInUser: undefined,
    login: () => {
    },
    logout: () => {
    },
})


