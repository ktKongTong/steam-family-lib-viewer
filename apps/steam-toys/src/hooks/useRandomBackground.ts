import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";

async function getRandomBackground(){
    const data = await fetch(`https://www.loliapi.com/acg/pe`, {
      redirect: 'follow'
    })
    return data.url
}

export const useRandomBackground = () => {
  const queryClient = useQueryClient()
  const {data, isLoading, error, status} = useQuery({
    queryKey: ["randomBackground"],
    queryFn: ()=> { return getRandomBackground() },
    initialData: `https://www.loliapi.com/acg/pe`,
  })
  const switchOne = ()=> {
    queryClient.invalidateQueries({queryKey: ["randomBackground"]})
  }

  return {
    background: data,
    switchOne
  }
}