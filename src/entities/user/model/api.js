/** @format */

import { useAuth } from '../../../features/auth/model/AuthContext';

export function useUser() {
    const { user, loading } = useAuth();
    return { user, isLoading: loading };
}
