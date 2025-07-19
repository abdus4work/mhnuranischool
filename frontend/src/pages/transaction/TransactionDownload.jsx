import { format } from 'date-fns'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

import logo from '@/assets/logo.png'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.jsx'
import { useGetTransactionByPaymentId } from '@/hooks/transaction/useGetTransactionByPaymentId.js'

const TransactionDownload = () => {
  const navigate = useNavigate()
  const { paymentId } = useParams()
  const {
    data: transaction,
    isError,
    error,
    isFetching,
  } = useGetTransactionByPaymentId(paymentId)

  const studentDetails = transaction?.data || {}

  console.log(transaction)
  useEffect(() => {
    document.title = `Invoice_#${paymentId}`
  }, [paymentId])

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    )
  }

  if (isError) {
    console.error('Error fetching transaction:', error)
    return (
      <div className="text-red-500 flex justify-center items-center">
        Error fetching transaction details
      </div>
    )
  }
  return (
    <div className="flex justify-center h-screen relative items-center  bg-gray-100 print:bg-white ">
      <Card
        id="printCard"
        className="w-full  md:w-1/2 p-6 print:p-2  min-w-[700px] print:h-screen print:shadow-none print:border-none scale-50 md:scale-75 print:scale-100 bg-white text-black dark:bg-white dark:text-black">
        <CardHeader className="flex ">
          <img src={logo} alt="Logo" className="h-[120px]" />
          <div className="text-center flex-1 flex flex-col justify-center items-center font-semibold">
            <h1 className="text-3xl font-bold font-[Aclonica]">
              M.H. Nurani National School
            </h1>
            <Badge>ESTD 2017</Badge>
            <p className="text-sm">
              Bengali, English, Deniyat Nursery & K.G. School
            </p>
            <p className="text-sm">
              Vill. - Mollarchak (Deep Tubewell), P.O. - Bakultalahat
            </p>

            <p className="text-sm">Phone: +91 77183360</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between text-xl font-semibold">
            <p>Invoice: {studentDetails?.paymentId}</p>
            <p>Date: {format(studentDetails?.paymentDate, 'PPP')}</p>
          </div>
          <Separator className={'my-4'} />

          <div className="text-2xl flex flex-col gap-4 font-medium ">
            <div className="flex justify-between">
              <p>Payee Name: {studentDetails?.payee.fullName} </p>
              <p>
                Payee Type:{' '}
                {studentDetails?.type === 'FEES' ? 'Student' : 'Staff'}
              </p>
            </div>
            {studentDetails?.type === 'FEES' && (
              <div className="flex justify-between">
                <p>Class: {studentDetails?.payee.class}</p>
                <p>Section: {studentDetails?.payee.section}</p>
                <p>Roll No.: {studentDetails?.payee.rollNumber}</p>
              </div>
            )}
          </div>
          <Separator className="my-4" />
          <div className="text-lg font-semibold flex flex-col gap-2">
            <h1 className="text-center">Payment Details</h1>
            <Table className={'text-xl'}>
              <TableHeader className="!bg-gray-200">
                <TableRow>
                  <TableHead>Field</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Amount Paid</TableCell>
                  <TableCell>&#8377; {studentDetails?.amount}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Fees</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>For Month</TableCell>
                  <TableCell>{`${format(`${studentDetails?.month}-1-${studentDetails?.year}`, 'MMMM yyyy')}`}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>{studentDetails?.paymentMethod}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Reference Id</TableCell>
                  <TableCell>{studentDetails?.paymentReference}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Notes</TableCell>
                  <TableCell
                    className={'whitespace-normal break-words max-w-[300px]'}>
                    {studentDetails?.notes}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <p className="text-sm mt-4">
            This is a system-generated receipt and does not require a signature.
          </p>
        </CardContent>
        <CardFooter
          className={'flex justify-center items-center gap-4 print:hidden'}>
          <Button onClick={() => navigate('/transactions')}>Back</Button>
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => window.print()}>
            Print
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
export default TransactionDownload
