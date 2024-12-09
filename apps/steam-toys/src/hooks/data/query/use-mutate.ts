import type {UseMutationOptions} from "@tanstack/react-query";
import {DefaultError, useMutation} from "@tanstack/react-query";

export const useMutate = <
  TData = unknown,
  TVariables = void,
  TError = DefaultError,
  TContext = unknown
>(mutationFn: (arg: TVariables)=>Promise<TData>, mutateOptions?: UseMutationOptions<TData, TError, TVariables, TContext>) => {
  return useMutation<
    TData,
    TError,
    TVariables,
    TContext
  >({
    mutationFn,
    ...mutateOptions
  })
}
