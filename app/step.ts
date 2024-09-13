// type StepStatus = 'ok' | 'processing' | 'error'
export enum StepStatus {
  NotStart ="Not Started",
  OK = "OK",
  Processing = "Processing",
  Error = "Error",
}


export class Step {
  stepStatus: StepStatus = StepStatus.NotStart
  title: string
  message:string = ""
  constructor(title:string,message?: string) {
    this.title = title
    if(message) {
      this.message = message
    }
  }
  updateStatus(status:StepStatus, message?:string) {
    this.stepStatus = status
    if(message) {
      this.message = message
    }
  }
  async trigger <T>(func: ()=>Promise<T>,message?:string): Promise<T>{
    this.stepStatus = StepStatus.Processing
    this.message = message ?? ""
    try {
      const res = await func()
      this.success("成功获取")
      return res
    }catch(e:any){
      this.failed(e?.toString())
      throw e
    }

  }
  failed(message: string) {
    console.log(`setting failed status ${this.title}`)
    this.stepStatus = StepStatus.Error
    this.message = message
  }
  success(message: string) {
    console.log(`setting success status ${this.title}`)
    this.stepStatus = StepStatus.OK
    this.message = message
  }
  isTriggered() {
    return this.stepStatus !== StepStatus.NotStart
  }
}

export class RetryableStep extends Step {
  // stepName: string
  // constructor(stepName:string) {
  //   super(stepName);
  //   this.stepName=stepName
  // }
  // override async trigger<T>(func: ()=>Promise<T>, message: string) {
  //
  //   let res
  //   try {
  //     res = await func()
  //   }catch (e:any) {
  //     this.failed("获取"+this.stepName + "失败:" + e.toString())
  //   }
  //   return res as T
  // }
  //
  // override failed(message?: string) {
  //   super.failed(message ?? `获取${this.stepName}失败`);
  // }
  //
  // override success(message?: string) {
  //   super.success(message ?? `成功获取${this.stepName}`);
  // }

  // retry(message?:string) {
  //   return this.trigger('retry' + message)
  // }
}
export const statusToEmoji = (status:StepStatus)=> {
  if(status === StepStatus.OK) {
    return `✅`
  }
  if(status === StepStatus.Processing) {
    return `🚧`
  }
  if(status === StepStatus.Error) {
    return `❌`
  }
  return `☑️`
}
