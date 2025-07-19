import { Suspense, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import ErrorBoundary from '@/components/common/ErrorBoundary.jsx'
import { DeleteDialog } from '@/components/molecules/DeleteDialog.jsx'
import DataTable from '@/components/organisms/DataTable.jsx'
import { getColumns } from '@/components/organisms/student/studentColumns.jsx'
import { StudentSearchForm } from '@/components/organisms/student/StudentSearchForm.jsx'
import { ViewStudentModal } from '@/components/organisms/student/ViewStudentModal.jsx'
import { useDeleteStudent } from '@/hooks/students/useDeleteStudent.js'
import { useGetAllStudent } from '@/hooks/students/useGetAllStudent.js'
import { useUpdateStudent } from '@/hooks/students/useUpdateStudent.js'

export const ViewStudent = () => {
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      class: '',
      section: '',
      rollNumber: '',
    },
  })

  const updateForm = useForm({
    defaultValues: {
      fullName: '',
      guardianName: '',
      guardianContact: '',
      address: '',
      email: '',
      admissionDate: '',
      academicYear: '',
    },
  })

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [modalMode, setModalMode] = useState(null)

  const result = useGetAllStudent({ ...form.watch(), ...pagination })

  const { mutate: deleteStudentMutate } = useDeleteStudent()
  const { mutate: updateStudentMutate } = useUpdateStudent()

  const closeModal = () => {
    setSelectedStudent(null)
    setModalMode(null)
  }

  const handleUpdate = (id, data) => {
    console.log('Updated student', data, id)
    updateStudentMutate({ id, data })
    closeModal()
  }

  const handleView = (student) => {
    console.log(student)

    setSelectedStudent(student)
    updateForm.reset({
      fullName: student.fullName,
      guardianName: student.guardianName,
      guardianContact: student.guardianContact,
      address: student.address,
      email: student.email,
      admissionDate: student.admissionDate,
      academicYear: student.academicYear,
      monthlyFees: student.monthlyFees,
    }) // sync student data into form
    setModalMode('view')
  }

  const handleDeleteClick = (student) => {
    setSelectedStudent(student)
    setModalMode('delete')
  }

  const handleDelete = (id) => {
    deleteStudentMutate(id)
    closeModal
  }

  const onSubmit = () => {
    result.refetch()
  }

  const columns = getColumns(handleDeleteClick, handleView)

  useEffect(() => {
    result.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageIndex, pagination.pageSize])

  return (
    <div className="flex flex-col gap-y-10 items-center md:mt-10">
      <div className="md:w-2/3">
        <ErrorBoundary fallback="ERROR">
          <Suspense fallback="Loading..">
            <StudentSearchForm form={form} onSubmit={onSubmit} />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className="w-full md:w-2/3 overflow-x-auto ">
        <ErrorBoundary fallback="Error..">
          <Suspense fallback="Loading...">
            <DataTable
              columns={columns}
              data={result?.data?.data}
              totalCount={result?.data?.meta.totalDocuments || 1}
              pagination={pagination}
              setPagination={setPagination}
            />
          </Suspense>
        </ErrorBoundary>
        {selectedStudent && (
          <ErrorBoundary>
            <ViewStudentModal
              open={modalMode === 'view'}
              onOpenChange={closeModal}
              student={selectedStudent}
              form={updateForm}
              onSubmit={handleUpdate}
              navigate={navigate}
            />
          </ErrorBoundary>
        )}
        {selectedStudent && (
          <ErrorBoundary>
            <DeleteDialog
              open={modalMode === 'delete'}
              onOpenChange={closeModal}
              user={selectedStudent}
              onConfirm={handleDelete}
              deletableName={selectedStudent.fullName}
              deletableId={selectedStudent._id}
            />
          </ErrorBoundary>
        )}
      </div>
      <div
        id="printCard"
        className="hidden print:block p-4 z-50 !absolute bg-white shadow-md rounded-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia rerum,
        molestiae in culpa deserunt exercitationem sunt! Consequatur similique
        asperiores labore assumenda error quaerat officiis? Nam ut itaque odio
        obcaecati quaerat.
      </div>
    </div>
  )
}
