import React from 'react'

interface IComponentTitle {
    title: string
}

const ComponentTitle = ({title}: IComponentTitle) => {
    return (
        <h3 className="font-bold text-2xl md:text-4xl gilroy capitalize">{title}</h3>
    )
}

export default ComponentTitle