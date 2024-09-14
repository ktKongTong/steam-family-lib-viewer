import {cn} from "@/lib/utils";
import {StepPhaseIcon} from "./stepPhaseIcon";
import React from "react";
import {Step, StepStatus, WrappedStep} from "@/hooks/data/step";
import {SubSteps} from "@/app/_steps/subStepList";


export function Steps(
  {
    steps
  }: {
    steps: [Step, WrappedStep, Step]
  }
) {
  // console.log("steps", steps)

  return (
    <div className={'grid grid-cols-3 min-h-40 p-10 items-end justify-items-center'}>
      {/* three step*/}
      <div
        className={"relative w-full flex justify-end"}>
        {/*<StepItem step={steps[0]}/>*/}
        <div className={cn(
          " h-1 translate-y-1/2 top-full left-1/2 w-1/2 mt-4",
          steps[0].stepStatus === StepStatus.NotStart && 'bg-gray-300',
          steps[0].stepStatus === StepStatus.Processing && 'bg-blue-100',
          steps[0].stepStatus === StepStatus.OK && 'bg-green-300'
        )}>
          <div className={"absolute -translate-y-1/2 top-1/2 -left-3"}>
            <StepPhaseIcon stepStatus={steps[0].stepStatus}/>
          </div>
          <div className={"absolute top-full text-xs font-light break-keep -translate-x-1/2 translate-y-1/2 mt-2"}>
            {steps[0].title}
          </div>
        </div>
      </div>
      <div className={"relative w-full flex justify-center"}>
        <div className={cn(
          " h-1 translate-y-1/2 top-full  w-full mt-4",
          steps[1].stepStatus !== StepStatus.OK && 'bg-gray-300',
          steps[1].stepStatus === StepStatus.NotStart && 'bg-gray-300',
          steps[1].stepStatus === StepStatus.Processing && 'bg-blue-100',
          steps[1].stepStatus === StepStatus.OK && 'bg-green-300',
          steps[1].stepStatus === StepStatus.Error && 'bg-red-300',
        )}
        >
          <div className={"  absolute -translate-y-1/2 top-1/2 right-1/2  translate-x-1/2"}>
            <div className={'relative'}>
              <div className={'z-10'}>
                <StepPhaseIcon stepStatus={steps[1].stepStatus}/>
              </div>
              <div className={'absolute -translate-y-full  -top-2 z-0'}>
                <SubSteps steps={steps[1].steps} lastIndicatorClassName={'before:h-[calc(100%+8px)]'}/>
              </div>
            </div>
          </div>
          <div
            className={"absolute top-full text-xs font-light break-keep left-1/2 -translate-x-1/2 translate-y-1/2 mt-2"}>
            {steps[1].title}
          </div>
        </div>
      </div>
      <div className={"relative w-full flex justify-start"}>
        <div className={cn(
          " h-1 translate-y-1/2 top-full right-1/2 w-1/2 mt-4",
          steps[2].stepStatus === StepStatus.NotStart && 'bg-gray-300',
          steps[2].stepStatus === StepStatus.Processing && 'bg-blue-100',
          steps[2].stepStatus === StepStatus.OK && 'bg-green-300'
        )}>
          <div className={" absolute -translate-y-1/2 top-1/2 -right-3"}>
            <div className={'relative'}>
              <StepPhaseIcon stepStatus={steps[2].stepStatus}/>
            </div>
          </div>
          <div
            className={"absolute top-full text-xs font-light break-keep left-full -translate-x-1/2 translate-y-1/2 mt-2"}>
            {steps[2].title}
          </div>
        </div>
      </div>
    </div>
  )
}
