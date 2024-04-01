// type StepStatus = 'ok' | 'processing' | 'error'
export enum StepStatus {
  NotStart,
  OK,
  Processing,
  Error,
}


export class Step {
  stepStatus: StepStatus = StepStatus.NotStart
  message:string = ""
  constructor(message?: string) {
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
  trigger (message:string){
    this.stepStatus = StepStatus.Processing
    this.message = message
  }
  failed(message: string) {
    this.stepStatus = StepStatus.Error
    this.message = message
  }
  success(message: string) {
    this.stepStatus = StepStatus.OK
    this.message = message
  }
  isTriggered() {
    return this.stepStatus !== StepStatus.NotStart
  }
}

export class RetryableStep<T> extends Step {
  stepName: string
  func: ()=>Promise<T>
  constructor(func: ()=>Promise<T>, stepName:string) {
    super();
    this.func = func
    this.stepName=stepName
  }
  override async trigger(message?: string) {
    super.trigger(message ?? `正在获取${this.stepName}信息`);
    let res
    try {
      res = await this.func()
    }catch (e:any) {
      this.failed("获取"+this.stepName + "失败:" + e.toString())
    }
    return res
  }

  override failed(message?: string) {
    super.failed(message ?? `获取${this.stepName}失败`);
  }

  override success(message?: string) {
    super.success(message ?? `成功获取${this.stepName}`);
  }

  retry(message?:string) {
    return this.trigger('retry' + message)
  }
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
}
