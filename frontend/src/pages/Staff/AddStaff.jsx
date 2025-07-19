import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { StaffForm } from '@/components/organisms/staff/StaffForm.jsx'
import { Button } from '@/components/ui/button.jsx'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.jsx'
import { useAddStaff } from '@/hooks/staff/useAddStaff.js'
import zodStaffSchema from '@/validators/zodStaffSchema.js'

export const AddStaff = () => {
  const form = useForm({
    resolver: zodResolver(zodStaffSchema),
    defaultValues: {
      role: 'teacher', // Or 'admin'/'student' based on your default
      fullName: '',
      contactNumber: '',
      email: '',
      address: '',
      dateOfJoining: '',
      password: '',
      salary: 0,
    },
  })

  const { mutate: addStaff } = useAddStaff(form)

  const onSubmit = (data) => {
    addStaff(data)
  }

  const watchedContactNumber = form.watch('contactNumber')

  useEffect(() => {
    if (watchedContactNumber && watchedContactNumber.length >= 4) {
      form.setValue('password', watchedContactNumber.slice(-4))
    }
  }, [watchedContactNumber, form])

  return (
    <div className="flex justify-center">
      <Card className={'md:w-2/3'}>
        <CardHeader>
          <CardTitle className={'text-center text-3xl'}>Add Staff</CardTitle>
        </CardHeader>
        <CardContent>
          <StaffForm
            form={form}
            purpose={'create'}
            onSubmit={onSubmit}
            className={'grid md:grid-cols-2 gap-6 '}
          />
        </CardContent>
        <CardFooter className={'flex gap-4'}>
          <Button form="staff-form" type="submit">
            Submit
          </Button>
          <Button variant={'destructive'} onClick={() => form.reset()}>
            Reset
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
