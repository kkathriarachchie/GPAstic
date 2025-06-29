"use client";

import { useState, useEffect, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SemesterTable } from "./semester-table";
import { Semester } from "./columns";
import { CirclePlus, Import, Save, Trash2 } from "lucide-react";
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
import { Card } from "../ui/card";

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
  }, [allSemesterData, gradePoints, calculateSemesterSGPA, getSemesterData]);

  return (
    <div className="w-full space-y-6">
      {/* CGPA Display with Reset All Button */}
      <div className="w-full space-y-6">
        {/* Title Section */}
        <div className="text-center space-y-4">
          <h2 className="text-5xl sm:text-7xl font-bold text-foreground">
            GPA Calculator
          </h2>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-center max-w-2xl mx-auto">
            {/* Import Button - Blue/Primary variant */}
            <Button
              variant="default"
              className="font-bold py-3 sm:py-6 items-center gap-3 flex flex-row  flex-1 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Import className="h-5 w-5" />
              <span>Import</span>
            </Button>

            {/* Load Button - Green/Success variant */}
            <Button
              variant="secondary"
              className="font-bold py-3 sm:py-6 items-center gap-3 flex flex-row flex-1 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Save className="h-5 w-5" />
              <span>Saved</span>
            </Button>

            {/* Reset Button - Red/Destructive variant */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="font-bold py-3 sm:py-6 items-center gap-3 flex flex-row flex-1 bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Trash2 className="h-5 w-5" />
                  <span>Reset</span>
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
                  <AlertDialogCancel className="py-6">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={resetAllSemesters}
                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground py-6"
                  >
                    Reset All Data
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <p className="text-muted-foreground text-base sm:text-xl font-medium max-w-2xl mx-auto">
            Enter your module details for each semester or import your saved
            module to calculate your Grade Point Average
          </p>
        </div>

        {/* Stats Cards Section */}
        <div className="space-y-4">
          {/* Mobile Layout (< sm) - CGPA at top, then stats below */}
          <div className="sm:hidden flex flex-col space-y-4">
            {/* CGPA Card - Top on mobile */}
            <Card className="p-6  bg-foreground text-white shadow-lg border-none">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2 text-[#00ff9c]">
                  {cgpa.cgpa > 0 ? cgpa.cgpa.toFixed(2) : "0.00"}
                </div>
                <span className="text-lg font-semibold ">
                  {cgpa.cgpa > 0
                    ? `Based on ${cgpa.completedSemesters} completed semester${
                        cgpa.completedSemesters !== 1 ? "s" : ""
                      }`
                    : "Complete semester details to calculate CGPA"}
                </span>
              </div>
            </Card>

            {/* Stats Cards - Below CGPA on mobile */}
            <div className="grid grid-cols-1 gap-4">
              <Card className="p-6  bg-primary text-white shadow-lg border-none">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">
                    {cgpa.completedSemesters}/8
                  </div>
                  <span className="text-lg font-semibold">
                    Completed Semesters
                  </span>
                </div>
              </Card>
              <Card className="p-6  bg-primary text-white shadow-lg border-none">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">
                    {cgpa.totalCredits}
                  </div>
                  <span className="text-lg font-semibold">Total Credits</span>
                </div>
              </Card>
            </div>
          </div>

          {/* Desktop Layout (>= sm) - Stats on sides, CGPA in middle */}
          <div className="hidden sm:flex sm:items-stretch sm:justify-between sm:gap-6 w-full">
            {/* Left Stats Card */}
            <Card className="border-none flex-1 p-8 bg-primary text-primary-foreground min-w-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col items-center justify-center gap-4 h-full">
                <span className="text-5xl lg:text-6xl text-white font-bold">
                  {cgpa.completedSemesters}/8
                </span>
                <span className="font-semibold text-white text-center text-lg lg:text-xl">
                  Completed Semesters
                </span>
              </div>
            </Card>

            {/* Center CGPA Card */}
            <Card className="border-none flex-1 p-8 bg-foreground text-white min-w-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col items-center justify-center gap-3 h-full">
                <div className="text-6xl lg:text-7xl font-bold text-center text-[#00ff9c]">
                  {cgpa.cgpa > 0 ? cgpa.cgpa.toFixed(2) : "0.00"}
                </div>
                <span className="font-bold text-lg lg:text-xl text-center border-none">
                  {cgpa.cgpa > 0
                    ? `Based on ${cgpa.completedSemesters} completed semester${
                        cgpa.completedSemesters !== 1 ? "s" : ""
                      }`
                    : "Complete semester details to calculate CGPA"}
                </span>
              </div>
            </Card>

            {/* Right Stats Card */}
            <Card className="border-none flex-1 p-8 bg-primary text-primary-foreground min-w-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col items-center justify-center gap-4 h-full">
                <span className="text-5xl lg:text-6xl text-white font-bold">
                  {cgpa.totalCredits}
                </span>
                <span className="font-semibold text-white text-center text-lg lg:text-xl">
                  Total Credits
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full h-30  grid-cols-4 grid-rows-2 sm:rounded-full sm:grid-cols-8 sm:grid-rows-1 sm:h-full sm:p-1.5 p-1.5 gap-1 shadow-sm">
          {Array.from({ length: 8 }, (_, i) => i + 1).map((semesterNum) => {
            const semesterKey = `semester-${semesterNum}`;
            const semesterData = getSemesterData(semesterKey);
            const { sgpa } = calculateSemesterSGPA(semesterData);
            //const hasData = sgpa > 0;

            return (
              <TabsTrigger
                key={semesterKey}
                value={semesterKey}
                className={`text-xs sm:text-sm relative
    data-[state=active]:bg-primary
    data-[state=active]:text-primary-foreground
    data-[state=active]:shadow-sm
    transition-colors duration-200
    hover:bg-primary/15
    sm:rounded-full
    sm:h-full
    sm:px-4
    sm:py-2
    
    `}
              >
                <div className="flex flex-col items-center ">
                  <span className="!text-[15px] sm:!text-base font-bold ">
                    Sem {semesterNum}
                  </span>
                  <span className={`text-[14px] !font-semibold   sm:text-base`}>
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
            <TabsContent key={semesterKey} value={semesterKey} className="mt-2">
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
