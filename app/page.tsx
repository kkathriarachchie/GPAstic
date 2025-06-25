import { MultiSemesterTable } from "@/components/semesterTable/multi-semester-table";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            GPA Calculator
          </h1>
          <p className="text-gray-600">
            Enter your module details for each semester to calculate your Grade
            Point Average
          </p>
        </div>
        <MultiSemesterTable />
      </div>
    </div>
  );
}
