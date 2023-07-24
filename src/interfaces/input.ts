import {Range} from "react-date-range"

interface DefaultField {
    className?: string,
    label: string,
    placeholder?: string,
    icon?: any,
    onChange?: (value?: any) => void,
    name?: string
}
interface IInputField {
    className?: string,
    label: string,
    type?: string,
    value?: string
    placeholder?: string,
    icon?: any,
    onChange?: (value?: any) => void,
    onAdditionalChange?: (value?: any) => void,
    name?: string
}

export interface ISelectField extends IInputField  {
    data: ISelectOptions[]
}

export interface ISelectOptions {
    additional?: boolean
    key: string | number
    value: string
}

export interface IDateRangeField extends DefaultField  {
    value: Range
}

export default IInputField