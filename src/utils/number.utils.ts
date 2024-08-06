export const NumberUtils = {
    isNUmber: (num: any) => typeof num === 'number',
    isNullOrUndefined: (num: any) => num === null || num === undefined,
    isNullOrZero: (num: any) => num === null || num === undefined || num === 0,
    isNullOrNegative: (num: any) => num === null || num === undefined || num < 0,
    isNullOrPositive: (num: any) => num === null || num === undefined || num > 0,
    isNullOrNegativeOrZero: (num: any) => num === null || num === undefined || num <= 0,
    isNullOrPositiveOrZero: (num: any) => num === null || num === undefined || num >= 0,
    isInteger: (num: any) => Number.isInteger(num),
    isFloat: (num: any) => Number.isFinite(num) && !Number.isInteger(num),
    isPositive: (num: any) => num > 0,
    isNegative: (num: any) => num < 0,
    isZero: (num: any) => num === 0,
}
