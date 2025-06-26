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
import { RotateCcw, CirclePlus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onAddRow?: () => void;
  sgpa?: number;
  updateData?: (rowIndex: number, updates: Partial<TData>) => void;
  semesterNumber?: number;
  onResetSemester?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onAddRow,
  sgpa,
  updateData,
  semesterNumber,
  onResetSemester,
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

  // Check if semester has any data
  const hasData = data.some((row: any) => {
    return row.moduleName || row.moduleCode || row.credit > 0 || row.grade;
  });

  return (
    <div className="space-y-4">
      {/* SGPA Display with Reset Button */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
        <div className="text-center">
          <div className="flex flex-col gap-3 justify-between items-center mb-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-700 sm:pl-32">
                Semester {semesterNumber} - Grade Point Average (SGPA)
              </h2>
            </div>
            {hasData && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex w-full items-center gap-2 sm:w-auto"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset Sem
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Reset Semester {semesterNumber}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will permanently delete all data from Semester{" "}
                      {semesterNumber}. This cannot be undone. Are you sure you
                      want to continue?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={onResetSemester}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Reset Semester
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>

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
          className="w-full max-w-full flex items-center gap-2"
        >
          <CirclePlus className="h-4 w-4" />
          Add Module
        </Button>
      </div>
    </div>
  );
}
