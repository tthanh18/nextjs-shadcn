import { PropsFetcher } from './react-query.types'

export enum FormMutationType {
    Create = 'Create',
    Update = 'Update',
    Delete = 'Delete',
}

export type TFetcherAndMessage = {
    [k in keyof typeof FormMutationType]: PropsFetcher
}

export interface IMutationForm {
    cb: () => void
    type: FormMutationType
    message: string
}
