export const StringUtils = {
    capitalize: (str: string) => str.charAt(0).toUpperCase() + str.slice(1),
    toLowerCase: (str: string) => str.toLowerCase(),
    toUpperCase: (str: string) => str.toUpperCase(),
    trim: (str: string) => str.trim(),
    isNullOrEmpty: (str: string) => str === null || str === undefined || str === '',
    isNullOrWhiteSpace: (str: string) => str === null || str === undefined || str.trim() === '',
    isString: (str: any) => typeof str === 'string',
}
