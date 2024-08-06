import { useMemo } from 'react'
import { BaseModel } from '@/models'
import { BaseSearchModel } from '@/models/search/base-search.model'
import { createKeyQuery } from '@/utils'
import { queryClient } from './icondo-query-client'
import { TQueryKey, TUpdateQuery } from './react-query.types'
import flatMap from 'lodash/flatMap'

/**
 * Get cache by key from react-query
 * @function useGetQueryCache
 * @param {TQueryKey} config
 * @returns TUpdateQuery<TData>
 * */
const useGetQueryCache = <TData, TPayload extends BaseSearchModel>(config: TQueryKey<TPayload>) => {
    return queryClient.getQueryData<TUpdateQuery<TData>>(createKeyQuery(config))
}

/**
 * Get cache from infinity scroll
 * @function useGetInfinityCache
 * @param config
 * */
const useGetInfinityCache = <TData extends BaseModel, TPayload extends BaseSearchModel>(config: TQueryKey<TPayload>) => {
    const data = queryClient.getQueryData<TUpdateQuery<TData, 'infinity'>>(createKeyQuery(config))
    return useMemo(() => {
        return flatMap(data?.pages || [], ({ data }) => data)
    }, [data])
}

export { useGetQueryCache, useGetInfinityCache }
