import React, { useRef, useState, useEffect } from 'react'
import Section from '../UIComponents/Section'
import ComponentTitle from '../UIComponents/ComponentTitle'
import SliderComponent from '../UIComponents/Sliders/Slider'
import { BlankStar, FilledStar } from '../icons/Stars'
import InputField from '../UIComponents/InputField/InputField'
import TimerOutlined from '../icons/TimerOutlined'
import BlueButton, { BlueButtonOutLined } from '../UIComponents/Buttons/BlueButton'
import { IProductHorizontalSlide } from '@/interfaces'
import styles from "./ProductHorizontalSlide.module.css"
import BlankLocation from "public/images/blank-location.jpg"
import Image from 'next/image'
import Link from 'next/link'

const ProductHorizontalSlide = ({ Title, Description = "", data, isAddButton, isDesc, url, locationsState }: IProductHorizontalSlide) => {
    const skelton = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([])
    const slideRef = useRef<null | HTMLDivElement>(null)
    const formRef = useRef<null | HTMLDivElement>(null)

    useEffect(() => {
        setLocations(locationsState)
      }, [locationsState]);
    
      useEffect(()=>{
        if(locations.length > 0){
          setLoading(false)
        }
      },[locations])
    
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
                {loading === true
              ? skelton.map((limit: string, index: number) => {
                  return (
                    <div
                    key={index}
                      role="status"
                      className="max-w-sm rounded animate-pulse h-[350px] relative px-3"
                    >
                      <div className="flex items-center justify-center mb-4 bg-gray-300 rounded dark:bg-gray-700 h-[350px]">
                        <svg
                          className="w-10 h-10 text-gray-200 dark:text-gray-600"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20"
                        >
                          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                        </svg>
                      </div>
                      <div className="h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 w-[50%] mb-4 absolute bottom-4 left-6 z-10"></div>
                      <span className="sr-only">Loading...</span>
                    </div>
                  );
                })
              : locations?.map(
                (
                  location: any,
                  index
                ) => {
                  let image_path = location.images === "" ? BlankLocation.src  : location.images
                  let address = location.formatted_address ? location.formatted_address : location.address_obj?.address_string
                  return (
                    <div key={index} className="px-3">
                      <div className={`relative md:mt-0 mt-5 h-[350px] w-full rounded-xl overflow-hidden cursor-pointer ${styles["slider_card"]}`}>
                        <img src={image_path} alt={image_path}  style={{objectFit: "cover"}} />
                        <div className="absolute inset-0" style={{background: 'linear-gradient(0deg, rgb(0 0 0 / 70%), transparent)'}}></div>
                        <h1 className="absolute bottom-4 left-6 text-white font-bold text-[25px]">{location.name}</h1>
                        <div className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center ${styles["hover_overlay"]}`}>
                          <Link href={'/trip-plan?address='+address} className="h-[40px] rounded-md bg-[#009DE2] text-white hover:bg-transparent border hover:border-[#009DE2] hover:text-white w-[170px]">
                            Automate My Trip
                          </Link>
                          <button className="h-[40px] rounded-md text-white border border-white mt-5 w-[170px] hover:bg-[#009DE2]">
                            More Info
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
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