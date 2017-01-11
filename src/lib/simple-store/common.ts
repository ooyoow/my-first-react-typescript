// import { OpaqueToken } from '@angular/core'
import { Observable, Subject } from 'rxjs'


// export const StoreQueueConcurrent = new OpaqueToken('StoreQueueConcurrent')

// export const StoreInitialState = new OpaqueToken('StoreInitialState')


export interface Action {
  key: string,
  value: any,
  subject: Subject<any>,
}


type Value<T, K extends keyof T> = T[K]
type ValueResolver<T, K extends keyof T> = (value: T[K]) => T[K]

export type ValueOrResolver<T, K extends keyof T> =
  Value<T, K> | ValueResolver<T, K> |
  Promise<Value<T, K>> | Promise<ValueResolver<T, K>> |
  Observable<Value<T, K>> | Observable<ValueResolver<T, K>>


export function mergeObject<T>(obj: T, partials: Partial<{[P in keyof T]: T[P]}>[]): T {
  return partials.reduce<T>((p, partial) => {
    return { ...p as any, ...partial as any }
  }, obj)
}


export type ObjectKeys<T> = {[P in keyof T]: P}


export function getObjectKeys<T>(state: T): ObjectKeys<T> {
  return Object.keys(state).reduce((p, key) => {
    return { ...p, ...{ [key]: key } }
  }, {}) as any
}


export type ObjectKey<T, K extends keyof T> = K


export type RecursiveReadonly<T> = {
  readonly[P in keyof T]: RecursiveReadonly<T[P]>
}
