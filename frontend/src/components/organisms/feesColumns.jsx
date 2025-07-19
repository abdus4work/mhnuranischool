// columns.js

import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button'

export const getFeesColumns = (navigate) => {
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
      accessorKey: 'student.fullName',
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
      accessorKey: 'student.class',
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
      accessorKey: 'student.section',
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
      accessorKey: 'student.rollNumber',
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
      accessorKey: 'monthlyFees',
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
      cell: ({ row }) => {
        const { monthlyFees } = row.original
        return `₹ ${monthlyFees}`
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const fees = row.original
        return (
          <div className="grid grid-cols-2 gap-2 min-w-[120px]">
            <Button
              className={'bg-blue-500 hover:bg-blue-600 px-4'}
              disabled={fees.status == 'PAID'}
              size="sm"
              onClick={() =>
                navigate(
                  `/transactions/add?type=fees&month=${fees.month}&payeeId=${fees.studentId}&name=${fees.student.fullName}`
                )
              }>
              {fees.status == 'DUE' ? 'Pay now' : 'Paid'}
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={() => console.log(fees)}>
              View
            </Button>
          </div>
        )
      },
    },
  ]
}
