import { Eye, EyeOff, LockIcon, User2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'

import Logo from '@/assets/logo.png'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.jsx'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator.jsx'
import { cn } from '@/lib/utils'

export function LoginForm({ form, onSubmit, className, ...props }) {
  const [isDisabled, setIsDisabled] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    setIsDisabled(!form.watch('username') || !form.watch('password'))
  }, [form.watch('username'), form.watch('password')])

  return (
    <div
      className={cn('flex flex-col gap-6 w-full md:w-2/3 lg:w-6/12 xl:w-1/4', className)}
      {...props}>
      <Card className={'shadow-lg border-1 border-gray-200'}>
        <CardHeader className={'px-6'}>
          <div className="flex flex-col items-center mb-4">
            <img src={Logo} width={'100'} />
            <h1 className=" font-[Aclonica] md:text-2xl font-bold text-center text-[var(--brand)] ">
              M.H.NURANI NATIONAL SCHOOL
            </h1>
          </div>
          <Separator className={'mb-4'} />
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your Credential to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-4">
                <div className={'flex flex-col gap-5 mb-4'}>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={''}>
                          <User2Icon size={'24'} /> Username
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Input
                              className={
                                'rounded-none border-0 border-[var(--brand)] border-b-2 focus-visible:ring-0 focus-visible:border-none'
                              }
                              placeholder="Enter username"
                              {...field}
                            />
                            <span className="absolute left-1/2 bottom-0 h-[4px] w-0 bg-emerald-400 transition-all duration-700 group-focus-within:left-0 group-focus-within:w-full" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <LockIcon size={'24'} /> Password
                        </FormLabel>
                        <div className="relative flex group">
                          <FormControl>
                            <Input
                              className="pr-10 rounded-none border-0 border-[var(--brand)] border-b-2 focus-visible:ring-0 focus-visible:border-none"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Enter Password"
                              {...field}
                            />
                          </FormControl>
                          <span
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer px-2"
                            onClick={() => setShowPassword((prev) => !prev)}>
                            {showPassword ? (
                              <Eye className="h-5 w-5 text-gray-500" />
                            ) : (
                              <EyeOff className="h-5 w-5 text-gray-500" />
                            )}
                          </span>
                          <span className="absolute left-1/2 bottom-0 h-[4px] w-0 bg-emerald-400 transition-all duration-700 group-focus-within:left-0 group-focus-within:w-full" />
                        </div>
                        <FormDescription>
                          For student, use DOB (ddmmyy) as password
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isDisabled}
                  className={
                    'border-emerald-400 border-1 h-10 cursor-pointer bg-[var(--brand)] hover:bg-[var(--brand)] active:scale-95 text-white text-2xl'
                  }>
                  Login
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
