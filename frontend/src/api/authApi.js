import { api } from '@/Configs/axiosConfig.js';


export const loginRequest =async ({username,password})=>{
    try {
        const res = await api.post('/auth/login',{username,password})
        return res.data;
    } catch (error) {
        console.log(error);
        
        throw error;
    }
}

export const logoutRequest = async ()=>{
    try{
        const res= await api.post('/auth/logout')
        return res.data;
    }
    catch(error){
        console.log(error)
        throw error;
    }
}

export const refreshTokenRequest = async () => {
    try {
        const res = await api.post('/auth/refresh-token')
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getUserDataRequest = async () => {
    try {
        const res = await api.get('/auth/me')
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}