import React, { MouseEvent } from 'react'

interface IBlueButton extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes {
    title: string;
}

const BlueButton:React.FC<IBlueButton> = (props) => {

    const {children, title, ...rest} = props;

    return (
        <button className="py-4 bg-[#009DE2] text-white rounded-xl w-[200px] my-2"
        {...rest}
        >
            {title}
        </button>
    )
}

export default BlueButton