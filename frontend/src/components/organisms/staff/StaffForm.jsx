import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { PhoneNumberInput } from '@/components/molecules/PhoneInput.jsx'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar.jsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.jsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.jsx'
import { cn } from '@/lib/utils.js'

export const StaffForm = ({ form, onSubmit, purpose, className }) => {
  return (
    <Form {...form}>
      <form
        id="staff-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8">
        <div className={`${className}`}>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className={'grid grid-cols-3 items-center'}>
                <FormLabel>
                  Full Name : <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Full Name"
                    {...field}
                    className={`h-10  col-span-2 `}
                  />
                </FormControl>
                <FormMessage className={'col-span-3'} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem className={'grid grid-cols-3 items-center'}>
                <FormLabel>
                  Contact Number <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <PhoneNumberInput
                    field={field}
                    placeholder="Enter phone Number"
                    className={`h-10 col-span-2 `}
                  />
                </FormControl>
                <FormMessage className={'col-start-2 col-span-2'} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className={'grid grid-cols-3 items-center'}>
                <FormLabel>
                  Role <span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value} >
                  <FormControl>
                    <SelectTrigger className={`h-10 col-span-2 w-full `}>
                      <SelectValue placeholder="Section" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className={'col-start-2 col-span-2'} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className={'grid grid-cols-3 items-center'}>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Email"
                    {...field}
                    className={`h-10 col-span-2 `}
                  />
                </FormControl>
                <FormMessage className={'col-start-2 col-span-2'} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfJoining"
            render={({ field }) => (
              <FormItem className={'grid grid-cols-3 items-center'}>
                <FormLabel>
                  Date of Joining <span className="text-red-500">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'pl-3 text-left font-normal h-10 col-span-2',
                          !field.value && 'text-muted-foreground'
                        )}>
                        {field.value ? (
                          format(field.value, 'dd-MM-yyyy')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        if (date) {
                          field.onChange(format(date, 'yyyy-MM-dd'))
                        }
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className={'col-start-2 col-span-2'} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className={'grid grid-cols-3 items-center'}>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Address"
                    {...field}
                    className={`h-10 col-span-2 `}
                  />
                </FormControl>
                <FormMessage className={'col-start-2 col-span-2'} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem className={'grid grid-cols-3 items-center'}>
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Salary"
                    type="number"
                    {...field}
                    onChange={
                      (e) => {
                        const value = e.target.value
                        field.onChange(value ? parseFloat(value) : 0)
                      }
                    }
                    value={field.value}
                    className={`h-10 col-span-2 `}
                  />
                </FormControl>
                <FormMessage className={'col-start-2 col-span-2'} />
              </FormItem>
            )}
          />

          {purpose == 'create' && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className={'grid grid-cols-3 items-center'}>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className={`h-10 col-span-2 `}
                      placeholder="Password will automatic generate"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage className={'col-start-2 col-span-2'} />
                </FormItem>
              )}
            />
          )}
        </div>
      </form>
    </Form>
  )
}
