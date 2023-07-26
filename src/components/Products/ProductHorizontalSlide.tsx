import React, { useRef, useState } from 'react'
import Section from '../UIComponents/Section'
import ComponentTitle from '../UIComponents/ComponentTitle'
import SliderComponent from '../UIComponents/Sliders/Slider'
import { BlankStar, FilledStar } from '../icons/Stars'
import InputField from '../UIComponents/InputField/InputField'
import TimerOutlined from '../icons/TimerOutlined'
import BlueButton, { BlueButtonOutLined } from '../UIComponents/Buttons/BlueButton'
import { IProductHorizontalSlide } from '@/interfaces'
import styles from "./ProductHorizontalSlide.module.css"

const ProductHorizontalSlide = ({ Title, Description = "", data, isAddButton, isDesc, url }: IProductHorizontalSlide) => {

    let List = [0,0,0,0,0]
    const slideRef = useRef<null | HTMLDivElement>(null)
    const formRef = useRef<null | HTMLDivElement>(null)
    
    const [visible, setVisible] = useState(false)
    const [xPosition, setXPosition] = useState(0)
    const [yPosition, setYPosition] = useState(0)

    const placeForm = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        formRef.current?.classList.add('hidden')
        setTimeout(() => {
            formRef.current?.classList.remove('hidden')
        }, 300);

        if(slideRef.current)
        {
            let xposition = (event.clientX - slideRef.current?.offsetLeft - slideRef.current?.offsetWidth/3);
            let yposition = (event.clientY - slideRef.current?.offsetTop - slideRef.current?.offsetHeight/3);

            setXPosition(xposition)
            setYPosition(yposition)
            setVisible(true)
        }
    }

    const dragStartFunc = (e: React.DragEvent<HTMLDivElement>, item: any) => {
        e.dataTransfer?.setData("product", JSON.stringify(item))
        console.log('on drap', e.dataTransfer.getData("product"));
    }

    return (
        <Section className="relative">
            <ComponentTitle title={Title} />
            <p className='text-[var(--gray)]'>{Description}</p>
            <div ref={slideRef} id='location-to-visit-slide' className="mt-10">
                <SliderComponent>
                    {
                        List && List.map((d, index) => {

                            let title = 'Sacred Monkey Forest Sanctuary'
                            return <div key={index} className={`px-2 w-[270px] cursor-pointer`} draggable={true} onDragStart={(event) => dragStartFunc(event, {name: title})}> 
                                <div className="grid grid-cols-1 rounded-xl border shadow-sm overflow-hidden relative">
                                    <div className="h-[178px] bg-gray-100">

                                    </div>
                                    <div className="p-4">
                                        <div className="grid grid-cols-2 items-center mb-2 relative">
                                            <h4 className={isAddButton ? "col-span-1" : "col-span-2"}>{title}</h4>
                                            {
                                                isAddButton && (
                                                    <div className="flex justify-end items-center gap-2 cursor-pointer"
                                                    onClick={(e) => placeForm(e)}
                                                    >
                                                        <span className="text-[11px] text-[var(--green)]">Add</span>
                                                        <span className="w-[23px] h-[23px] rounded-full bg-[var(--lite-green)] hover:bg-[var(--green)] text-[var(--green)] hover:text-white flex justify-center items-center transition-all duration-300">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-[15px] h-[15px]">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                            {url == "variation_2" && (
                                        <div className="flex flex-wrap gap-2 items-center my-2">
                                            <span>4.4</span>
                                            <FilledStar />
                                            <FilledStar />
                                            <FilledStar />
                                            <FilledStar />
                                            <BlankStar />
                                            <span className="text-[var(--lite-gray)]">{'(2,456)'}</span>
                                        </div>
                                            )}
                                            {url == "variation_3" && (
                                        <div className="flex gap-2 items-center absolute top-[7px] right-[7px] bg-white px-3 border rounded-lg">
                                            <span>4.4</span>
                                            <FilledStar />
                                        </div>
                                            )}
                                        {
                                            isDesc && <p className="text-[15px] text-[var(--gray)]">{'Simply dummy text of the printing'}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </SliderComponent>
            </div>

            <div ref={formRef} id='location-to-visit-form' className={`${!visible ? 'hidden' : 'block'} absolute w-[471px] p-8 bg-white rounded-xl border border-[#EBEBEB] left-1/2} z-10 transition-all duration-300 ${styles.visitCard}`}
            style={{top: yPosition, left: xPosition}}
            >
                <div className="relative">
                    <span 
                        className="absolute top-[-2.5em] right-[-2.4rem] w-[30px] h-[30px] bg-[#F9F9F9] flex justify-center items-center rounded-full p-2 cursor-pointer select-none"
                        onClick={() => setVisible(false)}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </span>
                </div>
                <InputField 
                    type='text' 
                    label="Start Time" 
                    className="w-full mb-5" 
                    placeholder='Choose time'
                    icon={<TimerOutlined />}
                />
                
                <InputField 
                    type='text' 
                    label="End time" 
                    className="w-full mb-5" 
                    placeholder='Choose time'
                    icon={<TimerOutlined />}
                />
                
                <InputField 
                    type='text' 
                    label="Choose day"
                    className="w-full mb-5" 
                    placeholder='Select'
                />

                <div className="flex justify-between">
                    <BlueButtonOutLined title='Cancel' className="w-[150px]"
                    onClick={() => setVisible(false)} />
                    
                    <BlueButton title='Save' className="w-[150px]" />
                </div>
            </div>
        </Section>
    )
}

export default ProductHorizontalSlide