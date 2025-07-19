// columns.js


import { Button } from '@/components/ui/button'

export const getColumns = (handleDelete, handleView) => {
  return [
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
            <Button size="sm" onClick={() => handleView(student)}>
              View
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(student)}>
              Delete
            </Button>
          </div>
        )
      },
    },
  ]
}
