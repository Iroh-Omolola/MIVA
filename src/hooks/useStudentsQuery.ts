import { StudentResponse } from "@/type/student";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// This is the hook to fetch all students
const fetchStudents = async (
  searchTerm: string,
  page: number
): Promise<StudentResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: "10", 
    search: searchTerm || "", 
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/students?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const data: StudentResponse = await res.json();


  if (!searchTerm) return data;

  const lowerTerm = searchTerm.toLowerCase();

  const filteredStudents = data.students.filter(
    (student) =>
      student.name.toLowerCase().includes(lowerTerm) ||
      student.major.toLowerCase().includes(lowerTerm) ||
      String(student.gpa).includes(searchTerm)
  );

  
  return {
    ...data,
    students: filteredStudents,
    totalStudents: filteredStudents.length,
    totalPages: 1, 
  };
};

export const getStudentsQueryKey = (searchTerm: string, page: number) => [
  "students",
  searchTerm,
  page,
];

export function useStudentsQuery(searchTerm: string, page: number) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: getStudentsQueryKey(searchTerm, page),
    queryFn: () => fetchStudents(searchTerm, page),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({
      predicate: (query) =>
        Array.isArray(query.queryKey) && query.queryKey[0] === "students",
    });
  };

  return { ...query, invalidate };
}
