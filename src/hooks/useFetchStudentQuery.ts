import {
  useQuery,
  UseQueryOptions,
  QueryKey,
  useQueryClient,
} from "@tanstack/react-query";
import { Student } from "@/type/student";

const UseFetchStudentQuery = async (id: string): Promise<Student> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students/${id}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const getStudentQueryKey = (id: string): QueryKey => ["student", id];

type UseStudentQueryOptions = Omit<
  UseQueryOptions<Student, Error, Student, QueryKey>,
  "queryKey" | "queryFn"
>;

// This is the hook to fetch a student details
export function useStudentQuery(id: string, options?: UseStudentQueryOptions) {
  const queryClient = useQueryClient();
  const query = useQuery<Student, Error>({
    queryKey: getStudentQueryKey(id),
    queryFn: () => UseFetchStudentQuery(id),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: !!id,
    ...options
  });
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: getStudentQueryKey(id) });
  };
  return { ...query, invalidate };
}
