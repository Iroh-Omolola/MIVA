export interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: string;
}
export interface StudentResponse {
  page: number;
  limit: number;
  totalStudents: number;
  totalPages: number;
  students: Student[];
}
