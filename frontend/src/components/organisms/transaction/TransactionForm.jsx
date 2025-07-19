import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'

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
import { Textarea } from '@/components/ui/textarea.jsx'
import { cn } from '@/lib/utils.js'

export const TransactionForm = ({
  form,
  onSubmit,
  paidMonth = [],
  className,
}) => {
  const [open, setOpen] = useState(false)
  const monthOptions = [
    { value: 1, label: 'January', disabled: false },
    { value: 2, label: 'February', disabled: false },
    { value: 3, label: 'March', disabled: false },
    { value: 4, label: 'April', disabled: false },
    { value: 5, label: 'May', disabled: false },
    { value: 6, label: 'June', disabled: false },
    { value: 7, label: 'July', disabled: false },
    { value: 8, label: 'August', disabled: false },
    { value: 9, label: 'September', disabled: false },
    { value: 10, label: 'October', disabled: false },
    { value: 11, label: 'November', disabled: false },
    { value: 12, label: 'December', disabled: false },
  ]

  monthOptions.forEach((item, index) => {
    if (paidMonth.includes(index + 1)) {
      item.disabled = true
    }
  })

  return (
    <Form {...form}>
      <form
        id="transaction-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8">
        <div className={`${className}`}>
          <FormField
            control={form.control}
            name="payee"
            render={({ field }) => (
              <FormItem className={'md:col-span-2'}>
                <FormLabel>
                  Payee : <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="Payee Id"
                    {...field}
                    className={`h-10  `}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Type <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={(val) => field.onChange(val)}
                  value={field.value || ''}>
                  <FormControl>
                    <SelectTrigger className={`h-10 w-full `}>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="FEES">FEES</SelectItem>
                    <SelectItem value="SALARY">SALARY</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Month <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={(val) => {
                    const parsed = Number(val)
                    
                    if (paidMonth.includes(parsed)||parsed==0) {
                      console.log('Month already paid:', parsed)
                      form.setError('month',{
                        type: 'manual',
                        message: 'This month is already paid',
                      })
                    } else {
                      field.onChange(parsed)
                    }
                  }}
                  value={
                    field.value && !paidMonth.includes(field.value)
                      ? parseInt(field.value, 10)
                      : undefined
                  }>
                  <FormControl>
                    <SelectTrigger className={`h-10  w-full `}>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {monthOptions.map((item) => (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        disabled={item.disabled}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input
                    type={'number'}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type={'number'}
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ''
                          ? undefined
                          : Number(e.target.value)
                      )
                    }
                    value={field.value ?? undefined}
                    placeholder="Enter Amount"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Payment Date <span className="text-red-500">*</span>
                </FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'pl-3 text-left font-normal h-10',
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
                        setOpen(false)
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
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Payment Method <span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className={`h-10 w-full `}>
                      <SelectValue placeholder="Payment Method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="CASH">Cash</SelectItem>
                    <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentReference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Reference</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Payment Reference"
                    {...field}
                    className={`h-10 `}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="md:col-span-3">
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter any notes"
                    className={`h-20`}
                    value={field.value ?? ''} // Ensure value is defined
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
