import { createContext, useState, useContext, useEffect } from 'react'
import { loginRequest, registerRequest, verifyTokenRequest } from '../api/auth';
import Cookies from 'js-cookie'
import { useRouteError } from 'react-router-dom';
import { set } from 'mongoose';

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new error("useAuth must be used within an AuthProvider")
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true);


    const signup = async (user) => {
        try {
            const response = await registerRequest(user);
            console.log('Registro exitoso:', response.data);
            setUser(response.data);
            setIsAuthenticated(true)
        } catch (error) {
            console.error('Error en el registro:', error);
        }

    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)

            const userData = res.data;
            setIsAuthenticated(true)
            setUser(userData);

            return userData.roles;
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        async function chekLogin() {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }
            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false);
                    return;
                }

                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false);

            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);

            }
        }
        chekLogin();
    }, []);

    return (
        <AuthContext.Provider value={{
            signup,
            user,
            isAuthenticated,
            signin,
            loading,

        }} >
            {children}
        </AuthContext.Provider>
    );

}