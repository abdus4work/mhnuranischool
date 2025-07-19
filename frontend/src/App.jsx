import { Route, Routes } from 'react-router'

import { DashboardLayout } from '@/components/templates/DashboardLayout.jsx'
import { ProtectedLayout } from '@/components/templates/ProtectedLayout.jsx'
import { Login } from '@/pages/auth/Login.jsx'
import { ViewFees } from '@/pages/fees/ViewFees.jsx'
import { AddStaff } from '@/pages/Staff/AddStaff.jsx'
import { ViewTeachers } from '@/pages/Staff/ViewStaffs.jsx'
import { AddStudent } from '@/pages/Student/AddStudent.jsx'
import { StudentProfile } from '@/pages/Student/StudentProfile.jsx'
import { ViewStudent } from '@/pages/Student/ViewStudent.jsx'
import { AddTransaction } from '@/pages/transaction/AddTransaction.jsx'
import TransactionDownload from '@/pages/transaction/TransactionDownload.jsx'
import ViewTransactions from '@/pages/transaction/ViewTransaction.jsx'
import { Test } from '@/Test.jsx'
import ViewSalary from '@/pages/salary/ViewSalary.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path={'/'} element={<ProtectedLayout />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Test />} />
            <Route path={'students/add'} element={<AddStudent />} />
            <Route path="students" element={<ViewStudent />} />
            <Route path="students/:id" element={<StudentProfile />} />
            <Route path="staffs" element={<ViewTeachers />} />
            <Route path="staffs/add" element={<AddStaff />} />
            <Route path="fees" element={<ViewFees />} />
            <Route path="transactions/add" element={<AddTransaction />} />
            <Route path="transactions" element={<ViewTransactions />} />
            <Route path='salary' element={<ViewSalary/>}/>
          </Route>
          <Route
            path="/transactions/:paymentId"
            element={<TransactionDownload />}
          />
        </Route>
      </Routes>
    </>
  )
}

export default App
