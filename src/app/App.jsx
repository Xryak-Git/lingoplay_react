/** @format */

import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from 'react-router-dom';
import { Home } from '../pages/home/Home';
import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App as AntdApp } from 'antd';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../features/auth/model/AuthContext';
import { Profile } from '../pages/profile/Profile';
import { VideoUpload } from '../pages/videoUpload/VideoUpload';
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
                                <Route path="/" element={<Home />} />
                                <Route
                                    path="/test"
                                    element={
                                        <PrivateRoute>
                                            <Profile />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/video-upload"
                                    element={<VideoUpload />}
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
