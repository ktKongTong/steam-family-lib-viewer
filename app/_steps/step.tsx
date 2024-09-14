import {cn} from "@/lib/utils";
import React from "react";
import {RotateCw} from "lucide-react";
import {SharedLibraryStep, Step, StepStatus} from "@/hooks/data/step";


export function StepItem(
  {
    step
  }: {
    step: Step
  }
) {

  const [rotate, setRotate] = React.useState(false)

  const handlerRetry = ()=> {
    setRotate(true)
    setTimeout(()=> {
      setRotate(false)
    }, 300)
    step.retry()
  }


  return (
    <div className={"text-xs font-light   flex items-center justify-center"}>

      <div className={" break-keep px-1"}>
        {step.title}
      </div>
      {
        step.stepStatus === StepStatus.Error && <div >
              <RotateCw
                  className={
                    cn(
                      "w-3 h-3 cursor-pointer",
                      rotate && "animate-spin"
                    )
                  } onClick={handlerRetry}/>
          </div>
      }
      {/*  detail, */
      }
    </div>
  )
}
