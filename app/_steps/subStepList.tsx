import {SharedLibraryStep, Step, StepStatus} from "@/hooks/data/step";
import {cn} from "@/lib/utils";
import {StepPhaseIcon} from "./stepPhaseIcon";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import React from "react";
import {StepItem} from "@/app/_steps/step";

export function SubSteps(
{
 steps,
 lastIndicatorClassName
}: {
  steps: Step[],
  lastIndicatorClassName?: string
}) {
  const lastIndex = steps.length - 1
  const allOk = steps.filter(step => step.stepStatus !== StepStatus.OK).length === 0
  // retry 重新设置store
  return (
    <ul>
      {steps.map((step, index) => (
        <li key={step.title}>
          <div
            className={cn(
              'relative flex left-4 px-2 py-1',
              'before:w-0.5 before:absolute before:-left-[5px] before:content-[\'\']',
              // 'before:top-1/2  before:h-[calc(100%+16px)]',
              index == 0 && index != lastIndex && 'before:top-1/2  before:h-1/2',
              index != 0 && index != lastIndex && ' before:-translate-y-1/2 before:top-1/2  before:h-full',
              index != 0 && index == lastIndex && 'before:top-0  before:h-1/2',
              step.stepStatus === StepStatus.NotStart && 'before:bg-gray-300',
              step.stepStatus === StepStatus.Processing && 'before:bg-blue-100',
              step.stepStatus === StepStatus.Error && 'before:bg-red-300',
              allOk && 'before:bg-green-300',
              !allOk && step.stepStatus === StepStatus.OK && 'before:bg-gray-300',
              index != 0 && index == lastIndex && lastIndicatorClassName
            )}
          >
            <div className={"h-4 w-4 -left-3 top-1/2 absolute rounded-full -translate-y-1/2"}>
              <StepPhaseIcon stepStatus={step.stepStatus} className={'w-4 h-4'}/>
            </div>
            {
              step instanceof SharedLibraryStep ? (
                <Popover>
                  <PopoverTrigger><StepItem step={step}/></PopoverTrigger>
                  <PopoverContent><SubSteps steps={(step as SharedLibraryStep).steps}/></PopoverContent>
                </Popover>
              ) : (
                <StepItem step={step}/>
              )
            }
          </div>
        </li>
      ))}
    </ul>
  )
}