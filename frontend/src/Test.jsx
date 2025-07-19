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

export const Test = () => {
  const type = 'fees' // Example type, can be 'fees' or 'salary'
  return (
    <div className="flex justify-center relative items-center min-h-screen bg-gray-100 print:bg-white ">
      <Card
        id="printCard"
        className="w-full md:w-1/2 p-6 print:p-4 print:h-screen print:shadow-none print:border-none">
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
            <p>Invoice: FEE011</p>
            <p>Date: 15 July 2025</p>
          </div>
          <Separator className={'my-4'} />

          <div className="text-2xl flex flex-col gap-4 font-medium ">
            <div className="flex justify-between">
              <p>Payee Name: John Doe</p>
              <p>Payee Type: Student</p>
            </div>
            <div className="flex justify-between">
              <p>Class: 10</p>
              <p>Section: A</p>
              <p>Roll No.: 25</p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="text-lg font-semibold flex flex-col gap-2">
            <h1 className="text-center">Fees Details</h1>
            <Table>
              <TableHeader className="bg-gray-200">
                <TableRow>
                  <TableHead>Field</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Amount Paid</TableCell>
                  <TableCell>&#8377; 200</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Fees</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>For Month</TableCell>
                  <TableCell>July 2025</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>UPI</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Reference Id</TableCell>
                  <TableCell>TXN12345789</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Notes</TableCell>
                  <TableCell>Paid via driver</TableCell>
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
