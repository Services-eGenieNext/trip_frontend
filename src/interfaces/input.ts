interface IInputField {
    className?: string,
    label: string,
    type?: string,
    value?: string
    placeholder?: string,
    icon?: any,
    onChange?: (value?: any) => void,
    name?: string
}

export interface ISelectField extends IInputField  {
    data: any
}

export default IInputField