import { api } from '@/Configs/axiosConfig.js'


export const getAllStaffsRequest = async (filter)=>{
    try {
        const res = await api.get('/staffs',{
            params: {
                page: filter.pageIndex + 1 || 1,
                limit:filter.pageSize||10,
                ...(filter.employeeId && { employeeId: filter.employeeId }),
            }
        })

        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}


export const deleteStaffRequest =async(id)=>{
    try {
        const res = await api.delete(`/staffs/${id}`)
        return res.data;
    } catch (error) {
        console.Console(error)
        throw error;
    }
}

export const updateStaffRequest =async(id,data)=>{
    try {
        
        const res = await api.patch(`/staffs/${id}`,data)
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const addStaffRequest = async(data)=>{
    try {
        const res = await api.post('/staffs',data)
        return res.dada;
    } catch (error) {
        console.log('From request',error)
        throw error;
    }
}