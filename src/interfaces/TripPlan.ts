export interface IPlanningCard {
    data: any,
    onOpen: (value?: any) => void,
    variation: "list" | "cards"
    rows: string
    isDropdownButton: boolean
}

export interface ITripPlanningHeader {
    variation: "space-arround" | "space-between"
}