import { ApiRequestModel, PromiseState } from '@/models'
import { BaseSearchModel } from '@/models/search/base-search.model'
import { GetElementType } from '@/models/types'
import {
    InfiniteData,
    QueryKey,
    UseInfiniteQueryOptions,
    UseInfiniteQueryResult,
    UseMutationOptions,
    UseMutationResult,
    UseQueryOptions,
    UseQueryResult,
} from '@tanstack/react-query'

export interface IErrorQuery extends Error {
    code: number
    [key: string]: Object | string | number | Symbol | BigInt
}

export type TTypeQuery = 'mutation' | 'query' | 'infinity'
export type TResultQuery<T, P, Q extends TTypeQuery> = Q extends 'mutation'
    ? UseMutationResult<PromiseState<T>, IErrorQuery, Partial<ApiRequestModel<P, T>>>
    : Q extends 'query'
      ? UseQueryResult<PromiseState<T>, P>
      : UseInfiniteQueryResult<PromiseState<T>, IErrorQuery>
export type TOptionsQuery<T, P, Q extends TTypeQuery> = (Q extends 'mutation'
    ? UseMutationOptions<PromiseState<T>, IErrorQuery, Partial<ApiRequestModel<P, T>>>
    : Q extends 'query'
      ? UseQueryOptions<PromiseState<T>, P>
      : Omit<UseInfiniteQueryOptions<PromiseState<T>, IErrorQuery>, 'getNextPageParam' | 'initialPageParam'>) & {
    props?: Partial<ApiRequestModel<P, T>>
    fetcher?: PropsFetcher<T, P>
}

export type TUpdateQuery<T, Q extends TTypeQuery = 'query'> = Q extends 'query'
    ? PromiseState<T>
    : Q extends 'infinity'
      ? InfiniteData<PromiseState<T>>
      : never
export type Optional<T extends object, K extends keyof T = keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type PropsFetcher<T = any, P = any> = (v: Partial<ApiRequestModel<P, T>>) => Promise<PromiseState<T>>
export type TResult<T, P, Y extends TTypeQuery> = TResultQuery<T, P, Y>
export type IParameter<T, P, Q extends TTypeQuery> = TOptionsQuery<T, P, Q>
// infinity query
// export type GetElementType<T extends Array<any>> = T extends (infer U)[] ? U : never;
export type TParameterQuery<T extends Array<any>, P extends BaseSearchModel = BaseSearchModel> = IParameter<T, P, 'infinity'> & {
    uniqField?: keyof GetElementType<T>
    hasUniq?: boolean
    onSuccess?: (v: T) => T
    initData?: T
}

export type TReturnInfinityQuery<T, P> = TResult<T, P, 'infinity'> & {
    response: T
    currentParams: Partial<P>
}
// share
export type TQueryKey<P> = {
    queryKey: QueryKey
    payload: Partial<P>
}
// mutation
export type TCustomOptionMutation = {
    inValidationKey?: QueryKey
}

export type TReturnTypeMutation<T, P> = TResult<T, P, 'mutation'> & TResultCustomMutation
export type TOptionMutation<T, P> = IParameter<T, P, 'mutation'> & TCustomOptionMutation

export type TResultCustomMutation = {
    refreshCache: () => void
}

// lazy query
export type TPickProps<T, P> = IParameter<T, P, 'query'>['props']
export type TFunc<T, P> = (data: TPickProps<T, P>) => Promise<PromiseState<T>>
export type TReturnResultLazyQuery<T, P> = [TFunc<T, P>, TResult<T, P, 'query'>]
