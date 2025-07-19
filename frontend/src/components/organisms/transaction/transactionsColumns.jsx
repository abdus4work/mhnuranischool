// columns.js

import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button'

export const getTransactionColumns = (navigate) => {
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
      accessorKey: 'paymentId',
      id: 'paymentId',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Payment ID{' '}
          {column.getIsSorted() === 'asc'
            ? '🔼'
            : column.getIsSorted() === 'desc'
              ? '🔽'
              : ''}
        </Button>
      ),
    },
    {
      accessorKey: 'payee.fullName',
      id: 'fullName',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Payee Name{' '}
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
      accessorKey: 'type',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Type{' '}
          {column.getIsSorted() === 'asc'
            ? '🔼'
            : column.getIsSorted() === 'desc'
              ? '🔽'
              : ''}
        </Button>
      ),
      cell: ({ row }) => {
        const { type } = row.original

        return type == 'FEES' ? (
          <Badge className={'bg-blue-500'}>FEES</Badge>
        ) : (
          <Badge className={'bg-green-500'} variant="default">
            SALARY
          </Badge>
        )
      },
    },
    {
      accessorKey: 'paymentDate',
      id: 'paymentDate',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Payment Date{' '}
          {column.getIsSorted() === 'asc'
            ? '🔼'
            : column.getIsSorted() === 'desc'
              ? '🔽'
              : ''}
        </Button>
      ),
    },
    {
      accessorKey: 'amount',
      id: 'amount',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Amount{' '}
          {column.getIsSorted() === 'asc'
            ? '🔼'
            : column.getIsSorted() === 'desc'
              ? '🔽'
              : ''}
        </Button>
      ),
      cell: ({ row }) => {
        const { amount } = row.original
        return `₹ ${amount}`
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const transaction = row.original
        return (
          <div className="grid grid-cols-2 gap-2 min-w-[120px]">
            <Button
              className={'bg-blue-500 hover:bg-blue-600 px-4'}
              size="sm"
              onClick={() =>
                navigate(`/transactions/${transaction.paymentId}`)
              }>
              Print
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={() => console.log(transaction)}>
              View
            </Button>
          </div>
        )
      },
    },
  ]
}
