import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";

async function getRandomBackground(){
    const data = await fetch(`https://www.loliapi.com/acg/pe`, {
      redirect: 'follow'
    })
    return data.url
}

export const useRandomBackground = () => {
  const {mutateAsync, ...rest} = useMutation({
    mutationKey: ["randomBackground"],
    mutationFn: ()=> {
      return getRandomBackground()
    }
  })
  const [background, setBackground] = useState(`https://www.loliapi.com/acg/pe`)

  const queryClient = useQueryClient()
  const switchOne = ()=> {
    mutateAsync()
      .then(result => {
        result && setBackground(result)
      }).catch(error => {})
  }

  useEffect(()=>{
    switchOne()
  }, [])

  return {
    // ...rest,
    background,
    switchOne
  }
}