export class BaseSearchModel {
    offset: number = 0
    limit: number = 10
    key: string = null
    condoId: string
    orderBy: string = ''
    orderType: (typeof SORT_TYPE)[keyof typeof SORT_TYPE] = 'ASC'
}

export const SORT_TYPE = {
    ASC: 'ASC',
    DESC: 'DESC',
}
