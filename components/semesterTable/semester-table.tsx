"use client";

import { useState, useMemo } from "react";
import { DataTable } from "./data-table";
import { columns, Semester } from "./columns";

export function SemesterTable() {
  const [data, setData] = useState<Semester[]>([
    {
      moduleName: "",
      moduleCode: "",
      credit: 0,
      grade: "",
      creditPoint: 0,
    },
  ]);

  // Grade points mapping
  const gradePoints: { [key: string]: number } = {
    "A+": 4.0,
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    "D+": 1.3,
    D: 1.0,
    "E-": 0.0,
  };

  const updateData = (rowIndex: number, updates: Partial<Semester>) => {
    setData((prev) =>
      prev.map((row, index) => {
        if (index === rowIndex) {
          const updatedRow = { ...row, ...updates };

          // Auto-calculate credit point based on grade and credit
          if (updates.grade !== undefined || updates.credit !== undefined) {
            const gradePoint = gradePoints[updatedRow.grade] || 0;
            updatedRow.creditPoint = updatedRow.credit * gradePoint;
          }

          return updatedRow;
        }
        return row;
      })
    );
  };

  const addNewRow = () => {
    const newRow: Semester = {
      moduleName: "",
      moduleCode: "",
      credit: 0,
      grade: "",
      creditPoint: 0,
    };
    setData((prev) => [...prev, newRow]);
  };

  // Calculate SGPA
  const sgpa = useMemo(() => {
    // Filter out incomplete rows (rows that have all required fields filled)
    const completeRows = data.filter(
      (row) =>
        row.moduleName &&
        row.moduleCode &&
        row.credit > 0 &&
        row.grade &&
        gradePoints[row.grade] !== undefined
    );

    if (completeRows.length === 0) {
      return 0;
    }

    // Step 1: Calculate total weighted grade points (credit × grade points)
    const totalWeightedGradePoints = completeRows.reduce((sum, row) => {
      const gradePoint = gradePoints[row.grade] || 0;
      return sum + row.credit * gradePoint;
    }, 0);

    // Step 2: Calculate total credits
    const totalCredits = completeRows.reduce((sum, row) => {
      return sum + row.credit;
    }, 0);

    // Step 3: Calculate SGPA (total weighted grade points / total credits)
    return totalCredits > 0 ? totalWeightedGradePoints / totalCredits : 0;
  }, [data, gradePoints]);

  return (
    <DataTable
      columns={columns}
      data={data}
      onAddRow={addNewRow}
      sgpa={sgpa}
      updateData={updateData}
    />
  );
}
