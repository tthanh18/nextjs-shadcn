import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface PromiseState<T = unknown> extends AxiosResponse<T> {
    totalItem?: number
}

export interface ApiRequestModel<T = any, TData = any> extends AxiosRequestConfig {
    isLoading: boolean
    isV1: boolean
    payload: Partial<T>
    headers: {
        [key: string]: string | number
    }
    isCache: boolean
    url: string
    toResponse: Function
    toRequest: Function
    onSuccess: (data: PromiseState<TData>) => PromiseState<TData>
    onError: (error: any) => any
}
