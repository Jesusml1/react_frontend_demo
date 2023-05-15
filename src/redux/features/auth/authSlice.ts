import { getDiscordUser } from "@/services/authService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type User = {
    id: string
    username: string
    avatar: string
}

type AuthState = {
    user: User | null
    token: string | null
    status: string | null
}

function parseDiscordUser(): User | null {
    const rawUser = localStorage.getItem('discord_user_info');
    if (rawUser) {
        return JSON.parse(rawUser)
    }

    return null
}

const initialState = {
    user: parseDiscordUser(), 
    token: null,
    status: null
} as AuthState


export const fetchDiscordUser = createAsyncThunk('auth/fetchDiscordUser', async (token: string) => {
    return await getDiscordUser(token);
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser(state) {
            localStorage.removeItem('discord_user_info');
            localStorage.removeItem('user');
            state.user = null;
            state.token = null;
            state.status = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDiscordUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDiscordUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                localStorage.setItem('discord_user_info', JSON.stringify(action.payload));
            })
            .addCase(fetchDiscordUser.rejected, (state) => {
                state.status = 'failed';
            });
    }
})

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
