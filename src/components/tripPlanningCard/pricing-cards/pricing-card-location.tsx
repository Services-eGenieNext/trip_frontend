import React, { useEffect, useState } from 'react'
import styles from "../tripPlanning.module.css"
import { LocationsDurationCall } from '@/api-calls'

interface IPricingCardLocation {
    index: number
    rows: string
    time: any
    days: any
    distanceObject: any
    onOpen: (value?: any) => void
}

const PricingCardLocation = ({
    index,
    rows,
    time,
    days,
    distanceObject,
    onOpen = () => {},
    }: IPricingCardLocation) => {

    const [duration, setDuration] = useState(null)
    const [openingTime, setOpeningTime] = useState(time.time)

    const onDropFunc = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        let detail: any = e.dataTransfer.getData('product')
        let detailEle: HTMLElement | null = document.getElementById(`detail_${days.day + index}`)
        if(detail && detailEle && detailEle !== undefined)
        {
          detail = JSON.parse(detail)
          detailEle.innerHTML = detail.name
        }
    }

    const setEndTime = (suggestedLastTime: Date) => {
        return suggestedLastTime.setHours(suggestedLastTime.getHours() + 2)
    }

    const getTime = async (time: string) => {
        let hours = Number(time.split(':')[0])
        let minutes
        if(time.split(':')[1].search('AM') ==-1 && time.split(':')[1].search('PM') ==-1)
        {
            minutes = Number(time.split(':')[1])
        }
        else
        {
            if(time.split(':')[1].search('PM') !== -1)
            {
                hours += 12
            }
            minutes = Number(time.split(':')[1].substr(0,2))
        }

        let suggestedLastTime = await new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), hours, minutes)
        // console.log('suggestedLastTime', suggestedLastTime)
        return suggestedLastTime
    }

    function formatTime(timeString: string) {
        const [hourString, minute] = timeString.split(":");
        const hour = +hourString % 24;
        return (hour % 12 || 12) + ":" + (Number(minute.substr(0,2)) < 10 ? '0'+minute : minute) + (hour < 12 ? "AM" : "PM");
    }

    const check_and_sort_start_time = async (duration: string) => {

        let _currentStartTime: any = days.times[index].time.replace(' – ', ' - ').split(' - ')[0]
        _currentStartTime = await getTime(_currentStartTime)
        let _currentEndTime: any = days.times[index].time.replace(' – ', ' - ').split(' - ')[1]
        _currentEndTime = await getTime(_currentEndTime)

        if(days.times[index-1].time.search('Open') !== -1)
        {
            return _currentStartTime
        }

        // set end time by using of start time
        let _prevEndTime: any = days.times[index-1].time.replace(' – ', ' - ').split(' - ')[0]
        _prevEndTime = _prevEndTime.split(',')[0]
        _prevEndTime = await getTime(_prevEndTime)
        // console.log('_prevEndTime', _prevEndTime, index)

        setEndTime(_prevEndTime)

        // console.log('_prevEndTime', _prevEndTime, _currentStartTime, _currentEndTime)
        

        // aded duration in previous end time
        if(duration.search('days') !== -1)
        {
            _prevEndTime.setDate(_prevEndTime.getDate() + Number(duration.substring(0,2)))
        }
        else if(duration.search('hours') !== -1)
        {
            _prevEndTime.setHours(_prevEndTime.getHours() + Number(duration.substring(0,2)))
        }
        else if(duration.search('mins') !== -1)
        {
            _prevEndTime.setMinutes(_prevEndTime.getMinutes() + Number(duration.substring(0,2)))
        }

        if(_prevEndTime.getTime() >= _currentStartTime.getTime() && _prevEndTime.getTime() <= _currentEndTime.getTime())
        {
            return _prevEndTime
        }

        return _currentStartTime
    }

    useEffect(() => {
        
        const _defTime = async (duration="") => {
            let _time = time.time.replace(' – ', ' - ')

            if(_time.search(' - ') !== -1)
            {
                let timeArr
                if(_time.search(' - ') !== -1)
                {
                    timeArr = _time.split(' - ')
                }

                let suggestedLastTime = await getTime(timeArr[0])

                setEndTime(suggestedLastTime)
                
                let lastTime = await getTime(timeArr[1])
                if(suggestedLastTime.getTime() <= lastTime.getTime())
                {
                    lastTime = suggestedLastTime
                }

                let firstTime = await getTime(timeArr[0])
                if(index > 0)
                {
                    firstTime = await check_and_sort_start_time(duration)
                }
                
                let _startTime = formatTime(`${firstTime.getHours()}:${firstTime.getMinutes()}`)
                let _endTime = formatTime(`${lastTime.getHours()}:${lastTime.getMinutes()}`)
                let _suggestTime = `${_startTime} - ${_endTime}`
                
                // console.log('duration', duration)
                setOpeningTime(_suggestTime)
            }
        }

        const _def = async () => {
            let duration = await LocationsDurationCall(distanceObject.origin, distanceObject.destination)

            if(duration.status == 200 && duration.data.rows[0]?.elements[0]?.duration?.text)
            {
                let _durationTime = duration.data.rows[0].elements[0].duration.text
                setDuration(_durationTime)
                _defTime(_durationTime)
            }
            else
            {
                _defTime()
            }
        }

        if(distanceObject.origin && distanceObject.destination)
        {
            _def()
        }
        else
        {
            _defTime()
        }
    }, [distanceObject])

    return (
        <>
        {
            duration && <span className="flex rounded-full px-2 h-max bg-[var(--blue)] text-white text-[12px] whitespace-nowrap w-max -translate-y-full">{duration}</span>
        }
        <div
            className={`flex gap-x-4 mb-10 cursor-pointer h-full ${styles["pricingCard"]}`}
            onDrop={(e) => onDropFunc(e)}
            onDragOver={(e) => {e.preventDefault()}}
        >
            <div>
            <div>
                <div className="w-[20px] h-[20px] bg-[#AEDCF0] rounded-full flex justify-center items-center">
                <div className="w-[10px] h-[10px] bg-[#009DE2] rounded-full"></div>
                </div>
            </div>
            <div
                className={`h-full ml-2 ${styles["divider"]}`}
            ></div>
            </div>
            <span
            className="text-[13px] text-black hover:text-[#009DE2]"
            onClick={() => {
                onOpen(time.location);
            }}
            >
            <h1 className="gilroy font-semibold">
                {time.time} -{" "}
            </h1>
            <p className="font-medium max-w-[200px] w-full">{time?.location?.name}</p>
            </span>
        </div>
        </>
    )
}

export default PricingCardLocation