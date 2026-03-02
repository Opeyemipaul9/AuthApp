import React ,{createContext, useContext , useState} from 'react'


export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children})=>{
    const [isLoading , setIsLoading] = useState(false);
    const [isAuthenticated , setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [error , setError] = useState(null);
}