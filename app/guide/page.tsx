import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Plus,
  Star,
  BarChart3,
  Download,
  Upload,
  FileText,
  CheckCircle,
  ArrowRight,
  Calculator,
  Users,
  Target,
  Save,
  Import,
} from "lucide-react";
import Link from "next/link";

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
            How to Use GPAstic
          </h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
            Your comprehensive guide to calculating and managing your GPA with
            our powerful calculator
          </p>
          <div className="flex justify-center">
            <Link href="/">
              <Button size="lg" className="gap-2 sm:text-base">
                <Calculator className="h-5 w-5" />
                Start Calculating
              </Button>
            </Link>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center border-3">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg sm:text-xl">For Students</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-muted-foreground">
                Track your academic progress across all 8 semesters with ease
              </p>
            </CardContent>
          </Card>

          <Card className="text-center  border-3">
            <CardHeader>
              <Target className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg sm:text-xl">
                Goal Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-muted-foreground">
                Monitor your SGPA and CGPA to stay on track with your academic
                goals
              </p>
            </CardContent>
          </Card>

          <Card className="text-center  border-3">
            <CardHeader>
              <FileText className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg sm:text-xl">
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-muted-foreground">
                Import and export your data to keep your academic records safe
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Method 1: Starting from Scratch */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-[32px] font-bold text-primary mb-4">
              Method 1: Starting from Scratch
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Perfect for new users or when beginning a fresh calculation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            {/* Steps */}
            <div className=" grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Step 1 */}
              <Card className="border-3">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold sm:text-lg">
                      1
                    </div>
                    <CardTitle className="text-xl sm:text-[22px] ">
                      Enter Module Details
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Plus className="h-5 w-5 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-semibold sm:text-lg">Add Modules</h4>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        Enter your module names, codes, and credit hours for
                        each semester
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm sm:text-base font-medium mb-2">
                      Example:
                    </p>
                    <ul className="text-sm sm:text-base text-muted-foreground space-y-1">
                      <li>
                        • Module Name: &quot;Introduction to Programming&quot;
                      </li>
                      <li>• Module Code: &quot;CS101&quot;</li>
                      <li>• Credit: 3</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className=" border-3">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold sm:text-lg">
                      2
                    </div>
                    <CardTitle className="text-xl sm:text-[22px]">
                      Select Grades
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-yellow-500 mt-1" />
                    <div>
                      <h4 className="font-semibold sm:text-lg">
                        Choose Your Grades
                      </h4>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        Select grades from A+ to E- and watch your GPA calculate
                        automatically
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm sm:text-base font-medium mb-2">
                      Grade Scale:
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm">
                      <span>A+ = 4.0</span>
                      <span>A = 4.0</span>
                      <span>A- = 3.7</span>
                      <span>B+ = 3.3</span>
                      <span>B = 3.0</span>
                      <span>B- = 2.7</span>
                      <span>C+ = 2.3</span>
                      <span>C = 2.0</span>
                      <span>E- = 0.0</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className=" border-3">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold sm:text-lg">
                      3
                    </div>
                    <CardTitle className="text-xl sm:text-[22px]">
                      Track Your Progress
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold sm:text-lg">
                        Monitor Your GPA
                      </h4>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        View your SGPA for each semester and overall CGPA across
                        all semesters
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2 sm:text-base">
                      What you&apos;ll see:
                    </p>
                    <ul className="text-sm sm:text-base text-muted-foreground space-y-1">
                      <li>• Individual semester SGPA calculations</li>
                      <li>• Overall CGPA across all semesters</li>
                      <li>• Total credits completed</li>
                      <li>• Number of completed semesters</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Step 4 */}
              <Card className=" border-3">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold sm:text-lg">
                      4
                    </div>
                    <CardTitle className="text-xl sm:text-[22px]">
                      Export Your Data
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Save className="h-5 w-5 text-purple-500 mt-1" />
                    <div>
                      <h4 className="font-semibold sm:text-lg">
                        Save Your Progress
                      </h4>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        Export your data as &quot;gpa-calculator-data.csv&quot;
                        for backup or sharing
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm sm:text-base font-medium mb-2">
                      Export Benefits:
                    </p>
                    <ul className="text-sm sm:text-base text-muted-foreground space-y-1">
                      <li>• Backup your academic data</li>
                      <li>• Share with advisors or peers</li>
                      <li>• Transfer between devices</li>
                      <li>• Keep historical records</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Method 2: Import and Continue */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-[32px] font-bold text-primary mb-4">
              Method 2: Import and Continue
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Perfect for continuing with previously saved data or updating
              existing records
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            {/* Steps */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Step 1 */}
              <Card className=" border-3">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold sm:text-lg">
                      1
                    </div>
                    <CardTitle className="text-xl sm:text-[22px]">
                      Import Your Data
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Import className="h-5 w-5 text-cyan-500 mt-1" />
                    <div>
                      <h4 className="font-semibold sm:text-lg">
                        Load Previous Data
                      </h4>
                      <p className="text-sm  sm:text-base text-muted-foreground">
                        Import your previously exported
                        &quot;gpa-calculator-data.csv&quot; file
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm sm:text-base font-medium mb-2">
                      How to Import:
                    </p>
                    <ul className="text-sm sm:text-base text-muted-foreground space-y-1">
                      <li>
                        • Click the &quot;Import&quot; button in the header
                      </li>
                      <li>• Select your CSV file from your device</li>
                      <li>• Confirm to replace current data</li>
                      <li>• Your previous data will be loaded automatically</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className=" border-3">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold sm:text-lg">
                      2
                    </div>
                    <CardTitle className="text-xl sm:text-[22px]">
                      Add New Modules
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Plus className="h-5 w-5 text-orange-500 mt-1" />
                    <div>
                      <h4 className="font-semibold sm:text-lg">
                        Update Your Records
                      </h4>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        Add upcoming modules and update grades for current
                        semester
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm sm:text-base font-medium mb-2">
                      What you can do:
                    </p>
                    <ul className="text-sm sm:text-base text-muted-foreground space-y-1">
                      <li>• Add new modules to any semester</li>
                      <li>• Update existing module grades</li>
                      <li>• Remove modules you no longer need</li>
                      <li>• Edit module details as needed</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className=" border-3">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold sm:text-lg">
                      3
                    </div>
                    <CardTitle className="text-xl sm:text-[22px]">
                      Monitor Updated Progress
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold sm:text-lg">
                        Track Real-time Changes
                      </h4>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        Watch your GPA update automatically as you add or modify
                        data
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm sm:text-base font-medium mb-2">
                      Live Updates:
                    </p>
                    <ul className="text-sm sm:text-base text-muted-foreground space-y-1">
                      <li>• SGPA recalculates instantly</li>
                      <li>• CGPA updates with new data</li>
                      <li>• Credit totals adjust automatically</li>
                      <li>• Progress tracking stays current</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Step 4 */}
              <Card className=" border-3">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold sm:text-lg">
                      4
                    </div>
                    <CardTitle className="text-xl sm:text-[22px]">
                      Export Updated Data
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Save className="h-5 w-5 text-purple-500 mt-1" />
                    <div>
                      <h4 className="font-semibold sm:text-lg">
                        Save Your Updates
                      </h4>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        Export your updated data to keep your records current
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm sm:text-base font-medium mb-2">
                      Best Practices:
                    </p>
                    <ul className="text-sm sm:text-base text-muted-foreground space-y-1">
                      <li>• Export after each semester update</li>
                      <li>• Keep multiple backup versions</li>
                      <li>• Use descriptive filenames with dates</li>
                      <li>• Store files in cloud storage</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-[32px] font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <Card className="border-3">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">
                  What happens if I close the browser?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground sm:text-lg">
                  Your data is automatically saved in your browser&apos;s local
                  storage. It will be there when you return, but we recommend
                  exporting regularly as a backup.
                </p>
              </CardContent>
            </Card>

            <Card className="border-3">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">
                  Can I use this for multiple degree programs?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground sm:text-lg">
                  Yes! You can export your current data, clear the calculator,
                  and start fresh for a new program. Keep separate CSV files for
                  each degree program.
                </p>
              </CardContent>
            </Card>

            <Card className="border-3">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">
                  What if I make a mistake in my data?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground sm:text-lg">
                  You can easily edit any field by clicking on it. Changes are
                  saved automatically. Use the remove button (trash icon) to
                  delete entire rows if needed.
                </p>
              </CardContent>
            </Card>

            <Card className="border-3">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">
                  Is my data private and secure?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground sm:text-lg">
                  Absolutely! All your data is stored locally in your browser.
                  Nothing is sent to external servers. Only you have access to
                  your academic information.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Get Started Section */}
        <section className="text-center bg-muted rounded-lg p-8">
          <h2 className="text-3xl sm:text-[32px] font-bold text-primary mb-4">
            Ready to Start Calculating?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6">
            Put this guide into practice and take control of your academic
            progress today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="gap-2 sm:text-base">
                <Calculator className="h-5 w-5" />
                Start Fresh Calculation
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 sm:text-base border-2"
              >
                <BookOpen className="h-5 w-5" />
                Return to Calculator
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
