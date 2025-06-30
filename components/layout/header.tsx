"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Import, Save } from "lucide-react";
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

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Reset all semesters function
  const resetAllSemesters = () => {
    localStorage.removeItem("gpa-calculator-data");
    // Reload the page to reset the state
    window.location.reload();
  };

  return (
    <nav className="bg-[#f0ebe8] border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo and Brand */}
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">GPA</span>
          </div>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            GPAstic
          </span>
        </Link>

        {/* Action Buttons and Mobile Menu Toggle */}
        <div className="flex md:order-2 items-center space-x-2 md:space-x-3">
          {/* Mobile Quick Action Buttons - Icon only */}
          <div className="flex md:hidden gap-1">
            {/* Import Button - Mobile Icon */}
            <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
              <Import className="h-4 w-4" />
            </Button>

            {/* Saved Button - Mobile Icon */}
            <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
              <Save className="h-4 w-4" />
            </Button>

            {/* Reset Button - Mobile Icon */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
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

          {/* Action Buttons - Desktop layout */}
          <div className="hidden md:flex gap-2">
            {/* Import Button */}

            <Button
              variant="ghost"
              size="sm"
              className="items-center gap-2 flex font-medium hover:shadow-lg "
            >
              <Import className="h-4 w-4" />
            </Button>

            {/* Saved Button */}
            <Button
              variant="ghost"
              size="sm"
              className="items-center gap-2 flex font-medium  hover:shadow-lg "
            >
              <Save className="h-4 w-4" />
            </Button>

            {/* Reset Button */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="items-center gap-2 flex font-medium  text-red-600 hover:text-red-700 hover:bg-red-50 hover:shadow-lg "
                >
                  <Trash2 className="h-4 w-4" />
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

          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:mt-0 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:border-0 md:bg-[#f0ebe8] dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 md:border-t-0">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 md:p-0 text-white bg-primary rounded-sm md:bg-transparent md:text-primary md:dark:primary"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/guide"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Guide
              </Link>
            </li>
            <li>
              <Link
                href="/help"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Help
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
