import { api } from '@/Configs/axiosConfig.js';


export const getAllFeesRequest = async (filter)=>{
    try {
        const response = await api.get('/fees',{
            params:{
                page: filter.pageIndex + 1,
                limit: filter.pageSize,
                ...(filter.month && { month: filter.month }),
                ...(filter.year && { year: filter.year }),
                ...(filter.class && { class: filter.class }),
                ...(filter.rollNumber && {roll: filter.rollNumber}),
                ...(filter.section && { section: filter.section }),
                ...(filter.status && { status: filter.status }),
            }
        })

        return response.data
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const generateDueFeesRequest = async (data)=>{
    try {
        const response = await api.patch('/fees/generate',data)
        return response.data
    } catch (error) {
        console.log(error)
        throw error;
        
    }
}

export const getFeesByStudentIdRequest = async(studentId)=>{
    try {
        const response = await api.get(`/fees/${studentId}`)
        return response.data
    } catch (error) {
        console.log(error)
        throw error;
    }
}
