"use client";

import { useState, useEffect, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SemesterTable } from "./semester-table";
import { Semester } from "./columns";
import { RotateCcw, Trash2 } from "lucide-react";
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

// Define the structure for all semester data
type AllSemesterData = {
  [key: string]: Semester[];
};

export function MultiSemesterTable() {
  const [allSemesterData, setAllSemesterData] = useState<AllSemesterData>({});
  const [activeTab, setActiveTab] = useState("semester-1");

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

  // Initialize data for all semesters
  useEffect(() => {
    const savedData = localStorage.getItem("gpa-calculator-data");
    if (savedData) {
      try {
        setAllSemesterData(JSON.parse(savedData));
      } catch (error) {
        console.error("Error loading saved data:", error);
        initializeEmptyData();
      }
    } else {
      initializeEmptyData();
    }
  }, []);

  const initializeEmptyData = () => {
    const initialData: AllSemesterData = {};
    for (let i = 1; i <= 8; i++) {
      initialData[`semester-${i}`] = [
        {
          moduleName: "",
          moduleCode: "",
          credit: 0,
          grade: "",
          creditPoint: 0,
        },
      ];
    }
    setAllSemesterData(initialData);
  };

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(allSemesterData).length > 0) {
      localStorage.setItem(
        "gpa-calculator-data",
        JSON.stringify(allSemesterData)
      );
    }
  }, [allSemesterData]);

  const handleSemesterDataChange = (semesterKey: string, data: Semester[]) => {
    setAllSemesterData((prev) => ({
      ...prev,
      [semesterKey]: data,
    }));
  };

  const getSemesterData = (semesterKey: string): Semester[] => {
    return (
      allSemesterData[semesterKey] || [
        {
          moduleName: "",
          moduleCode: "",
          credit: 0,
          grade: "",
          creditPoint: 0,
        },
      ]
    );
  };

  // Reset individual semester
  const resetSemester = (semesterKey: string) => {
    const emptyData: Semester[] = [
      {
        moduleName: "",
        moduleCode: "",
        credit: 0,
        grade: "",
        creditPoint: 0,
      },
    ];
    handleSemesterDataChange(semesterKey, emptyData);
  };

  // Reset all semesters
  const resetAllSemesters = () => {
    initializeEmptyData();
    localStorage.removeItem("gpa-calculator-data");
  };

  // Calculate SGPA for a specific semester
  const calculateSemesterSGPA = (semesterData: Semester[]) => {
    const completeRows = semesterData.filter(
      (row) =>
        row.moduleName &&
        row.moduleCode &&
        row.credit > 0 &&
        row.grade &&
        gradePoints[row.grade] !== undefined
    );

    if (completeRows.length === 0) {
      return { sgpa: 0, totalCredits: 0 };
    }

    const totalWeightedGradePoints = completeRows.reduce((sum, row) => {
      const gradePoint = gradePoints[row.grade] || 0;
      return sum + row.credit * gradePoint;
    }, 0);

    const totalCredits = completeRows.reduce((sum, row) => {
      return sum + row.credit;
    }, 0);

    const sgpa = totalCredits > 0 ? totalWeightedGradePoints / totalCredits : 0;
    return { sgpa, totalCredits };
  };

  // Calculate CGPA from all semesters
  const cgpa = useMemo(() => {
    let totalWeightedSGPA = 0;
    let totalCredits = 0;
    let completedSemesters = 0;

    // Step 1 & 2: Collect SGPA and Credits, then multiply SGPA by Credits
    for (let i = 1; i <= 8; i++) {
      const semesterKey = `semester-${i}`;
      const semesterData = getSemesterData(semesterKey);
      const { sgpa, totalCredits: semesterCredits } =
        calculateSemesterSGPA(semesterData);

      if (sgpa > 0 && semesterCredits > 0) {
        // Step 3: Add all (SGPA × Credits) results
        totalWeightedSGPA += sgpa * semesterCredits;
        // Step 4: Add all semester credit values
        totalCredits += semesterCredits;
        completedSemesters++;
      }
    }

    // Step 5: Divide Total SGPA×Credits by Total Credits
    const calculatedCGPA =
      totalCredits > 0 ? totalWeightedSGPA / totalCredits : 0;

    return {
      cgpa: calculatedCGPA,
      completedSemesters,
      totalCredits,
    };
  }, [allSemesterData, gradePoints]);

  return (
    <div className="w-full space-y-6">
      {/* CGPA Display with Reset All Button */}
      <div className="flex flex-col bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
        <div className="text-center">
          <div className="flex flex-col gap-3 justify-between items-start mb-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 sm:pl-32">
                Cumulative Grade Point Average (CGPA)
              </h1>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex w-full items-center gap-2 sm:w-auto"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset All Semesters</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will permanently delete all data from all 8
                    semesters. This cannot be undone. Are you sure you want to
                    continue?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={resetAllSemesters}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Reset All Data
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="text-4xl font-bold text-green-600 mb-2">
            {cgpa.cgpa > 0 ? cgpa.cgpa.toFixed(2) : "0.00"}
          </div>
          <div className="flex justify-center items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="font-medium">Completed Semesters:</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                {cgpa.completedSemesters}/8
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Total Credits:</span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-semibold">
                {cgpa.totalCredits}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {cgpa.cgpa > 0
              ? `Based on ${cgpa.completedSemesters} completed semester${
                  cgpa.completedSemesters !== 1 ? "s" : ""
                }`
              : "Complete semester details to calculate CGPA"}
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className=" grid w-full h-30 grid-cols-4 grid-rows-2 sm:grid-cols-8 sm:grid-rows-1 sm:h-full gap-1">
          {Array.from({ length: 8 }, (_, i) => i + 1).map((semesterNum) => {
            const semesterKey = `semester-${semesterNum}`;
            const semesterData = getSemesterData(semesterKey);
            const { sgpa } = calculateSemesterSGPA(semesterData);
            const hasData = sgpa > 0;

            return (
              <TabsTrigger
                key={semesterKey}
                value={semesterKey}
                className={`text-xs sm:text-sm relative ${
                  hasData ? "bg-green-50 data-[state=active]:bg-green-100" : ""
                }`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-[14px] sm:text-base ">
                    Sem {semesterNum}
                  </span>
                  <span
                    className={`text-[10px] font-semibold ${
                      hasData ? "text-green-600" : "text-gray-400"
                    } sm:text-[12px]`}
                  >
                    {sgpa > 0 ? sgpa.toFixed(2) : "0.00"}
                  </span>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {Array.from({ length: 8 }, (_, i) => i + 1).map((semesterNum) => {
          const semesterKey = `semester-${semesterNum}`;
          return (
            <TabsContent key={semesterKey} value={semesterKey} className="mt-6">
              <SemesterTable
                semesterNumber={semesterNum}
                data={getSemesterData(semesterKey)}
                onDataChange={(data) =>
                  handleSemesterDataChange(semesterKey, data)
                }
                onResetSemester={() => resetSemester(semesterKey)}
              />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
