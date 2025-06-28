"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Semester = {
  moduleName: string;
  moduleCode: string;
  credit: number;
  grade: string;
  creditPoint: number;
};

declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    updateData?: (rowIndex: number, updates: Partial<TData>) => void;
    removeData?: (rowIndex: number) => void;
  }
}

export const columns: ColumnDef<Semester>[] = [
  {
    accessorKey: "moduleName",
    header: "Module Name",
    cell: ({ row, getValue, table }) => {
      const value = getValue() as string;
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        table.options.meta?.updateData?.(row.index, {
          moduleName: e.target.value,
        });
      };
      return (
        <Input
          value={value || ""}
          onChange={handleChange}
          className="font-bold p-1 border-none !text-sm sm:!text-base placeholder:!text-sm sm:placeholder:!text-base shadow-none focus:!ring-2   sm:!rounded-[8px] !rounded-[8px]  "
          placeholder="Enter module name"
        />
      );
    },
  },
  {
    accessorKey: "moduleCode",
    header: "Module Code",
    cell: ({ row, getValue, table }) => {
      const value = getValue() as string;
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        table.options.meta?.updateData?.(row.index, {
          moduleCode: e.target.value,
        });
      };
      return (
        <Input
          value={value || ""}
          onChange={handleChange}
          className="font-bold p-1 border-none !text-sm sm:!text-base placeholder:!text-sm sm:placeholder:!text-base shadow-none focus:!ring-2   sm:!rounded-[8px] !rounded-[8px]  "
          placeholder="Enter module code"
        />
      );
    },
  },
  {
    accessorKey: "credit",
    header: "Credit",
    cell: ({ row, getValue, table }) => {
      const value = getValue() as number;
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        if (!isNaN(newValue) && newValue >= 0) {
          table.options.meta?.updateData?.(row.index, { credit: newValue });
        } else if (e.target.value === "") {
          // Allow empty string for clearing the field
          table.options.meta?.updateData?.(row.index, { credit: 0 });
        }
      };
      return (
        <Input
          type="number"
          value={value === 0 ? "" : value.toString()}
          onChange={handleChange}
          className="font-bold p-1 border-none !text-sm sm:!text-base placeholder:!text-sm sm:placeholder:!text-base shadow-none focus:!ring-2 sm:!rounded-[8px] !rounded-[8px]  "
          placeholder="0"
          min="0"
          step="0.5"
        />
      );
    },
  },
  {
    accessorKey: "grade",
    header: "Grade",
    cell: ({ row, getValue, table }) => {
      const value = getValue() as string;
      const handleChange = (value: string) => {
        table.options.meta?.updateData?.(row.index, { grade: value });
      };
      return (
        <Select value={value || ""} onValueChange={handleChange}>
          <SelectTrigger className="font-bold w-full !text-sm sm:!text-base border-2">
            <SelectValue placeholder="Select grade" />
          </SelectTrigger>
          <SelectContent className="font-bold">
            {[
              "A+",
              "A",
              "A-",
              "B+",
              "B",
              "B-",
              "C+",
              "C",
              "C-",
              "D+",
              "D",
              "E-",
            ].map((gradeOption) => (
              <SelectItem
                key={gradeOption}
                value={gradeOption}
                className="!text-sm sm:!text-base"
              >
                {gradeOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "creditPoint",
    header: "Credit Point",
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return (
        <Input
          type="number"
          value={value?.toFixed(2) || "0.00"}
          className="font-bold p-1 border-none !text-sm sm:!text-base placeholder:!text-sm sm:placeholder:!text-base shadow-none focus:!ring-2   sm:!rounded-[8px] !rounded-[8px]  "
          disabled
          readOnly
        />
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const handleRemove = () => {
        table.options.meta?.removeData?.(row.index);
      };
      return (
        <Button
          variant="destructive"
          size="sm"
          onClick={handleRemove}
          className="h-8 w-8 p-0"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      );
    },
  },
];
