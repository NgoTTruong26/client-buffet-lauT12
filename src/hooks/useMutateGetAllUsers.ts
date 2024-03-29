import { QueryClient, useMutation } from "@tanstack/react-query";
import { API } from "api/axios";

export const useMutateRegister = (queryClient: QueryClient) => {
  return useMutation(
    (newUser: any) => {
      console.log(newUser);
      return API.post(`http://localhost:3002/register-account`, newUser);
    },
    {
      onSuccess(data) {
        queryClient.setQueryData(["allUsers"], (oldQueryData: any) => {
          return {
            count: data.data.data.count,
            users: data.data.data.rows,
          };
        });
      },
    }
  );
};
