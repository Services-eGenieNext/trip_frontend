import React, {useState} from 'react'
import ComponentTitle from '../UIComponents/ComponentTitle'
import { BlankStar, FilledStar } from '../icons/Stars'
import BlueButton from '../UIComponents/Buttons/BlueButton'
import styles from "./client-testimonials.module.css"
import Modal from '../Modal/index'

const ClientTestimonials = () => {

    const [openModal, setOpenModal] = useState(true)

    const clients = [
        {
            title: "Pellentesque habitant morbi tristique",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text .",
            name: "Anastya Deo",
            created_data: "16/02/2023",
            reviews: 3,
        },
        {
            title: "Pellentesque habitant morbi tristique",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text .",
            name: "Anastya Deo",
            created_data: "17/05/2023",
            reviews: 4,
        },
        {
            title: "Pellentesque habitant morbi tristique",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text .",
            name: "Anastya Deo",
            created_data: "13/07/2023",
            reviews: 1,
        },
        {
            title: "Pellentesque habitant morbi tristique",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text .",
            name: "Anastya Deo",
            created_data: "13/10/2023",
            reviews: 2,
        },
        {
            title: "Pellentesque habitant morbi tristique",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text .",
            name: "Anastya Deo",
            created_data: "16/11/2023",
            reviews: 5,
        }
    ]

    const reviewArr = new Array(5).fill(1);

    return (
        <div className="sm-width px-4">
            <div className="flex flex-wrap justify-between items-center">
                <div>
                    <ComponentTitle title='Clients testimonials' /> 
                    <span className="flex flex-wrap gap-2 items-center">
                        <FilledStar />
                        <FilledStar />
                        <FilledStar />
                        <BlankStar />
                        10 Reviews
                    </span>
                </div>
                <div onClick={()=>{setOpenModal(true)}}>
                    <BlueButton title={"Write Your review"} />
                </div>
            </div>

            <div className="my-10 md:my-20">
                {
                    clients.map((client, index) => {
                        return <div key={index} className={`bg-white rounded-xl p-8 my-10 ${styles.testimonialCard}`}>
                            <div className="flex flex-wrap justify-between items-center mb-4">
                                <h3 className="text-[#333333] italic text-[23px] leading-[52px]"> &ldquo;{client.title}&rdquo;</h3>
                                <span className="text-black text-[15px] leading-[18px]">{client.created_data}</span>
                            </div>
                            <p className="text-[#5C5B5B] italic text-[17px] leading-[27px] mb-4">{client.desc}</p>

                            <div className="flex flex-wrap gap-8 items-center">
                                <div className="gilroy italic font-bold text-xl">Logo</div>

                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="font-bold text-[22px] leading-[52px] text-[var(--green)] mr-2">{client.name}</span>
                                    {
                                        reviewArr && reviewArr.map((review, index) => {
                                            if(index < client.reviews)
                                            {
                                                return <FilledStar key={index} />
                                            }
                                            else
                                            {
                                                return <BlankStar key={index} />
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
            {openModal == true ? (
                <Modal openModal={openModal} setOpenModal={setOpenModal} modalFor="review" />
            ):(
                ""
            )}
        </div>
    )
}

export default ClientTestimonials