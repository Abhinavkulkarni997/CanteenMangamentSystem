import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../services/user";

export const useUserSearch = (search: string) => {
  return useQuery({
    queryKey: ["user-search", search],

    queryFn: () => searchUsers(search),

    enabled: search.trim().length >= 2,

    staleTime: 30000,
  });
};