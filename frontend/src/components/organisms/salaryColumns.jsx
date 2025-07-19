// columns.js

import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button'

export const getSalaryColumns = (navigate) => {
  const monthOptions = [
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
  return [
    {
      accessorKey: 'staffId.employeeId',
      id: 'employeeId',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Employee ID{' '}
          {column.getIsSorted() === 'asc'
            ? '🔼'
            : column.getIsSorted() === 'desc'
              ? '🔽'
              : ''}
        </Button>
      ),
    },
    {
      accessorKey: 'staffId.fullName',
      id: 'fullName',
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
      accessorKey: 'months',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Month{' '}
          {column.getIsSorted() === 'asc'
            ? '🔼'
            : column.getIsSorted() === 'desc'
              ? '🔽'
              : ''}
        </Button>
      ),
      cell: ({ row }) => {
        const { month, year } = row.original

        return `${monthOptions[month - 1]} - ${year}`
      },
    },

    {
      accessorKey: 'monthlySalary',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Amount {' '}
          {column.getIsSorted() === 'asc'
            ? '🔼'
            : column.getIsSorted() === 'desc'
              ? '🔽'
              : ''}
        </Button>
      ),
      cell:({row})=>{
        return (
          <div>
            ₹ {row.original.monthlySalary}
          </div>
        )
      }
    },

    {
      accessorKey: 'status',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Status{' '}
          {column.getIsSorted() === 'asc'
            ? '🔼'
            : column.getIsSorted() === 'desc'
              ? '🔽'
              : ''}
        </Button>
      ),
      cell: ({ row }) => {
        const { status } = row.original

        return status == 'DUE' ? (
          <Badge variant="destructive">DUE</Badge>
        ) : (
          <Badge className={'bg-green-500'} variant="default">
            PAID
          </Badge>
        )
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const salary = row.original
        return (
          <div className="grid grid-cols-2 gap-2 min-w-[120px]">
            <Button
              className={'bg-blue-500 hover:bg-blue-600 px-4'}
              disabled={salary.status == 'PAID'}
              size="sm"
              onClick={() =>
                navigate(
                  `/transactions/add?type=salary&month=${salary.month}&payeeId=${salary.staffId?._id}&name=${salary.staffId?.fullName}`
                )
              }>
              {salary.status == 'DUE' ? 'Pay now' : 'Paid'}
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={() => console.log(salary)}>
              View
            </Button>
          </div>
        )
      },
    },
  ]
}
