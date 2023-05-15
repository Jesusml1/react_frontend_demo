import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDiscordUser, logoutUser } from '@/redux/features/auth/authSlice';
import { AppDispatch, RootState } from '@/redux/store';

export const useUserAuth = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [searchParams] = useSearchParams();
    const token = searchParams.get('t');
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (token) {
            dispatch(fetchDiscordUser(token))
        }
    }, [token]);

    const handleLogout = () => {
        dispatch(logoutUser())
        navigate('/');
    };

    return { user, handleLogout };
};