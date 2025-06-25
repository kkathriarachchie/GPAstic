"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SemesterTable } from "./semester-table";
import { Semester } from "./columns";

// Define the structure for all semester data
type AllSemesterData = {
  [key: string]: Semester[];
};

export function MultiSemesterTable() {
  const [allSemesterData, setAllSemesterData] = useState<AllSemesterData>({});
  const [activeTab, setActiveTab] = useState("semester-1");

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

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          {Array.from({ length: 8 }, (_, i) => i + 1).map((semesterNum) => (
            <TabsTrigger
              key={`semester-${semesterNum}`}
              value={`semester-${semesterNum}`}
              className="text-xs sm:text-sm"
            >
              Sem {semesterNum}
            </TabsTrigger>
          ))}
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
              />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
