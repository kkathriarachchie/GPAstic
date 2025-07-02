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
import { CirclePlus, Trash2 } from "lucide-react";
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
      <Card className="bg-foreground border-none gap-2">
        <CardHeader className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between">
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
              <AlertDialogContent className="border-none">
                <AlertDialogHeader>
                  <AlertDialogTitle className="sm:text-xl">
                    Reset Semester {semesterNumber}
                  </AlertDialogTitle>
                  <AlertDialogDescription className="sm:text-base">
                    This action will permanently delete all data from Semester{" "}
                    {semesterNumber}. This cannot be undone. Are you sure you
                    want to continue?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="py-6 sm:text-base border-none">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={onResetSemester}
                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground py-6 sm:text-base"
                  >
                    Reset Semester
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardAction>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-5xl text-center font-bold sm:text-6xl text-primary-foreground">
            Sem-{semesterNumber}
          </div>
          <div className="text-5xl font-bold text-[#00FF9C] mb-4 sm:text-6xl">
            {sgpa !== undefined && sgpa > 0 ? sgpa.toFixed(2) : "0.00"}
          </div>
          <CardDescription className="mb-4 text-background font-bold text-lg lg:text-xl text-center border-none">
            {sgpa !== undefined && sgpa > 0
              ? "Based on completed modules"
              : "Complete module details to calculate SGPA"}
          </CardDescription>
        </CardContent>
      </Card>

      <Card className="w-full bg-muted border-none">
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
                          className="!font-bold  sm:text-lg sm:!font-bold !py-3 !px-3 sm:!py-4 sm:!px-4 "
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
                          className="!py-3 !px-3 sm:!py-4  sm:!px-4 "
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
          className="font-bold w-full max-w-full flex items-center gap-2 py-6 sm:py-8 !text-sm sm:!text-base"
        >
          <CirclePlus className="!h-4 !w-4 sm:!h-5 sm:!w-5" />
          <span>Add Module</span>
        </Button>
      </div>
    </div>
  );
}
