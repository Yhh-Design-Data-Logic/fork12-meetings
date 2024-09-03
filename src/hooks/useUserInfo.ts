import { useQuery } from "@tanstack/react-query";
import authApi from "@/api/auth";

export const useUserInfo = () => {
  return useQuery({
    queryKey: ["profile-info"],
    queryFn: authApi.userProfile,
  });
};
