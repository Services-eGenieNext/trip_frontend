import React from 'react'

const TripDetail = () => {
    return (
        <div className=' sm:px-0 px-4'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="h-[200px] bg-gray-100 rounded-xl">

                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="h-[98px] bg-gray-100 rounded-xl"></div>
                    <div className="h-[98px] bg-gray-100 rounded-xl"></div>
                    <div className="h-[98px] bg-gray-100 rounded-xl"></div>
                    <div className="h-[98px] bg-gray-100 rounded-xl"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
                <div>
                    <h3 className="font-medium gilroy text-[28px] leading-[32.96px]">{'Sacred Monkey Forest Sanctuary'}</h3>
                    <div className="h-[3px] w-[51px] bg-[var(--blue)] my-5"></div>

                    <div className="mb-5">
                        <h4 className="text-[15px] leading-[18px] font-bold mb-2">Hours:</h4>
                        <div className="text-[var(--lite-gray)] font-semibold text-[14px] leading-[23px] my-1"> {'Monday - 09:00 – 17:00'} </div>
                        <div className="text-[var(--lite-gray)] font-semibold text-[14px] leading-[23px] my-1"> {'Tuesday - 09:00 – 17:00'} </div>
                        <div className="text-[var(--lite-gray)] font-semibold text-[14px] leading-[23px] my-1"> {'Wednesday - 09:00 – 17:00'} </div>
                        <div className="text-[var(--lite-gray)] font-semibold text-[14px] leading-[23px] my-1"> {'Friday 09:00 - 17:00'} </div>
                        <div className="text-[var(--lite-gray)] font-semibold text-[14px] leading-[23px] my-1"> {'Saturday 09:00 - 17:00'} </div>
                        <div className="text-[var(--lite-gray)] font-semibold text-[14px] leading-[23px] my-1"> {'Sunday - 09:00 – 17:00'} </div>
                    </div>
                </div>
                <div>
                    <p className="font-normal text-[15px] leading-[28px] text-[var(--gray)]">{'Mandala Suci Wenara Wana, or well known as Ubud Monkey Forest, is the sanctuary and natural habitat of the Balinese long-tailed macaque. It is located at Padangtegal Ubud, Bali. About 1260 monkeys live in this sanctuary. They are divided into 10 groups, namely in front of main temple group, forest conservation group, central point group, eastern group, michelin group, ashram group, atap and cemeteries group. We also divide the monkeys by age: 63 adult male, 34 Sub-adult male, 219 Adult female, 29 Sub-adult female, 167 juveniles 1, 118 juveniles 2, 63 Infant old and 56 infant. Sacred Monkey Forest Ubud is a famous tourist attraction in Ubud.'}</p>
                </div>
            </div>
        </div>
    )
}

export default TripDetail