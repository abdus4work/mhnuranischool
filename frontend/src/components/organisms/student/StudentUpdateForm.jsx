import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { PhoneNumberInput } from '@/components/molecules/PhoneInput.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Calendar } from '@/components/ui/calendar.jsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.jsx'
import { Input } from '@/components/ui/input.jsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.jsx'
import { cn } from '@/lib/utils.js'

export const StudentUpdateForm = ({ form, onSubmit, student }) => {
  return (
    <Form {...form}>
      <form
        id="student-update-form"
        onSubmit={form.handleSubmit((data) => onSubmit(student._id, data))}
        className=" my-4 md:mx-3">
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className={'grid grid-cols-3'}>
                <FormLabel>
                  Full Name : <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Full Name"
                    {...field}
                    className={'h-10 col-span-2'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 items-center">
            <div>Class : </div>
            <div className="col-span-2 border-2 rounded-md h-10 px-2 flex items-center">
              {student.class}
            </div>
          </div>
          <div className="grid grid-cols-3 items-center">
            <div>Section : </div>
            <div className="col-span-2 border-2 rounded-md h-10 px-2 flex items-center">
              {student.section}
            </div>
          </div>
          <div className="grid grid-cols-3 items-center">
            <div>Roll Number : </div>
            <div className="col-span-2 border-2 rounded-md h-10 px-2 flex items-center">
              {student.rollNumber}
            </div>
          </div>

          <FormField
            control={form.control}
            name="guardianName"
            render={({ field }) => (
              <FormItem className={'grid grid-cols-3'}>
                <FormLabel>
                  Guardian Name :<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className={'col-span-2'}
                    placeholder="Enter Guardian Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="guardianContact"
            render={({ field }) => (
              <FormItem className={'grid grid-cols-3 gap-4'}>
                <FormLabel>
                  Guardian Contact :<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <PhoneNumberInput
                    className={'col-span-2'}
                    field={field}
                    placeholder="Enter phone Number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className={'grid grid-cols-3'}>
                <FormLabel>Email :</FormLabel>
                <FormControl>
                  <Input
                    className={'col-span-2'}
                    placeholder="Enter Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 items-center">
            <div>Date of Birth : </div>
            <div className="col-span-2 border-2 rounded-md h-10 px-2 flex items-center">
              {format(student.dateOfBirth, 'dd-mm-yyyy')}
            </div>
          </div>
          <FormField
            control={form.control}
            name="admissionDate"
            render={({ field }) => (
              <FormItem className={'grid grid-cols-3'}>
                <FormLabel>
                  Admission Date :<span className="text-red-500">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          ' pl-3 text-left font-normal col-span-2',
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="academicYear"
            render={({ field }) => (
              <FormItem className={'grid grid-cols-3'}>
                <FormLabel>Academic Year :</FormLabel>
                <FormControl>
                  <Input className={'col-span-2'} placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className={'grid grid-cols-3'}>
                <FormLabel>
                  Address :<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Address"
                    className={'col-span-2'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}
