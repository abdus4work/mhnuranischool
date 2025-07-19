import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import ErrorBoundary from '@/components/common/ErrorBoundary.jsx'
import { AddStudentForm } from '@/components/organisms/student/AddStudentForm.jsx'
import { useCreateStudent } from '@/hooks/students/useCreateStudent.js'
import { zodStudentCreateSchema } from '@/validators/zodStudentCreateSchema.js'

export function AddStudent() {
  const form = useForm({
    resolver: zodResolver(zodStudentCreateSchema),
    defaultValues: {
      academicYear: '2025',
      username: '',
      password: '',
      dateOfBirth: '',
      admissionDate: '',
      class: '',
      section: '',
      rollNumber: '',
      guardianName: '',
      guardianContact: '',
      email: '',
      monthlyFees:0
    },
    mode: 'onChange',
  })

  const dob = form.watch('dateOfBirth')

  const watchClass = form.watch('class')
  const watchSection = form.watch('section')
  const watchRoll = form.watch('rollNumber')
  const watchAcademicYear = form.watch('academicYear')

  useEffect(() => {
    if (dob) {
      const dobParts=dob.split('-').reverse()
      const generatedPassword = dobParts[0]+dobParts[1]+dobParts[2].slice(2)
      form.setValue('password', generatedPassword)
    }
  }, [dob, form])

  useEffect(() => {
    if (watchClass && watchSection && watchRoll && watchAcademicYear) {
      const generatedUsername = `ST${watchAcademicYear.slice(-2)}${watchClass.slice(0, 2).toUpperCase()}${watchRoll}${watchSection}`
      form.setValue('username', generatedUsername)
    }
  }, [watchClass, watchSection, watchRoll, watchAcademicYear, form])

  const handleReset = () => {
    console.log(form.getValues())

    form.reset({
      fullName: '',
      dateOfBirth: '',
      admissionDate: '',
      class: '',
      section: '',
      rollNumber: '',
      guardianName: '',
      email: '',
      address: '',
    })
  }

  const mutation = useCreateStudent()
  const onSubmit = async (data) => {
    await mutation.mutateAsync(data)
  }
  return (
    <div className="flex justify-center ">
      <ErrorBoundary fallback="Something went wrong...">
        <AddStudentForm form={form} onSubmit={onSubmit} reset={handleReset} />
      </ErrorBoundary>
    </div>
  )
}
