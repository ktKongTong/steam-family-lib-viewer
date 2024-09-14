import {useQuery} from "@tanstack/react-query";

async function getRandomBackground(){
  // const data = await fetch(`https://www.loliapi.com/acg/bg`)
  // return data.pics[0] as string
}

export const useRandomBackground = () => {
  // const {data, ...rest} = useQuery({
  //   queryKey: ["randomBackground"],
  //   queryFn: ()=> {
  //     return getRandomBackground()
  //   }
  // })
  return {
    // ...rest,
    background: `https://www.loliapi.com/acg/pe/`
  }
}