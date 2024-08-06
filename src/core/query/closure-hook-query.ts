import { IParameter, Optional, TResult } from './react-query.types'
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'

type Func = (params: any) => any
type TReturnTypeClosure<T, P> = (params?: Optional<IParameter<T, P, 'query'>, 'queryKey'>) => TResult<T, P, 'query'>
export function ClosureHookQuery<T, P>(func: Func, paramsFn?: IParameter<T, P, 'query'>): TReturnTypeClosure<T, P> {
    return (params?: IParameter<T, P, 'query'>): TResult<T, P, 'query'> => {
        const mergeParams = merge(cloneDeep(paramsFn), params)
        return func(mergeParams)
    }
}
