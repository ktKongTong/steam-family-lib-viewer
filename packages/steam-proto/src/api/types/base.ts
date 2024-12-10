import {steamStdServiceRecord} from "../gen";

export type ServiceDict = keyof typeof steamStdServiceRecord

export type ServiceMethodDict<T extends ServiceDict> = (typeof steamStdServiceRecord)[T][number]