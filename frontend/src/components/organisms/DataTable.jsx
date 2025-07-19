// DataTable.jsx
import { SelectTrigger } from '@radix-ui/react-select'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select.jsx'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function DataTable({
  columns,
  data,
  totalCount,
  pagination,
  setPagination,
  filterBy='fullName',
}) {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])

  const pageCount = Math.ceil(totalCount / pagination.pageSize)
  const table = useReactTable({
    data: data || [],
    columns,
    pageCount: pageCount,
    manualPagination: true,
    state: { sorting, columnFilters, pagination },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })
  return (
    <div className="rounded-md border p-2">
      <Input
        placeholder="Filter Names..."
        value={table.getColumn(filterBy)?.getFilterValue() ?? ''}
        onChange={(event) =>
          table.getColumn(filterBy)?.setFilterValue(event.target.value)
        }
        className="max-w-sm mb-4"
      />
      <Table>
        <TableHeader className={'bg-gray-200 dark:bg-gray-500'} >
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} >
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className={'text-center'} >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody >
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className={'text-center'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={'px-4'}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center  space-x-2 py-4">
        <div className="flex gap-2 px-3 py-2">
          <Label className={'text-muted-foreground'}>Row</Label>
          <Select
            value={String(pagination.pageSize)}
            onValueChange={(val) => {
              setPagination((prev) => ({
                ...prev,
                pageSize: val,
                pageIndex: 0,
              }))
            }}>
            <SelectTrigger className="border px-5 ">
              <SelectValue placeholder={pagination.pageSize} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-muted-foreground md:flex-1 text-sm">
          Page {pagination.pageIndex + 1} of {pageCount}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
