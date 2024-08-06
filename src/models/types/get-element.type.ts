export type GetElementType<T extends Array<any>> = T extends (infer U)[] ? U : never;
