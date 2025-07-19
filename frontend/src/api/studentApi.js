import { api } from '@/Configs/axiosConfig.js'

export const createStudentRequest = async (data) => {
  try {
    const response = await api.post('/students', data)
    return response?.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const getAllStudentRequest = async (filter) => {
  try {
    const response = await api.get('/students', {
      params: {
        page: filter.pageIndex + 1 || 0,
        limit: filter.pageSize || 10,
        ...(filter.rollNumber && { roll: filter.rollNumber }),
        ...(filter.class && { class: filter.class }),
        ...(filter.section && { sec: filter.section }),
      },
    })
    return response?.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deleteStudentRequest = async (id) => {
  try {
    const res = await api.delete(`/students/${id}`)
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateStudentRequest = async (id, data) => {
  try {
    
    const res = await api.patch(`/students/${id}`, data)
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
