interface IInputField {
    className?: string,
    label: string,
    type: string,
    value?: string
    placeholder?: string,
    onChange?: (value?: any) => void
}

export default IInputField