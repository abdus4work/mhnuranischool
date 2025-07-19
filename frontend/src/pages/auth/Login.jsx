import { useForm } from 'react-hook-form'

import { Spinner } from '@/components/molecules/Spinner.jsx'
import { LoginForm } from '@/components/organisms/login-form.jsx'
import { useLogin } from '@/hooks/auth/useLogin.js'

export const Login = () => {
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const mutation = useLogin()

  const onSubmit = async (data) => {
    console.log('Form submitted:', data)
    await mutation.mutateAsync(data)
    // Handle form submission logic here
  }
  return (
    <div className="flex items-center p-4 justify-center h-screen bg-gray-100">
      <LoginForm form={form} onSubmit={onSubmit} />
      {mutation.isPending && <Spinner />}
    </div>
  )
}
