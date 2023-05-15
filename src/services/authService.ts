import axios from "@/utils/axios";

async function getDiscordUser(token: string) {
    const headers = { Authorization: `Bearer ${token}` }
    try {
        const response = await axios.get('/api/auth/user', { headers });
        const user = response.data;
        return user;
    } catch (error) {
        throw new Error('There was an error at fetching the discord user: ' + error)
    }
}

async function sendEmailVerification(userId: string, email: string, token: string) {
    const headers = { Authorization: `Bearer ${token}` }
    try {
        const response = await axios.post("/api/auth/verify",
            { email: email, discord_id: userId },
            { headers }
        )
        return response;
    } catch (error) {
        throw new Error("There was an error sending the verification code: " + error)
    }
}

async function submitVerificationCode(verificationCode: string, token: string) {
    const headers = { Authorization: `Bearer ${token}` }
    try {
        const response = axios.put("/api/auth/verify-email",
            { code: verificationCode },
            { headers }
        )
        return response;
    } catch (error) {
        throw new Error('There was an error processing the verification code: ' + error)
    }
}

export { getDiscordUser, sendEmailVerification, submitVerificationCode }
