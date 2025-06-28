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
import { CirclePlus, Trash2, TrashIcon } from "lucide-react";
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
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onAddRow?: () => void;
  sgpa?: number;
  updateData?: (rowIndex: number, updates: Partial<TData>) => void;
  removeData?: (rowIndex: number) => void;
  semesterNumber?: number;
  onResetSemester?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onAddRow,
  sgpa,
  updateData,
  removeData,
  semesterNumber,
  onResetSemester,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData,
      removeData,
    },
  });

  // Check if there are any empty rows
  const hasEmptyRow = data.some((row) => {
    const semesterRow = row as {
      moduleName?: string;
      moduleCode?: string;
      credit?: number;
      grade?: string;
    };
    return (
      !semesterRow.moduleName ||
      !semesterRow.moduleCode ||
      !semesterRow.credit ||
      !semesterRow.grade
    );
  });

  return (
    <div className="space-y-4">
      {/* SGPA Display with Reset Button */}
      <Card>
        <CardHeader className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between">
          <CardTitle className="text-5xl text-center sm:pl-12 sm:text-6xl">
            SGPA-{semesterNumber}
          </CardTitle>

          <CardAction>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className="items-center gap-2 flex h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4" />
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
                  <AlertDialogCancel className="py-6">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={onResetSemester}
                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground py-6"
                  >
                    Reset Semester
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardAction>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-4 sm:text-5xl">
            {sgpa !== undefined && sgpa > 0 ? sgpa.toFixed(2) : "0.00"}
          </div>
          <CardDescription className="mb-4 sm:text-base">
            {sgpa !== undefined && sgpa > 0
              ? "Based on completed modules"
              : "Complete module details to calculate SGPA"}
          </CardDescription>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardContent className="px-6">
          <div className="rounded-md border-0">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="hover:bg-transparent"
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className="font-semibold  sm:text-base sm:font-semibold !py-3 !px-3 sm:!py-4 sm:!px-4 "
                        >
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
                        <TableCell
                          key={cell.id}
                          className="!py-3 !px-3 sm:!py-4  sm:!px-4"
                        >
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
        </CardContent>
      </Card>
      <div className="flex justify-center ">
        <Button
          onClick={onAddRow}
          disabled={hasEmptyRow}
          className="w-full max-w-full flex items-center gap-2 py-6 sm:py-8 !text-sm sm:!text-base"
        >
          <CirclePlus className="h-4 w-4" />
          Add Module
        </Button>
      </div>
    </div>
  );
}
