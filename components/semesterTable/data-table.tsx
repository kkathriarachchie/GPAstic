"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onAddRow?: () => void;
  sgpa?: number;
  updateData?: (rowIndex: number, updates: Partial<TData>) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onAddRow,
  sgpa,
  updateData,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData,
    },
  });

  // Check if there are any empty rows
  const hasEmptyRow = data.some((row: any) => {
    return !row.moduleName || !row.moduleCode || !row.credit || !row.grade;
  });

  return (
    <div className="space-y-4">
      {/* SGPA Display */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Semester Grade Point Average (SGPA)
          </h2>
          <div className="text-3xl font-bold text-blue-600">
            {sgpa !== undefined && sgpa > 0 ? sgpa.toFixed(2) : "0.00"}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {sgpa !== undefined && sgpa > 0
              ? "Based on completed modules"
              : "Complete module details to calculate SGPA"}
          </p>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={onAddRow}
          disabled={hasEmptyRow}
          variant="outline"
          className="w-full max-w-full"
        >
          <CirclePlus />
          Add Module
        </Button>
      </div>
    </div>
  );
}
