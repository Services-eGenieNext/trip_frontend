export interface IPlanningCard {
    data: any,
    onOpen: (value?: any) => void,
    variation: "list" | "cards"
}

export interface ITripPlanningHeader {
    variation: "space-arround" | "space-between"
}