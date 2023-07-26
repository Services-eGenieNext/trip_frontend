import React from 'react'
import styles from "./SmallStory.module.css"

const SmallStory = ({positioning}:any) => {
    return (
        <div className={`sm-width`}>
            <div className={`${positioning == "inline" ? "grid grid-cols-12 items-center" : "flex flex-col"}  my-10 md:my-20 mx-4 p-10 rounded-xl bg-white ${styles.small_story_wrapper}`}>
                <p className="gilroy font-bold sm:text-[38px] text-[24px] leading-[45.94px] md:col-span-3 col-span-12 md:text-start text-center">Story Of bali.</p>
                <div className={`md:col-span-8 col-span-12 text-[#656262] ${positioning == "inline" ? "md:mt-0 mt-10" : "mt-10"}`}>
                    <p className="text-base leading-[24px] md:text-start text-center">Bali is a province of Indonesia and the westernmost of the Lesser Sunda Islands. East of Java and west of Lombok, the province includes the island of Bali and a few smaller neighbouring islands, notably Nusa Penida, Nusa Lembongan, and Nusa Ceningan.</p>
                    <p className="text-base leading-[24px] md:text-start text-center">February is the cheapest month to fly to Bali, has cheaper accommodation and is quieter as a result of the rainy season.</p>
                </div>
            </div>
        </div>
    )
}

export default SmallStory