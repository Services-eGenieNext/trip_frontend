import Image from 'next/image';
import React, { useState } from 'react'
import styles from "./reviews.module.css"
import { BlankStar, FilledStar } from '../icons/Stars';

interface IReview {
    client: any
}

const Review = ({ client } : IReview) => {
    let length = 400
    let showText = client.text.substring(0, length)
    const reviewArr = new Array(5).fill(1);
    const [showMore, setShowMore] = useState(false)
    return (
        <div className={`bg-white rounded-xl p-8 my-10 ${styles.testimonialCard}`} >
            <div className="flex justify-between items-center mb-4">
                <h5 className="text-[#333333] italic text-[23px] leading-[52px]">
                    {" "}
                    &ldquo;{showMore ? client.text : showText}
                    {
                        (client.text.length <= length  || showMore) ? (
                            <>&rdquo;</>
                        ) : (
                            <>. . . </> 
                        )
                    }
                    {
                        client.text.length > length && (
                            <span className="text-sm text-[var(--blue)] cursor-pointer select-none"
                            onClick={() => setShowMore(!showMore)} >
                                &nbsp;{showMore ? 'Read less' : 'Read more'}
                            </span>
                        )
                    }
                </h5>
                <span className="text-black font-semibold text-[15px] text-right leading-[18px] min-w-[150px]">
                    {client.relative_time_description}
                </span>
            </div>
            {/* <p className="text-[#5C5B5B] italic text-[17px] leading-[27px] mb-4">{client.desc}</p> */}

            <div className="flex flex-wrap gap-8 items-center">
                <div className="gilroy italic font-bold text-xl h-[50px] w-[50px] relative">
                    <Image src={client.profile_photo_url} fill={true} alt={""} />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-[22px] leading-[52px] text-[var(--green)] mr-2">{`${client.author_name}`}</span>
                    {reviewArr &&
                    reviewArr.map((review, index) => {
                        if (index < client.rating) {
                            return <FilledStar key={index} />;
                        } else {
                            return <BlankStar key={index} />;
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default Review