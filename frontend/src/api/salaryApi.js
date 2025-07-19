import { api } from '@/Configs/axiosConfig.js'

export const getSalaryRequest = async (staffId) => {
  try {
    const response = await api.get(`/salary/${staffId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching salary:', error)
    throw error
  }
}


export const getAllSalariesRequest = async (filter) => {
  try {
    const response = await api.get('/salary', {
      params:{
        page: filter.pageIndex+1,
        limit: filter.pageSize,
        ...(filter.month && { month: Number(filter.month) }),
        ...(filter.year && { year: Number(filter.year) }),
        ...(filter.status && { status: filter.status.toUpperCase() }),
      }
    })

    return response.data
  } catch (error) {
    console.error('Error fetching all salaries:', error)
    throw error
    
  }
}

export const generateDueSalaryRequest = async (data) => {
  try {
    const response = await api.patch('/salary/generate', data)
    return response.data
  } catch (error) {
    console.error('Error generating due salary:', error)
    throw error
  }
}