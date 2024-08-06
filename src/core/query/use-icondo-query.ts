import { useEffect, useState } from 'react'
import { PromiseState } from '@/models'
import { IParameter, TResult } from './react-query.types'
import { useQuery } from '@tanstack/react-query'

export const useICondoQuery = <T, P>(parameter?: IParameter<T, P, 'query'>): TResult<T, P, 'query'> => {
    const { queryKey, fetcher, props, ...rest } = parameter!
    const { onSuccess, payload, onError } = props || {}
    const [localData, setLocalData] = useState<PromiseState<T>>(null)

    const data = useQuery({
        ...rest,
        queryKey: [...queryKey, JSON.stringify(payload)],
        queryFn: () => fetcher(props),
    })
    const { data: response, error } = data
    // useEffect(() => {
    //     if (error) onError(error);
    // }, [error]);
    useEffect(() => {
        if (response && onSuccess) {
            setLocalData(onSuccess(response))
        }
        setLocalData(response)
    }, [response])
    return {
        ...data,
        data: localData,
    } as TResult<T, P, 'query'>
}
