// type StepStatus = 'ok' | 'processing' | 'error'
export enum StepStatus {
  NotStart ="Not Started",
  OK = "OK",
  Processing = "Processing",
  Error = "Error",
}


export class Step {
  protected status: StepStatus = StepStatus.NotStart
  title: string
  message:string = ""
  id: string = Math.random().toString(36)
  constructor(title:string,message?: string) {
    this.title = title
    if(message) {
      this.message = message
    }
  }

  get stepStatus() {
    return this.status
  }

  get ok() {
    return this.stepStatus === StepStatus.OK
  }

  func:  ()=>Promise<any> = async ()=>{}
  bindFunc(func: ()=>Promise<any>) {
    this.func = func
  }
  after: ()=>Promise<any> = async ()=>{}
  bindAfter(func: ()=>Promise<any>) {
    this.after = func
  }
  updateStatus(status:StepStatus, message?:string) {
    this.status = status
    if(message) {
      this.message = message
    }
  }
  async trigger<T>(func?: ()=>Promise<T>,message?:string): Promise<T>{
    this.status = StepStatus.Processing
    this.message = message ?? ""
    let f : ()=>Promise<T> = func ?? this.func
    try {
      const res = await f()
      this.success("成功获取")
      await this.after()
      return res
    }catch(e:any){
      this.failed(e?.toString())
    }
    await this.after()
    return null as unknown as T
  }
  retryable: boolean = true
  failed(message: string, retryable = true) {
    // console.log(`setting failed status ${this.title}`)
    this.retryable = retryable
    this.status = StepStatus.Error
    this.message = message
  }
  success(message: string) {
    // console.log(`setting success status ${this.title}`)
    this.status = StepStatus.OK
    this.message = message
  }
  isTriggered() {
    return this.stepStatus !== StepStatus.NotStart
  }

  async retry() {
    if(!this.retryable) {
      return
    }
    this.status = StepStatus.Processing
    try {
      await this.func()
      this.success("成功获取")
    }catch(e:any){
      this.failed(e?.toString())
      // throw e
    }
    await this.after()
  }
}


export class WrappedStep extends Step {
  steps: Step[] = []

  constructor( steps: Step[] = [],message:string = "WrappedStep") {
    super(message)
    this.steps = steps
  }
  setSubSteps(steps: Step[]) {
    this.steps = steps
  }
  get stepStatus() {
    if(this.status != StepStatus.OK && this.status != StepStatus.Error) {
      return this.status
    }
    if(this.status == StepStatus.OK) {
      const ok = this.steps.filter(it=>it.stepStatus !== StepStatus.OK).length === 0
      const err = this.steps.filter(it=>it.stepStatus === StepStatus.Error).length > 0
      const processing = this.steps.filter(it=>it.stepStatus === StepStatus.Processing).length > 0
      if(processing) {
        return StepStatus.Processing
      }
      if(ok) {
        return StepStatus.OK
      }
      if(err) {
        return StepStatus.Error
      }
    }
    return this.status
  }
}

export class SharedLibraryStep extends WrappedStep {

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
