/** @format */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

function App() {
    return (
        <ReactQueryMainConfigProvider>
            <Router>
                <AppLayout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/auth" element={<Home />} />
                    </Routes>
                </AppLayout>
            </Router>
        </ReactQueryMainConfigProvider>
    );
}

export default App;
