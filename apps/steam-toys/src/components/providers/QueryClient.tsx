'use client'


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {ReactNode} from "react";
import { toast } from "@/components/ui/use-toast";
import {BizError} from "@/lib/omfetch";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => {
        if (error instanceof BizError) {
          toast({
            variant: 'destructive',
            title: `${error.message.errorType ?? "RequestError"} `,
            description: error.message.errorMessage
          })
        }else {
          toast({
            variant: 'destructive',
            title: 'Unknown Request Error',
            description: error.message
          })
        }
        return
      }
    }
  },
})

export default function QueryProvider({children}:{children: ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}