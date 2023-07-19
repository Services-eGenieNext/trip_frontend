import React from 'react'
import styles from "./SmallStory.module.css"

const SmallStory = () => {
    return (
        <div className={`sm-width`}>
            <div className={`grid grid-cols-12 items-center my-10 md:my-20 mx-4 p-10 rounded-xl bg-white ${styles.small_story_wrapper}`}>
                <p className="gilroy font-bold text-[38px] leading-[45.94px] col-span-3">Story Of bali.</p>
                <div className="col-span-8 text-[#656262]">
                    <p className="text-base leading-[24px]">Bali is a province of Indonesia and the westernmost of the Lesser Sunda Islands. East of Java and west of Lombok, the province includes the island of Bali and a few smaller neighbouring islands, notably Nusa Penida, Nusa Lembongan, and Nusa Ceningan.</p>
                    <p className="text-base leading-[24px]">February is the cheapest month to fly to Bali, has cheaper accommodation and is quieter as a result of the rainy season.</p>
                </div>
            </div>
        </div>
    )
}

export default SmallStory