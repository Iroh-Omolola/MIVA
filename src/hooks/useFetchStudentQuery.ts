import {
  useQuery,
  UseQueryOptions,
  QueryKey,
  useQueryClient,
} from "@tanstack/react-query";
import { Student } from "@/type/student";

const useFetchStudentQuery = async (id: string): Promise<Student> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students/${id}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const getStudentQueryKey = (id: string): QueryKey => ["student", id];

interface UseStudentQueryOptions
  extends Omit<
    UseQueryOptions<Student, Error, Student, QueryKey>,
    "queryKey" | "queryFn"
  > {}

export function useStudentQuery(id: string, options?: UseStudentQueryOptions) {
  const queryClient = useQueryClient();
  const query = useQuery<Student, Error>({
    queryKey: getStudentQueryKey(id),
    queryFn: () => useFetchStudentQuery(id),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: getStudentQueryKey(id) });
  };
  return { ...query, invalidate };
}
