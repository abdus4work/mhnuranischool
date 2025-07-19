import { Button } from '@/components/ui/button.jsx'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.jsx'

export const DueGenerateForm = ({ form, onSubmit,className }) => {
  const monthOptions = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className={`grid gap-4 items-end  ${className}`}>
          <div
            className={
              'grid md:grid-cols-2 gap-4  md:col-span-2'
            }>
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Month <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={(val) => field.onChange(parseInt(val))}
                    value={parseInt(field.value)}>
                    <FormControl>
                      <SelectTrigger className={'h-10 w-full'}>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {monthOptions.map((item, index) => (
                        <SelectItem key={item} value={index+1}>
                          {item}
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
                  <FormLabel>
                    Year <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={'number'}
                      placeholder="Ex: 2025"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className={
              'border-emerald-400 border-1 h-10  cursor-pointer active:scale-95 bg-emerald-600 hover:bg-emerald-700 text-white text-xl min-w-[140px] '
            }>
            Generate Due
          </Button>
        </div>
      </form>
    </Form>
  )
}
