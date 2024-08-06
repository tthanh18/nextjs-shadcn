/**
 * Helper to produce an array of enum values.
 * @return Array Enumeration key => value
 * @param enumData
 */
export function convertEnumToArray(enumData) {
    const arrayObjects = []
    for (const [propertyKey, propertyValue] of Object.entries(enumData)) {
        if (!Number.isNaN(Number(propertyKey))) {
            continue
        }
        arrayObjects.push({ value: propertyValue, key: propertyKey })
    }
    return arrayObjects
}
