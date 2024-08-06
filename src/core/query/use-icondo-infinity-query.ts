import { useCallback, useMemo, useRef } from 'react'
import { PromiseState } from '@/models'
import { BaseSearchModel } from '@/models/search/base-search.model'
import { createKeyQuery } from '@/utils'
import { TParameterQuery, TReturnInfinityQuery } from './react-query.types'
import { useInfiniteQuery } from '@tanstack/react-query'
import cloneDeep from 'lodash/cloneDeep'
import flatMap from 'lodash/flatMap'
import remove from 'lodash/remove'
import uniqBy from 'lodash/uniqBy'

export const useICondoInfinityQuery = <T extends Array<unknown>, P extends BaseSearchModel = BaseSearchModel>(
    parameter?: TParameterQuery<T, P>
): TReturnInfinityQuery<T, P> => {
    const { props, fetcher, queryKey, initData = null, uniqField = 'id', hasUniq = true, onSuccess, ...rest } = parameter!
    const refInitData = useRef<T>(null)
    refInitData.current = cloneDeep(initData)
    const refUnique = useRef<boolean>(hasUniq)

    const { payload } = props
    const refParams = useRef(payload)
    const data = useInfiniteQuery({
        refetchOnMount: false,
        gcTime: 10,
        placeholderData: (t) => t,
        ...rest,
        queryKey: createKeyQuery<P>({
            queryKey,
            payload,
        }),
        initialPageParam: payload,
        getNextPageParam: (lastPage, allPages) => {
            const { offset, limit } = lastPage.config.params
            if (lastPage.totalItem) {
                if (offset + limit < lastPage.totalItem) {
                    refParams.current = {
                        ...lastPage.config.params,
                        offset: offset + limit,
                    }
                    return {
                        ...lastPage.config.params,
                        offset: offset + limit,
                    }
                }
                return undefined
            } else {
                if (lastPage.data && lastPage.data.length) {
                    return {
                        ...lastPage.config.params,
                        offset: offset + limit,
                    }
                }
                return undefined
            }
        },
        queryFn: (data) => fetcher({ ...props, payload: (data.pageParam as any) || payload }),
    })

    const { data: response } = data

    const checkHasUnique = useCallback((data: T) => {
        if (!refInitData?.current || !refInitData.current.length) {
            refUnique.current = false
            return
        }
        refInitData.current = remove(refInitData.current, (item) => {
            return data.findIndex((current) => current[uniqField] === item[uniqField]) === -1
        }) as T
        refUnique.current = !!(refInitData.current && refInitData.current.length)
    }, [])

    const newResponse = useMemo((): T => {
        if (!data?.data) return [] as T
        const dataPage: PromiseState<T>[] = data.data['pages']
        const lengthDataPage = dataPage.length - 1
        if (refUnique.current) checkHasUnique(dataPage[lengthDataPage].data)
        let flatData: any = flatMap(dataPage, ({ data }) => data)
        onSuccess && (flatData = onSuccess(flatData))
        return refUnique.current ? (uniqBy<T>([...(initData || []), ...flatData], uniqField) as T) : flatData
    }, [data.dataUpdatedAt, initData])

    if (!response)
        return {
            ...data,
            response: [] as T,
            currentParams: refParams.current,
        }
    return {
        ...data,
        response: newResponse,
        currentParams: refParams.current,
    }
}
