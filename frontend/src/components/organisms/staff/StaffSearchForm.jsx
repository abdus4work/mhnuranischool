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

export const StaffSearchForm = ({ form, onSubmit }) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-center items-end  gap-4">
          <FormField
            control={form.control}
            name="employeeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter employee ID"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

export default StaffSearchForm
