import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { format } from 'date-fns'
import { lazy, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router'

import { getPaySelectColumn } from '@/components/organisms/PaySelectColumn.jsx'
import { TransactionForm } from '@/components/organisms/transaction/TransactionForm.jsx'
import FormTableLayout from '@/components/templates/FormTableLayout.jsx'
import PageContainer from '@/components/templates/PageContainer.jsx'
import { Button } from '@/components/ui/button.jsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.jsx'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog.jsx'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs.jsx'
import { useGetStudentFees } from '@/hooks/fees/useGetStudentFees.js'
import { useGetSalaryByStaff } from '@/hooks/salary/useGetSalaryByStaff.js'
import { useGetAllStaffs } from '@/hooks/staff/useGetAllStaffs.js'
import { useGetAllStudent } from '@/hooks/students/useGetAllStudent.js'
import { useAddTransaction } from '@/hooks/transaction/useAddTransaction.js'
import { transactionSchema } from '@/validators/zodTransactionSchema.js'

const StudentSearchForm = lazy(
  () => import('@/components/organisms/student/StudentSearchForm.jsx')
)
const StaffSearchForm = lazy(
  () => import('@/components/organisms/staff/StaffSearchForm.jsx')
)

export const AddTransaction = () => {
  const navigate = useNavigate()
  const formRef = useRef(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const typeFromParams = searchParams.get('type')?.toUpperCase()
  const [type, setType] = useState(typeFromParams || 'FEES')
  const payeeId = searchParams.get('payeeId')
  const month = searchParams.get('month')

  const transactionDefaultValues = {
    type: type,
    payee: '',
    month: Number(month) || new Date().getMonth(), // Default to current month
    year: new Date().getFullYear(),
    amount: undefined,
    paymentDate: format(new Date(), 'yyyy-MM-dd'), // Format to YYYY-MM-DD
    paymentMethod: 'CASH',
    paymentReference: 'NA',
    notes: '',
  }

  const searchForm = useForm()
  const transactionForm = useForm({
    mode: 'all',
    resolver: zodResolver(transactionSchema),
    defaultValues: transactionDefaultValues,
  })

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const [payee, setPayee] = useState({ _id: payeeId })
  const [paidMonth, setPaidMonth] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [newPaymentId, setNewPaymentId] = useState(null)

  const studentFees = useGetStudentFees(
    type === 'FEES' ? payee?._id : undefined
  )
  const staffSalary = useGetSalaryByStaff(
    type === 'SALARY' ? payee?._id : undefined
  )

  const { data: studentRecords, refetch: refetchStudent } = useGetAllStudent({
    ...searchForm.watch(),
    pagination,
  })
  const { data: staffRecords, refetch: refetchStaff } = useGetAllStaffs({
    ...searchForm.watch(),
    pagination,
  })

  const transaction = useAddTransaction(setOpenDialog)

  const handleTypeChange = (newType) => {
    setSearchParams('')
    setType(newType)
    setPayee(undefined) // Reset payee when type changes
    // Reset form when type changes
    if (newType === 'FEES') {
      searchForm.reset({
        class: undefined,
        section: undefined,
        rollNumber: undefined,
      })
    } else if (newType === 'SALARY') {
      searchForm.reset({
        employeeId: undefined,
      })
    }
  }

  const handleSearch = (data) => {
    // Handle search logic here
    if (type === 'FEES') {
      refetchStudent()
    } else if (type === 'SALARY') {
      refetchStaff()
    }
    console.log('Search Data:', data, 'Type:', type)
  }

  const handlePay = async (data) => {
    // Handle payment logic here
    await transaction.mutateAsync(data, {
      onSuccess: (data) => {
        console.log('Payment Transaction successful:', data)
        setNewPaymentId(data?.data.paymentId) // Store the new payment ID
      },
    })
    // You can add your payment processing logic here
  }

  const columns = getPaySelectColumn(type, setPayee, setSearchParams)

  useEffect(() => {
    const fetchAndSetData = async () => {
      if (payee?._id) {
        if (type === 'FEES') {
          const { data } = await studentFees.refetch()
          const paidMonth = data?.data?.map((item) => {
            if (item.status === 'PAID') {
              return item.month
            }
          })
          setPaidMonth(paidMonth)
          const amount = data?.data[0]?.monthlyFees || 0
          transactionForm.setValue('amount', amount, { shouldValidate: true })
          transactionForm.setValue('payee', payee?._id, {
            shouldValidate: true,
          })
        } else if (type === 'SALARY') {
          transactionForm.setValue('payee', payee?._id)
          const { data } = await staffSalary.refetch()
          console.log('Salary Data:', data)
          const paidMonth = data?.data?.map((item) => {
            if (item.status === 'PAID') {
              return item.month
            }
          })
          setPaidMonth(paidMonth)
          const amount = data?.data[0]?.monthlySalary || 0
          transactionForm.setValue('amount', amount, { shouldValidate: true })
        }
        transactionForm.setValue('type', type)
      } else {
        setPaidMonth([]) // Reset paid month for salary
        transactionForm.reset(
          {
            ...transactionDefaultValues,
            amount: '',
            type: type,
            month: new Date().getMonth(),
          },
          { shouldValidate: true }
        ) // Reset form values except type
      }
    }
    fetchAndSetData()
    console.log(type)
  }, [payee, type])

  useEffect(() => {
    const ref = formRef.current
    if (ref && type && payeeId) {
      ref.scrollIntoView({ behavior: 'smooth' })
      ref.classList.add('ring-1', 'ring-emerald-500', 'rounded-lg')

      const timeoutId = setTimeout(() => {
        ref.classList.remove('ring-1', 'ring-emerald-500', 'rounded-lg')
      }, 3000)

      return () => clearTimeout(timeoutId) // cleanup
    }
  }, [searchParams])

  return (
    <PageContainer>
      <Tabs
        defaultValue={type === 'FEES' ? 'student' : 'staff'}
        className="w-full flex items-center gap-4">
        <TabsList className={'bg-emerald-400'}>
          <TabsTrigger value="student" onClick={() => handleTypeChange('FEES')}>
            Student
          </TabsTrigger>
          <TabsTrigger value="staff" onClick={() => handleTypeChange('SALARY')}>
            Staff
          </TabsTrigger>
        </TabsList>
        <TabsContent value="student" className="flex justify-center w-full">
          <FormTableLayout
            formComp={{
              component: StudentSearchForm,
              props: { form: searchForm, onSubmit: handleSearch },
            }}
            tableProps={{
              data: studentRecords?.data || [],
              pagination,
              setPagination,
              columns,
              totalCount: 0, // Placeholder for total count
            }}
          />
        </TabsContent>
        <TabsContent value="staff" className="flex justify-center w-full">
          <FormTableLayout
            formComp={{
              component: StaffSearchForm,
              props: { form: searchForm, onSubmit: handleSearch },
            }}
            tableProps={{
              data: staffRecords?.data || [],
              pagination,
              setPagination,
              columns,
              totalCount: 0,
            }}
          />
        </TabsContent>
      </Tabs>
      <Card className="w-full md:w-2/3 mt-6" ref={formRef}>
        <CardHeader>
          <CardTitle className={'text-center text-xl'}>
            Add Transaction
          </CardTitle>
          <CardDescription
            className={'text-center text-sm text-muted-foreground'}>
            Fill in the details below to add a new transaction for{' '}
            {type === 'FEES' ? 'Student' : 'Staff'}.
            <br />
            Name:{' '}
            {payee?._id
              ? payee?.fullName || payee?.employeeId || searchParams.get('name')
              : 'Not Selected'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionForm
            form={transactionForm}
            onSubmit={handlePay}
            paidMonth={paidMonth}
            className={'grid md:grid-cols-3 gap-4'}
          />
        </CardContent>
        <CardFooter>
          <Button
            disabled={!transactionForm.formState.isValid}
            type="submit"
            form="transaction-form">
            Add Transaction
          </Button>
        </CardFooter>
      </Card>
      {
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-semibold">
                Print Transaction Receipt
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Transaction added successfully! Click the button below to print
              the receipt. <br />
              Payment ID: {newPaymentId}
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="mr-2">
                  Close
                </Button>
              </DialogClose>
              <Button
                onClick={() => {
                  setOpenDialog(false)
                  navigate(`/transactions/${newPaymentId}`)
                }}>
                Print Receipt
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    </PageContainer>
  )
}
