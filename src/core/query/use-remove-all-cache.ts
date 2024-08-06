import { useCallback } from 'react'
import { createKeyQuery } from '@/utils'
import { TQueryKey } from './react-query.types'
import { InvalidateOptions, InvalidateQueryFilters, QueryKey, useQueryClient } from '@tanstack/react-query'

/**
 * This function clear cache when match key
 * @function useRemoveAllCache
 * @param parameter
 * @param filters
 * @param options
 * @return Promise<void>
 * */
export const useRemoveAllCache = <P>(
    parameter: TQueryKey<P>,
    filters?: Omit<InvalidateQueryFilters, 'queryKey'>,
    options?: InvalidateOptions
) => {
    const queryCache = useQueryClient()
    const { payload, queryKey } = parameter
    return useCallback(
        () =>
            queryCache.invalidateQueries(
                {
                    ...filters,
                    queryKey: createKeyQuery({ queryKey, payload }),
                    exact: false,
                    type: 'all',
                },
                options
            ),
        [filters, options]
    )
}
