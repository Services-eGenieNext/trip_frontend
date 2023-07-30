export interface IPlanningCard {
    data?: any,
    onOpen: (value?: any) => void,
    variation?: "list" | "cards"
    rows?: string
    isDropdownButton?: boolean
    items?: any
    filteredLocations?: any[]
}

export interface ITripPlanningHeader {
    variation: "space-arround" | "space-between"
}