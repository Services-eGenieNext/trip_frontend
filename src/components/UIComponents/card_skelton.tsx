import React,{useState} from 'react'

export default function Card_skelton() {
    const array = ["1","2","3","4","5","6","7"]
    return (
        <div role="status" className="max-w-sm p-4 rounded-lg border-2 border-dashed border-gray-200 shadow animate-pulse md:p-6 dark:border-gray-700">
            <div className="h-[30px] w-[150px] bg-gray-200 rounded-lg dark:bg-gray-700 mb-2.5"></div>
            <div role="status" className="max-w-sm p-4 rounded-lg border-2 border-dashed border-gray-200 shadow animate-pulse md:p-6 dark:border-gray-700 flex flex-col gap-y-7 mt-10">
                {array.map((list:string,index:number)=>{
                    return <div key={index} className="h-[30px] bg-gray-200 rounded-lg dark:bg-gray-700 w-48 mb-4"></div>
                })}
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}
