import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import api from '../lib/api';

interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    provider: 'google' | 'github';
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (token: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch current user on mount
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('authToken');

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await api.get('/auth/user');
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user:', error);
                localStorage.removeItem('authToken');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (token: string) => {
        localStorage.setItem('authToken', token);

        try {
            const response = await api.get('/auth/user');
            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user after login:', error);
            localStorage.removeItem('authToken');
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);

        // Optional: Call backend logout endpoint
        api.post('/auth/logout').catch(console.error);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
