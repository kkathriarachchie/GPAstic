"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2, Import, Save } from "lucide-react";
import {
  exportToCSV,
  importFromCSV,
  downloadCSV,
  readFileAsText,
  AllSemesterData,
} from "@/lib/csv-utils";
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
import { Input } from "../ui/input";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [exportFilename, setExportFilename] = useState("");
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [pendingImportData, setPendingImportData] =
    useState<AllSemesterData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  // Close mobile menu on route change (auto-hide)
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Reset all semesters function
  const resetAllSemesters = () => {
    localStorage.removeItem("gpa-calculator-data");
    // Reload the page to reset the state
    window.location.reload();
  };

  // Show export dialog
  const handleExportData = () => {
    const data = localStorage.getItem("gpa-calculator-data");
    if (!data) {
      alert("No data found to export. Please add some semester data first.");
      return;
    }

    // Generate default filename with current date
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD format
    const defaultFilename = `gpa-calculator-data-${dateStr}`;
    setExportFilename(defaultFilename);
  };

  // Perform actual export with custom filename
  const performExport = () => {
    try {
      const data = localStorage.getItem("gpa-calculator-data");
      if (!data) return;

      const parsedData: AllSemesterData = JSON.parse(data);
      const csvContent = exportToCSV(parsedData);

      // Ensure filename ends with .csv
      const filename = exportFilename.endsWith(".csv")
        ? exportFilename
        : `${exportFilename}.csv`;

      downloadCSV(csvContent, filename);
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("Error exporting data. Please try again.");
    }
  };

  // Import data from CSV
  const handleImportData = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.name.endsWith(".csv")) {
      alert("Please select a CSV file.");
      event.target.value = "";
      return;
    }

    try {
      const content = await readFileAsText(file);
      const importedData = importFromCSV(content);

      // Check if existing data exists
      const existingData = localStorage.getItem("gpa-calculator-data");
      if (existingData) {
        // Store the imported data and show confirmation dialog
        setPendingImportData(importedData);
        setShowImportDialog(true);
      } else {
        // No existing data, proceed directly
        performImport(importedData);
      }
    } catch (error) {
      console.error("Error importing data:", error);
      alert(
        "Error importing file. Please make sure it's a valid CSV file exported from this application."
      );
    }

    // Reset file input
    event.target.value = "";
  };

  // Perform the actual import
  const performImport = (importData: AllSemesterData) => {
    localStorage.setItem("gpa-calculator-data", JSON.stringify(importData));
    window.location.reload();
  };

  // Handle import confirmation
  const handleImportConfirm = () => {
    if (pendingImportData) {
      performImport(pendingImportData);
    }
    setShowImportDialog(false);
    setPendingImportData(null);
  };

  // Handle import cancellation
  const handleImportCancel = () => {
    setShowImportDialog(false);
    setPendingImportData(null);
  };

  // Hide mobile menu after clicking a nav link
  const handleNavClick = () => {
    if (window.innerWidth < 768) setIsMenuOpen(false);
  };

  return (
    <nav className="bg-[#f0ebe8] border-gray-200 ">
      {/* Hidden file input for CSV import */}
      <Input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".csv"
        style={{ display: "none" }}
      />

      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo and Brand */}
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="/GPAstic.ico"
            alt="GPAstic Logo"
            width={120}
            height={100}
          />
        </Link>

        {/* Action Buttons and Mobile Menu Toggle */}
        <div className="flex md:order-2 items-center space-x-2 md:space-x-3">
          {/* Mobile Quick Action Buttons - Icon only */}
          <div className="flex md:hidden gap-1">
            {/* Import Button - Mobile Icon */}
            <Button
              variant="ghost"
              size="sm"
              className="p-2 h-8 w-8 hover:shadow-lg"
              onClick={handleImportData}
              title="Import CSV"
            >
              <Import className="h-4 w-4 text-foreground " />
            </Button>

            {/* Export Button - Mobile Icon */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 h-8 w-8 hover:shadow-lg"
                  onClick={handleExportData}
                  title="Export CSV"
                >
                  <Save className="h-4 w-4 text-foreground" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="border-none">
                <AlertDialogHeader>
                  <AlertDialogTitle className="sm:text-xl">
                    Export GPA Data
                  </AlertDialogTitle>
                  <AlertDialogDescription className="sm:text-base">
                    Enter a filename for your CSV export:
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="py-4">
                  <Input
                    value={exportFilename}
                    onChange={(e) => setExportFilename(e.target.value)}
                    placeholder="Enter filename (without .csv)"
                    className="w-full"
                  />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel className="py-6 sm:text-base border-2">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={performExport}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground py-6 sm:text-base"
                  >
                    Export CSV
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Reset Button - Mobile Icon */}
            <AlertDialog>
              <AlertDialogTrigger>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 h-8 w-8 text-[#e54b4f] hover:text-[#e54b4f] hover:shadow-lg"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="border-none">
                <AlertDialogHeader>
                  <AlertDialogTitle className="sm:text-xl">
                    Reset All Semesters
                  </AlertDialogTitle>
                  <AlertDialogDescription className="sm:text-base">
                    This action will permanently delete all data from all 8
                    semesters. This cannot be undone. Are you sure you want to
                    continue?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="py-6 sm:text-base border-2">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={resetAllSemesters}
                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground py-6 sm:text-base"
                  >
                    Reset All Data
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* Action Buttons - Desktop layout */}
          <div className="hidden md:flex gap-2 ">
            {/* Import Button */}
            <Button
              variant="ghost"
              size="sm"
              className="items-center gap-2 flex font-medium hover:shadow-lg "
              onClick={handleImportData}
              title="Import CSV"
            >
              <Import className="h-4 w-4" />
              <span className="text-foreground font-semibold text-base">
                Import
              </span>
            </Button>

            {/* Export Button - Desktop */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="items-center gap-2 flex font-medium hover:shadow-lg "
                  onClick={handleExportData}
                  title="Export CSV"
                >
                  <Save className="h-4 w-4" />
                  <span className="text-foreground font-semibold text-base">
                    Export
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="border-none">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-xl">
                    Export GPA Data
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-base">
                    Enter a filename for your CSV export:
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="py-4">
                  <Input
                    value={exportFilename}
                    onChange={(e) => setExportFilename(e.target.value)}
                    placeholder="Enter filename (without .csv)"
                    className="w-full"
                  />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel className="py-6 text-base border-2">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={performExport}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base"
                  >
                    Export CSV
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Reset Button */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className=" p-0 h-8 w-8 items-center flex font-medium hover:shadow-lg text-[#e54b4f] hover:text-[#e54b4f]"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="border-none">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-xl">
                    Reset All Semesters
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-base">
                    This action will permanently delete all data from all 8
                    semesters. This cannot be undone. Are you sure you want to
                    continue?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="py-6 text-base border-2">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={resetAllSemesters}
                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground py-6 text-base"
                  >
                    Reset All Data
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-primary rounded-lg md:hidden hover:bg-[#fffcfa] focus:outline-none focus:ring-2 focus:ring-primary/8  "
            aria-controls="navbar-cta"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Menu */}
        <div
          className={`items-center justify-between ${
            isMenuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-cta"
        >
          <ul className="lg:ml-25 flex flex-col font-medium p-4 md:p-0 mt-4 md:mt-0 border-none rounded-lg bg-[#fffcfa] md:space-x-8 rtl:space-x-reverse md:flex-row md:border-0 md:bg-[#f0ebe8] md:border-t-0">
            <li>
              <Link
                href="/"
                className={`font-semibold block py-2 px-3 md:p-0 rounded-sm ${
                  pathname === "/"
                    ? "text-white bg-primary md:bg-transparent md:text-primary"
                    : "text-foreground hover:bg-[#f0ebe8] md:hover:bg-transparent md:hover:text-primary"
                }`}
                aria-current={pathname === "/" ? "page" : undefined}
                onClick={handleNavClick}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/guide"
                className={`font-semibold block py-2 px-3 md:p-0 rounded-sm ${
                  pathname === "/guide"
                    ? "text-white bg-primary md:bg-transparent md:text-primary"
                    : "text-foreground hover:bg-[#f0ebe8] md:hover:bg-transparent md:hover:text-primary"
                }`}
                aria-current={pathname === "/guide" ? "page" : undefined}
                onClick={handleNavClick}
              >
                Guide
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`font-semibold block py-2 px-3 md:p-0 rounded-sm ${
                  pathname === "/about"
                    ? "text-white bg-primary md:bg-transparent md:text-primary"
                    : "text-foreground hover:bg-[#f0ebe8] md:hover:bg-transparent md:hover:text-primary"
                }`}
                aria-current={pathname === "/about" ? "page" : undefined}
                onClick={handleNavClick}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Import Confirmation Dialog */}
      <AlertDialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <AlertDialogContent className="border-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">
              Replace Existing Data
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              This will replace your current GPA data. Are you sure you want to
              continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleImportCancel}
              className="py-6 text-base border-2"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleImportConfirm}
              className="bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base"
            >
              Replace Data
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </nav>
  );
}
