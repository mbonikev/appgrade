import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const Route = createFileRoute('/auth/callback')({
    component: AuthCallback,
});

function AuthCallback() {
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const handleCallback = async () => {
            const params = new URLSearchParams(window.location.search);
            const token = params.get('token');

            if (token) {
                try {
                    await login(token);
                    // Redirect to home page after successful login
                    navigate({ to: '/' });
                } catch (error) {
                    console.error('Login failed:', error);
                    navigate({ to: '/' });
                }
            } else {
                // No token found, redirect to home
                navigate({ to: '/' });
            }
        };

        handleCallback();
    }, [login, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-bodyBg">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mainColor mb-4"></div>
                <p className="text-textColor text-lg">Completing sign in...</p>
            </div>
        </div>
    );
}
