export type WideObject = {
  [name in number | string]: boolean | number | string | undefined | WideObject
}

export type RemoveIndex<T> = {
  [k in keyof T as string extends k
    ? never
    : number extends k
    ? never
    : k]: T[k]
}

/** Narrowed string. */
export type String = string & Record<never, never>

/** Returns a widened value from the given value. */
export type Widen<T> = T extends number
  ? `${T}` | T
  : T extends 'true'
  ? boolean | T
  : T extends 'false'
  ? boolean | T
  : T extends `${number}`
  ? number | T
  : T

export type HasKey<
  T extends Record<string | number, unknown>,
  K extends string | number
> = K extends keyof T ? T : never
