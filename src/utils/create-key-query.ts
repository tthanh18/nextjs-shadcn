import { TQueryKey } from '@/core/query'

export const createKeyQuery = <P>(data: TQueryKey<P>) => {
    const { queryKey, payload } = data
    if (!payload) return queryKey
    return [...queryKey, JSON.stringify(Object.fromEntries(Object.entries(payload).filter(([key, value]) => value !== null)))]
}

export const getA = () => {
    return 'A'
}
