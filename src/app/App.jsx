/** @format */

import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from 'react-router-dom';
import { HomePage } from '../pages/home/HomePage';
import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App as AntdApp } from 'antd';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../features/auth/model/AuthContext';
import { ProfilePage } from '../pages/profile/ProfilePage';
import { UploadsPage } from '../pages/uploads/UploadsPage';
import AppLayout from './AppLayout';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            staleTime: 1000 * 60 * 1,
        },
    },
});

const ReactQueryMainConfigProvider = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default function App() {
    return (
        <ReactQueryMainConfigProvider>
            <AuthProvider>
                <AntdApp>
                    <Router>
                        <AppLayout>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route
                                    path="/profile"
                                    element={
                                        <PrivateRoute>
                                            <ProfilePage />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/uploads"
                                    element={
                                        <PrivateRoute>
                                            <UploadsPage />
                                        </PrivateRoute>
                                    }
                                />
                            </Routes>
                        </AppLayout>
                    </Router>
                </AntdApp>
            </AuthProvider>
        </ReactQueryMainConfigProvider>
    );
}

export function PrivateRoute({ children }) {
    const { user, loading } = useAuth();
    const { message } = AntdApp.useApp();

    useEffect(() => {
        if (!loading && !user) {
            message.error('Вы не авторизованы');
        }
    }, [loading, user]);

    if (loading) return null;

    return user ? children : <Navigate to="/" replace />;
}
