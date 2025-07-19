// columns.js

import { Button } from '@/components/ui/button'

export const getPaySelectColumn = (type, setPayee, setSearchParams) => {
  const studentColumns = [
    {
      accessorKey: 'class',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Class{' '}
          {column.getIsSorted() === 'asc'
            ? '🔼'
            : column.getIsSorted() === 'desc'
              ? '🔽'
              : ''}
        </Button>
      ),
    },
    {
      accessorKey: 'section',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Section{' '}
          {column.getIsSorted() === 'asc'
            ? '🔼'
            : column.getIsSorted() === 'desc'
              ? '🔽'
              : ''}
        </Button>
      ),
    },
    {
      accessorKey: 'rollNumber',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Roll Number{' '}
          {column.getIsSorted() === 'asc'
            ? '🔼'
            : column.getIsSorted() === 'desc'
              ? '🔽'
              : ''}
        </Button>
      ),
    },
    {
      accessorKey: 'fullName',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Full Name{' '}
          {column.getIsSorted() === 'asc'
            ? '🔼'
            : column.getIsSorted() === 'desc'
              ? '🔽'
              : ''}
        </Button>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const student = row.original
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => {
                setPayee(student)
                setSearchParams({ payeeId: student._id, name: student.fullName })
              }}>
              Select
            </Button>
          </div>
        )
      },
    },
  ]

  const staffColumns = [
    {
      accessorKey: 'employeeId',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Employee Id{' '}
          {column.getIsSorted() === 'asc'
            ? '🔼'
            : column.getIsSorted() === 'desc'
              ? '🔽'
              : ''}
        </Button>
      ),
    },
    {
      accessorKey: 'fullName',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Full Name{' '}
          {column.getIsSorted() === 'asc'
            ? '🔼'
            : column.getIsSorted() === 'desc'
              ? '🔽'
              : ''}
        </Button>
      ),
    },
    {
      accessorKey: 'contactNumber',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Contact Number{' '}
          {column.getIsSorted() === 'asc'
            ? '🔼'
            : column.getIsSorted() === 'desc'
              ? '🔽'
              : ''}
        </Button>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const payee = row.original
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => {
                console.log(payee)
                setPayee(payee)
                setSearchParams({ payeeId: payee._id, name: payee.fullName })
              }}>
              Select
            </Button>
          </div>
        )
      },
    },
  ]
  return type === 'FEES' ? studentColumns : staffColumns
}
