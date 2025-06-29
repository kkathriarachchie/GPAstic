import { MultiSemesterTable } from "@/components/semesterTable/multi-semester-table";

export default function Home() {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <MultiSemesterTable />
        </div>
      </div>
    </div>
  );
}
