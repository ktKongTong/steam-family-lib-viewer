
import {cn} from "@/lib/utils";
import {Check, ChevronRight, LoaderCircle, X} from "lucide-react";
import React from "react";
import {StepStatus} from "@/hooks/data/step";

export function StepPhaseIcon({stepStatus, className}: { stepStatus: StepStatus , className?: string }) {
  return (
    <div className={cn(
      " rounded-full w-6 h-6 flex items-center justify-center ",
      stepStatus === StepStatus.NotStart && 'bg-gray-300',
      stepStatus === StepStatus.Processing && 'bg-blue-100',
      stepStatus === StepStatus.OK && 'bg-green-300',
      stepStatus === StepStatus.Error && 'bg-red-300',
      className
    )}>
      {
        stepStatus === StepStatus.NotStart && <ChevronRight className={"text-primary w-4 h-4"}/>
      }
      {
        stepStatus === StepStatus.Processing && <LoaderCircle className={"animate-spin text-white w-4 h-4"}/>
      }
      {
        stepStatus === StepStatus.OK && <Check className={"text-white w-4 h-4"}/>
      }
      {
        stepStatus === StepStatus.Error && <X className={"text-white w-4 h-4"}/>
      }
    </div>
  )
}


export default React.memo(StepPhaseIcon)