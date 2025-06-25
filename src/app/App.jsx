/** @format */

import {
    Navigate,
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import { Home } from '../pages/home/Home';
import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayout from './AppLayout';
import { AuthProvider, useAuth } from '../features/auth/model/AuthContext';
import { App as AntdApp } from 'antd';
import { Profile } from '../pages/profile/Profile';

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
                <Router>
                    <AppLayout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/test"
                                element={
                                    // <PrivateRoute>
                                    <Profile />
                                }
                            />
                        </Routes>
                    </AppLayout>
                </Router>
            </AuthProvider>
        </ReactQueryMainConfigProvider>
    );
}

export function PrivateRoute({ children }) {
    const { user, loading } = useAuth();
    const { message } = AntdApp.useApp();

    if (loading) return null;

    if (!user) {
        message.error('Вы не авторизованы');
        return <Navigate to="/" replace />;
    }

    return children;
}
