// columns.js

import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button'

export const getStaffColumns = (handleDeleteClick,handleView) => {
  return [
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
      accessorKey: 'role',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Role{' '}
          {column.getIsSorted() === 'asc'
            ? '🔼'
            : column.getIsSorted() === 'desc'
              ? '🔽'
              : ''}
        </Button>
      ),
      cell:({row})=>{
        const {role} = row.original;
        if(role==='ADMIN'){
          return <Badge className={'bg-amber-300 text-black'}>{role}</Badge>
        }
        return role;
      }
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const staff = row.original
        return (
          <div className="flex gap-2">
            <Button size="sm" onClick={()=>handleView(staff)}>
              View
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeleteClick(staff)}>
              Delete
            </Button>
          </div>
        )
      },
    },
  ]
}
