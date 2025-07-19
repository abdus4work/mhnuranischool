import { Button } from '@/components/ui/button.jsx'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'

export const StudentSearchForm = ({form, onSubmit}) => {
  const classOptions = ['Nursery', 'Lower', 'Upper', 'One', 'Two', 'Three']
  const sectionOptions = ['A', 'B', 'C', 'D', 'E']
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <div className="grid md:grid-cols-4 gap-4 items-end">
          <div className={'md:col-span-3 grid grid-cols-3 gap-4'}>
            <FormField
              control={form.control}
              name="class"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Class
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
            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Section
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
                    Roll Number
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter roll number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className={'border-emerald-400 border-1 h-10 cursor-pointer active:scale-95 bg-emerald-600 hover:bg-emerald-700 text-white text-2xl'}
            >
            Search
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default StudentSearchForm
