export interface ITime {
    time: string
    location: any
}

interface IDays {
    day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday",
    times: ITime[]
}

export default IDays