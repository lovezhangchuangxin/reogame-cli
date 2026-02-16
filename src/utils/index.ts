/**
 * 数值枚举转数组
 *
 * @example
 * ```ts
 * enum Enum {
 *  A,
 *  B,
 * }
 * const arr = enumToArray(Enum); // [0, 1]
 * ```
 */
export function enumToArray<T extends Record<string, any>>(e: T) {
  return Object.values(e).filter((v) => !isNaN(+v)) as T[keyof T][]
}
