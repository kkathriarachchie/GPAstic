import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  Award,
  TrendingUp,
  BookOpen,
  Star,
  Trophy,
  Target,
  User,
  Mail,
  Github,
  Linkedin,

} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 rounded-full p-6">
              <Calculator className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
            About GPAstic
          </h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
            A comprehensive Grade Point Average calculator designed to simplify
            academic progress tracking with precision and ease
          </p>
          <div className="flex justify-center">
            <Link href="/">
              <Button size="lg" className="gap-2 sm:text-base">
                <Calculator className="h-5 w-5" />
                Try GPAstic Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Mission Statement */}
        <section className="mb-16">
          <Card className="bg-primary/5 border-none shadow-none">
            <CardContent className="p-8 text-center">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl sm:text-[26px] font-bold text-primary mb-4">
                  Our Mission
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  GPAstic focuses on easily calculating the Grade Point Average
                  without conflict. We provide students with a reliable,
                  user-friendly tool to track their academic progress across all
                  semesters, ensuring accuracy and transparency in GPA
                  calculations.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Grading System Overview */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-[32px] font-bold text-primary mb-4">
              Understanding the Grading System
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Comprehensive guide to Grade Point Average calculations and
              academic standards
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* SGPA Card */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl sm:text-[22px]">
                      Semester Grade Point Average (SGPA)
                    </CardTitle>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Performance measurement for individual semesters
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm sm:text-base text-muted-foreground">
                  The calculation of the Semester Grade Point Average (SGPA) is
                  based on the summation of Grade Points earned for all GPA
                  modules registered in a semester, weighted according to the
                  number of credits.
                </p>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 sm:text-lg">
                    SGPA Formula:
                  </h4>
                  <div className="bg-background p-3 rounded border-2 text-center font-mono text-sm sm:text-base">
                    SGPA = ( ∑<sub>i=1</sub>
                    <sup>n</sup> C<sub>i</sub> × GP<sub>i</sub> ) / ( ∑
                    <sub>i=1</sub>
                    <sup>n</sup> C<sub>i</sub> )
                  </div>
                  <div className="mt-3 text-sm sm:text-base text-muted-foreground space-y-1">
                    <p>
                      • C<sub>i</sub> = Number of credits for the ith module
                    </p>
                    <p>
                      • GP<sub>i</sub> = Grade points earned for that module
                    </p>
                    <p>• n = Number of GPA modules in the semester</p>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold  mb-2 sm:text-lg">
                    Example Calculation:
                  </h4>
                  <div className="text-sm sm:text-base space-y-1">
                    <p>Module A: 3 credits × 4.0 points = 12.0</p>
                    <p>Module B: 4 credits × 3.7 points = 14.8</p>
                    <p>Module C: 2 credits × 3.3 points = 6.6</p>
                    <p className="border-t-2 pt-2 font-semibold">
                      SGPA = (12.0 + 14.8 + 6.6) ÷ (3 + 4 + 2) = 3.71
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CGPA Card */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl s,:text-[22px]">
                      Cumulative Grade Point Average (CGPA)
                    </CardTitle>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Overall academic performance across all semesters
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm sm:text-base text-muted-foreground">
                  The Cumulative Grade Point Average (CGPA) describes a
                  student&apos;s current standing in terms of grade points
                  earned for all GPA modules registered up to a given point of
                  time, weighted according to number of credits.
                </p>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 sm:text-lg">
                    CGPA Formula:
                  </h4>
                  <div className="bg-background p-3 rounded border-2 text-center font-mono text-sm sm:text-base">
                    CGPA = ( ∑<sub>i=1</sub>
                    <sup>n</sup> C<sub>i</sub> × GP
                    <sub>i</sub> ) / ( ∑<sub>i=1</sub>
                    <sup>n</sup> C<sub>i</sub> )
                  </div>
                  <div className="mt-3 text-sm sm:text-base text-muted-foreground space-y-1">
                    <p>
                      • C<sub>i</sub> = Number of credits for the ith module
                    </p>
                    <p>
                      • GP<sub>i</sub> = Grade points earned for that module
                    </p>
                    <p>• n = Total number of registered GPA modules</p>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold sm:text-lg mb-2">
                    CGPA Calculation:
                  </h4>
                  <div className="text-sm sm:text-base space-y-1">
                    <p>Total weighted points from all semesters</p>
                    <p>Divided by total credits completed</p>
                    <p>Gives overall academic performance</p>
                    <p className="font-semibold ">
                      Reflects cumulative achievement
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Grade Scale Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-[32px] font-bold text-primary mb-4">
              Grade Scale & Point Values
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Official grading standards and their corresponding grade point
              values
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Grade Scale Table */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 sm:text-lg">
                  <Star className="h-5 w-5 text-primary" />
                  Grade Point Values
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      grade: "A+",
                      points: "4.0",
                      desc: "Excellent",
                      color: "text-green-600",
                    },
                    {
                      grade: "A",
                      points: "4.0",
                      desc: "Excellent",
                      color: "text-green-600",
                    },
                    {
                      grade: "A-",
                      points: "3.7",
                      desc: "Excellent",
                      color: "text-green-600",
                    },
                    {
                      grade: "B+",
                      points: "3.3",
                      desc: "Good",
                      color: "text-blue-600",
                    },
                    {
                      grade: "B",
                      points: "3.0",
                      desc: "Good",
                      color: "text-blue-600",
                    },
                    {
                      grade: "B-",
                      points: "2.7",
                      desc: "Good",
                      color: "text-blue-600",
                    },
                    {
                      grade: "C+",
                      points: "2.3",
                      desc: "Pass",
                      color: "text-yellow-600",
                    },
                    {
                      grade: "C",
                      points: "2.0",
                      desc: "Pass",
                      color: "text-yellow-600",
                    },
                    {
                      grade: "C-",
                      points: "1.7",
                      desc: "Weak Pass",
                      color: "text-orange-600",
                    },
                    {
                      grade: "D+",
                      points: "1.3",
                      desc: "Conditional Pass",
                      color: "text-red-500",
                    },
                    {
                      grade: "D",
                      points: "1.0",
                      desc: "Conditional Pass",
                      color: "text-red-500",
                    },
                    {
                      grade: "E-",
                      points: "0.0",
                      desc: "Fail",
                      color: "text-red-600",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-lg w-8">
                          {item.grade}
                        </span>
                        <span className="font-mono font-semibold">
                          {item.points}
                        </span>
                      </div>
                      <span
                        className={`text-sm sm:text-base font-semibold text-primary`}
                      >
                        {item.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Degree Classifications */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 sm:text-lg">
                  <Trophy className="h-5 w-5 text-primary " />
                  Degree Classifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm sm:text-base text-muted-foreground">
                  Classes are awarded to students depending on their performance
                  in the entire academic period. To award the degree with a
                  class, a student must satisfy the following criteria:
                </p>

                <div className="space-y-4">
                  {[
                    {
                      class: "First Class",
                      gpa: "3.70",
                      color:
                        "border-l-green-500 bg-green-50 dark:bg-green-950/20",
                      icon: "🏆",
                    },
                    {
                      class: "Second Upper",
                      gpa: "3.30",
                      color: "border-l-blue-500 bg-blue-50 dark:bg-blue-950/20",
                      icon: "🥈",
                    },
                    {
                      class: "Second Lower",
                      gpa: "3.00",
                      color:
                        "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20",
                      icon: "🥉",
                    },
                    {
                      class: "Pass",
                      gpa: "2.00",
                      color: "border-l-gray-500 bg-gray-50 dark:bg-gray-950/20",
                      icon: "📜",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`border-none p-4 rounded-lg bg-primary/5`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl sm:text-[26px]">
                            {item.icon}
                          </span>
                          <div>
                            <h4 className="font-semibold sm:text-lg">
                              {item.class}
                            </h4>
                            <p className="text-sm sm:text-base text-muted-foreground">
                              Minimum GPA required
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl sm:text-[26px] font-bold">
                            {item.gpa}
                          </div>
                          <div className="text-sm sm:text-base text-muted-foreground">
                            and above
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 sm:text-lg">
                    Classification Notes:
                  </h4>
                  <ul className="text-sm sm:text-base text-muted-foreground space-y-1">
                    <li>• Based on overall CGPA at graduation</li>
                    <li>• Must complete all degree requirements</li>
                    <li>• Subject to academic regulations</li>
                    <li>• Calculated from all registered modules</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-[32px] font-bold text-primary mb-4">
              Why Choose GPAstic?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Designed with students in mind, built for accuracy and simplicity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center border-2">
              <CardHeader>
                <Calculator className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg sm:text-xl">
                  Accurate Calculations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Precise SGPA and CGPA calculations following official academic
                  standards and formulas
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2">
              <CardHeader>
                <Target className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg sm:text-xl">
                  User-Friendly Design
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-lg text-muted-foreground">
                  Intuitive interface designed for easy data entry and clear
                  visualization of results
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg sm:text-xl">
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-lg text-muted-foreground">
                  Import and export functionality to backup your data and
                  maintain academic records
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Developer Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-[32px] font-bold text-primary mb-4">
              Meet the Developer
            </h2>
          </div>

          <Card className="max-w-4xl mx-auto border-2">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="bg-primary/5 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-4">
                    <User className="h-16 w-16 text-primary" />
                  </div>
                  <h3 className="text-2xl sm:text-[26px] font-bold text-primary">
                    Kavishka Kathriarachchie
                  </h3>
                  <p className="text-muted-foreground sm:text-lg">
                    Full Stack Developer
                  </p>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <p className="text-muted-foreground leading-relaxed sm:text-lg">
                    GPAstic was built with passion and precision by Kavishka
                    Kathriarachchie, a dedicated developer focused on creating
                    educational tools that make a difference. With expertise in
                    modern web technologies and a deep understanding of academic
                    systems, Kavishka designed GPAstic to be the most reliable
                    GPA calculator available.
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary sm:text-lg">
                      Skills & Technologies:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "React",
                        "Next.js",
                        "TypeScript",
                        "Tailwind CSS",
                        "Node.js",
                        "UI/UX Design",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="bg-primary/5 text-primary px-3 py-1 rounded-full text-sm sm:text-base "
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t-2 pt-4">
                    <h4 className="font-semibold text-primary mb-3 sm:text-lg">
                      Available for Projects
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4 sm:text-base">
                      Looking for a reliable developer for your next project?
                      Kavishka is available for freelance work and
                      consultations. Get in touch to discuss your requirements.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2  sm:text-base border-2"
                      >
                        <Mail className="h-4 w-4" />
                        Email
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 sm:text-base border-2"
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 sm:text-base border-2"
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-muted rounded-lg p-8">
          <h2 className="text-3xl sm:text-[32px] font-bold text-primary mb-4">
            Ready to Calculate Your GPA?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6">
            Experience the precision and simplicity of GPAstic today. Track your
            academic progress with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="gap-2 sm:text-base ">
                <Calculator className="h-5 w-5" />
                Start Calculating Now
              </Button>
            </Link>
            <Link href="/guide">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 sm:text-base border-2"
              >
                <BookOpen className="h-5 w-5" />
                View User Guide
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
