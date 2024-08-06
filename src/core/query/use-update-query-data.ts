import { useCallback } from 'react'
import { createKeyQuery } from '@/utils'
import { TQueryKey, TTypeQuery, TUpdateQuery } from './react-query.types'
import { useQueryClient } from '@tanstack/react-query'
import { Draft, produce } from 'immer'

type TCallbackFn<T, Q extends TTypeQuery> = (data: Draft<TUpdateQuery<T, Q>>) => void
export const useUpdateQueryData = <T, P, Q extends TTypeQuery = 'query'>(props: TQueryKey<P>) => {
    const queryClient = useQueryClient()
    const { queryKey, payload } = props
    return useCallback(
        (cb: TCallbackFn<T, Q>) => {
            queryClient.setQueryData<TUpdateQuery<T, Q>>(
                createKeyQuery({
                    payload,
                    queryKey,
                }),
                (v) =>
                    produce<TUpdateQuery<T, Q>>(v, (data) => {
                        cb(data)
                    })
            )
        },
        [props]
    )
}
