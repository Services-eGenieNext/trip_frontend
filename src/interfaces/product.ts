export interface IProductHorizontalSlide {
    Title: string
    Description?: string
    data?: any
    isAddButton?: boolean
    isDesc?: boolean
    url? : string
    locationsState : [] | any
    type?: 'detail-card' | 'title-card'
}