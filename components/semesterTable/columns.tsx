"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
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
          className="border p-1 rounded border-none shadow-none !text-sm sm:!text-base placeholder:!text-sm sm:placeholder:!text-base"
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
          className="border p-1 rounded border-none shadow-none !text-sm sm:!text-base placeholder:!text-sm sm:placeholder:!text-base"
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
          className="border p-1 rounded border-none shadow-none !text-sm sm:!text-base placeholder:!text-sm sm:placeholder:!text-base"
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
          <SelectTrigger className="w-full !text-sm sm:!text-base">
            <SelectValue placeholder="Select grade" />
          </SelectTrigger>
          <SelectContent>
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
    cell: ({ row, getValue }) => {
      const value = getValue() as number;
      return (
        <Input
          type="number"
          value={value?.toFixed(2) || "0.00"}
          className="border p-1 rounded border-none shadow-none !text-sm sm:!text-base placeholder:!text-sm sm:placeholder:!text-base"
          disabled
          readOnly
        />
      );
    },
  },
];
