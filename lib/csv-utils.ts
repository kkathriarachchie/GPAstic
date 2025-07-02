// CSV utility functions for GPA calculator data

export interface SemesterData {
  moduleName: string;
  moduleCode: string;
  credit: number;
  grade: string;
  creditPoint: number;
}

export interface AllSemesterData {
  [key: string]: SemesterData[];
}

/**
 * Convert GPA calculator data to CSV format
 */
export function exportToCSV(data: AllSemesterData): string {
  const csvRows: string[] = [];
  
  // Add header row
  csvRows.push('Semester,Module Name,Module Code,Credit,Grade,Credit Point');
  
  // Add data rows
  Object.entries(data).forEach(([semesterKey, modules]) => {
    modules.forEach(module => {
      // Only include rows with actual data
      if (module.moduleName || module.moduleCode || module.credit > 0 || module.grade) {
        const row = [
          semesterKey,
          `"${module.moduleName}"`, // Wrap in quotes to handle commas
          `"${module.moduleCode}"`,
          module.credit.toString(),
          module.grade,
          module.creditPoint.toFixed(2)
        ].join(',');
        csvRows.push(row);
      }
    });
  });
  
  return csvRows.join('\n');
}

/**
 * Parse CSV content back to GPA calculator data format
 */
export function importFromCSV(csvContent: string): AllSemesterData {
  const lines = csvContent.trim().split('\n');
  const data: AllSemesterData = {};
  
  // Initialize empty data for all 8 semesters
  for (let i = 1; i <= 8; i++) {
    data[`semester-${i}`] = [];
  }
  
  // Skip header row and process data rows
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Parse CSV row (handle quoted fields)
    const values = parseCSVRow(line);
    if (values.length < 6) continue;
    
    const [semester, moduleName, moduleCode, creditStr, grade, creditPointStr] = values;
    
    const moduleData: SemesterData = {
      moduleName: removeQuotes(moduleName),
      moduleCode: removeQuotes(moduleCode),
      credit: parseFloat(creditStr) || 0,
      grade: grade,
      creditPoint: parseFloat(creditPointStr) || 0
    };
    
    // Add to appropriate semester
    if (data[semester]) {
      data[semester].push(moduleData);
    }
  }
  
  // Ensure each semester has at least one empty row
  Object.keys(data).forEach(semesterKey => {
    if (data[semesterKey].length === 0) {
      data[semesterKey].push({
        moduleName: '',
        moduleCode: '',
        credit: 0,
        grade: '',
        creditPoint: 0
      });
    }
  });
  
  return data;
}

/**
 * Parse a CSV row handling quoted fields
 */
function parseCSVRow(row: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

/**
 * Remove surrounding quotes from a string
 */
function removeQuotes(str: string): string {
  if (str.startsWith('"') && str.endsWith('"')) {
    return str.slice(1, -1);
  }
  return str;
}

/**
 * Download CSV file
 */
export function downloadCSV(csvContent: string, filename: string = 'gpa-calculator-data.csv'): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

/**
 * Read file content as text
 */
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      resolve(content);
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsText(file);
  });
}
