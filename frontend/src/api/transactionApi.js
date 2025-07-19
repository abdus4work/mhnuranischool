import { api } from '@/Configs/axiosConfig.js';



export const addTransactionRequest =async (data)=>{
    try {
        const response = await api.post('/transactions', data);
        return response.data;
    } catch (error) {
        console.error("Error in addTransactionRequest:", error);
        throw error;
        
    }
}

export const getTransactionRequest = async (filter) => {
    try {
        const response = await api.get('/transactions',{
            params:{
                page: filter.pageIndex + 1,
                limit: filter.pageSize,
                ...(filter.month && { month: filter.month }),
                ...(filter.year && { year: filter.year }),
                ...(filter.type && { type: filter.type }),
                ...(filter.paymentId && { paymentId: filter.paymentId }),
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error in getTransactionRequest:", error);
        throw error;
    }
}

export const getTransactionByPaymentIdRequest = async (paymentId) => {
    try {
        const response = await api.get(`/transactions/${paymentId}`);
        return response.data;
    } catch (error) {
        console.error("Error in getTransactionByPaymentIdRequest:", error);
        throw error;
        
    }
}