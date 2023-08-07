import { LocationsDurationCall } from "@/api-calls"

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

const check_and_sort_start_time = async (times: any, i: number, duration: string) => {

    let _currentStartTime: any = times[i].time.replace(' – ', ' - ').split(' - ')[0]
    _currentStartTime = await getTime(_currentStartTime)

    let _currentEndTime: any = times[i].time.replace(' – ', ' - ').split(' - ')[1]
    _currentEndTime = await getTime(_currentEndTime)

    // set end time by using of start time
    let _prevEndTime: any = times[i-1].suggestedTime.endTime
    // _prevEndTime = _prevEndTime.split(',')[0]
    _prevEndTime = await getTime(_prevEndTime)
    console.log('_prevEndTime', _prevEndTime)

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
        let suggestedLastTime = _prevEndTime
        suggestedLastTime.setHours(suggestedLastTime.getHours() + 2)
        return {
            startTime: `${_prevEndTime.getHours()} - ${_prevEndTime.getMinutes()}`,
            endTime: `${suggestedLastTime.getHours()} - ${suggestedLastTime.getMinutes()}`,
        }
    }

    return {
        startTime: `${_currentStartTime.getHours()} - ${_currentStartTime.getMinutes()}`,
        endTime: `${_currentEndTime.getHours()} - ${_currentEndTime.getMinutes()}`,
    }
}

const calculateDuration = async (times: any, i: number, duration: string) => {
    let _time = times[i].time.replace(' – ', ' - ')
    if(_time.search(' - ') !== -1)
    {
        let timeArr: any = []
        if(_time.search(' - ') !== -1)
        {
            timeArr = _time.split(' - ')
        }

        let _currentStartTime: any = times[i].time.replace(' – ', ' - ').split(' - ')[0]
        _currentStartTime = await getTime(_currentStartTime)

        let _currentEndTime: any = times[i].time.replace(' – ', ' - ').split(' - ')[1]
        _currentEndTime = await getTime(_currentEndTime)

        if(i == 0 || times[i-1].time.search('Open') !== -1)
        {
            return {
                startTime: `${_currentStartTime.getHours()} - ${_currentStartTime.getMinutes()}`,
                endTime: `${_currentEndTime.getHours()} - ${_currentEndTime.getMinutes()}`,
            }
        }

        // set end time by using of start time
        let _prevEndTime: any = times[i-1].suggestedTime.endTime
        console.log('duration, timeArr', duration, timeArr)
        console.log('_prevEndTime', _prevEndTime)

        // let startTime = await getTime(timeArr[0])
        // let suggestedLastTime = startTime
        // suggestedLastTime.setHours(suggestedLastTime.getHours() + 2)
        
        // let lastTime = await getTime(timeArr[1])
        // if(suggestedLastTime.getTime() <= lastTime.getTime())
        // {
        //     lastTime = suggestedLastTime
        // }
        return await check_and_sort_start_time(times, i, duration)

        // if(i == 0)
        // {
        //     return {
        //         startTime: `${startTime.getHours()} - ${startTime.getMinutes()}`,
        //         endTime: `${lastTime.getHours()} - ${lastTime.getMinutes()}`,
        //     }
        // }
        // else
        // {
        //     await check_and_sort_start_time(times, i, duration)
        // }

        // let firstTime = await getTime(timeArr[0])
        // if(i > 0)
        // {
        //     firstTime = await check_and_sort_start_time(times, i, duration)
        // }
        // let _startTime = formatTime(`${firstTime.getHours()}:${firstTime.getMinutes()}`)
        // let _endTime = formatTime(`${lastTime.getHours()}:${lastTime.getMinutes()}`)
        // let _suggestTime = `${_startTime} - ${_endTime}`
        
        // setOpeningTime(_suggestTime)
    }
    return {
        startTime: _time,
        endTime: '',
    }
}

const _calculateStartAndEndTime = async (times: any, i: number) => {

    let _currentStartTime: any = times[i].time.replace(' – ', ' - ').split(' - ')[0]
    _currentStartTime = await getTime(_currentStartTime)

    let _currentEndTime: any = times[i].time.replace(' – ', ' - ').split(' - ')[1]
    _currentEndTime = await getTime(_currentEndTime)

    if(i == 0)
    {
        return {
            startTime: `${_currentStartTime.getHours()}:${_currentStartTime.getMinutes()}`,
            endTime: `${_currentEndTime.getHours()}:${_currentEndTime.getMinutes()}`,
        }
    }

    let origin = null
    let destination = null
    if(i > 0 && times[i - 1])
    {
        origin = times[i - 1].location?.place_id ? times[i - 1].location?.formatted_address.split(',')[0] : times[i - 1].location.address_obj.address_string
        destination = times[i].location?.place_id ? times[i].location?.formatted_address.split(',')[0] : times[i].location.address_obj.address_string
    }

    let duration = await LocationsDurationCall(origin, destination)

    let _durationTime = ""
    if(duration.status == 200 && duration.data.rows[0]?.elements[0]?.duration?.text)
    {
        _durationTime = duration.data.rows[0].elements[0].duration.text
    }
    console.log('_durationTime', _durationTime)

    return await calculateDuration(times, i, _durationTime)

}

export { _calculateStartAndEndTime }