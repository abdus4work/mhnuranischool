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

const FeesSearchForm = ({ form, onSubmit }) => {
  const classOptions = ['Nursery', 'Lower', 'Upper', 'One', 'Two', 'Three']
  const sectionOptions = ['A', 'B', 'C', 'D', 'E']
  const monthOptions = [
    'All',
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
        <div className="grid md:grid-cols-8 gap-4 items-end">
          <div className={'md:col-span-7 grid grid-cols-6 gap-4'}>
            <div className="col-span-2 grid md:grid-cols-2 gap-4">
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
                          <SelectItem key={item} value={index}>
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
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2 grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Status <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className={'h-10 w-full'}>
                          <SelectValue placeholder="Class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">ALL</SelectItem>
                        <SelectItem value="due">DUE</SelectItem>
                        <SelectItem value="paid">PAID</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Class <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={(val) =>
                        field.onChange(val === 'none' ? undefined : val)
                      }
                      value={field.value ?? 'none'}>
                      <FormControl>
                        <SelectTrigger className={'h-10 w-full'}>
                          <SelectValue placeholder="Class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem key={'placeholder'} value="none">
                          None
                        </SelectItem>
                        {classOptions.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2 grid md:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name="section"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Section <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={(val) =>
                        field.onChange(val === 'none' ? undefined : val)
                      }
                      value={field.value ?? 'none'}>
                      <FormControl>
                        <SelectTrigger className={'h-10 w-full'}>
                          <SelectValue placeholder="Section" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem key={'noneSec'} value="none">
                          None
                        </SelectItem>
                        {sectionOptions.map((item) => (
                          <SelectItem key={item} value={item}>
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
                name="rollNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Roll Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter roll number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            type="submit"
            className={
              'border-emerald-400 border-1 h-10 cursor-pointer active:scale-95 bg-emerald-600 hover:bg-emerald-700 text-white text-2xl'
            }>
            Search
          </Button>
        </div>
      </form>
    </Form>
  )
}


export default FeesSearchForm;