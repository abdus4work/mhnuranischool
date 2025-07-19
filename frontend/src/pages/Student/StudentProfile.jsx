import { useParams } from 'react-router'

export const StudentProfile = () => {
  const { id } = useParams()
  
  return <div>Student ID: {id}</div>
}
