/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from '@hookform/resolvers/zod'
import { Suspense, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import ErrorBoundary from '@/components/common/ErrorBoundary.jsx'
import { DeleteDialog } from '@/components/molecules/DeleteDialog.jsx'
import  DataTable  from '@/components/organisms/DataTable.jsx'
import { getStaffColumns } from '@/components/organisms/staff/staffColumns.jsx'
import { ViewStaffModal } from '@/components/organisms/staff/ViewStaffModal.jsx'
import { useDeleteStaff } from '@/hooks/staff/useDeleteStaff.js'
import { useGetAllStaffs } from '@/hooks/staff/useGetAllStaffs.js'
import { useUpdateStaff } from '@/hooks/staff/useUpdateStaff.js'
import { updateStaffSchema } from '@/validators/zodStaffSchema.js'

export const ViewTeachers = () => {
  const navigate = useNavigate()
  const updateForm = useForm({
    resolver: zodResolver(updateStaffSchema),
    defaultValues: {
      role: 'teacher', // Or 'admin'/'student' based on your default
      fullName: '',
      contactNumber: '',
      email: '',
      address: '',
      dateOfJoining: '',
      salary:'',
    },
    mode: 'onchange',
  })

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [selectedStaff, setSelectedStaff] = useState(null)
  const [modalMode, setModalMode] = useState(null)

  const { refetch, data: staffs } = useGetAllStaffs({ ...pagination })
  const { mutate: deleteStaff } = useDeleteStaff()
  const { mutate: updateStaff } = useUpdateStaff()

  const handleDeleteClick = (staff) => {
    setSelectedStaff(staff)
    setModalMode('delete')
  }

  const handleDelete = (id) => {
    deleteStaff(id)
    closeModal()
  }

  const handleView = (staff) => {
    setSelectedStaff(staff)
    console.log(staff)
    updateForm.reset({
      fullName: staff.fullName,
      role: staff.role.toLowerCase(),
      contactNumber: staff.contactNumber,
      address: staff.address,
      email: staff.email,
      dateOfJoining: staff.dateOfJoining,
    })
    setModalMode('view')
  }

  const handleUpdate = (data) => {
    console.log(selectedStaff, data)

    updateStaff({ id: selectedStaff._id, data })
    closeModal()
  }

  const closeModal = () => {
    setSelectedStaff(null)
    setModalMode(null)
  }

  const staffColumns = getStaffColumns(handleDeleteClick, handleView)

  useEffect(() => {
    refetch()
  }, [pagination.pageIndex, pagination.pageSize])

  return (
    <div className="flex flex-col gap-y-10 items-center md:mt-10">
      <div className="w-full md:w-2/3 overflow-x-auto ">
        <ErrorBoundary fallback="Error..">
          <Suspense fallback="Loading...">
            <DataTable
              columns={staffColumns}
              data={staffs?.data || []}
              totalCount={staffs?.meta.totalDocuments || 1}
              pagination={pagination}
              setPagination={setPagination}
            />
          </Suspense>
        </ErrorBoundary>

        {selectedStaff && (
          <ErrorBoundary>
            <Suspense fallback="Loading...">
              <DeleteDialog
                open={modalMode == 'delete'}
                onConfirm={handleDelete}
                deletableName={selectedStaff.fullName}
                deletableId={selectedStaff._id}
                onOpenChange={closeModal}
              />
            </Suspense>
          </ErrorBoundary>
        )}

        {selectedStaff && (
          <ErrorBoundary>
            <Suspense fallback="Loading....">
              <ViewStaffModal
                form={updateForm}
                open={modalMode == 'view'}
                onOpenChange={closeModal}
                staff={selectedStaff}
                onSubmit={handleUpdate}
                navigate={navigate}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
    </div>
  )
}
