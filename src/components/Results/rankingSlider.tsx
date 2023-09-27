import React,{useEffect} from 'react';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
  return `${value}°C`;
}

export default function RangeSlider({title,clearData,setRanking}:any) {
  const [value, setValue] = React.useState<number[]>([1,5]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    console.log(newValue,"newValue")
    setRanking(newValue)
    setValue([newValue,5] as number[]);
  };

  useEffect(()=>{
if(clearData == true){
  setValue([1,5])
}
  },[clearData])

  return (
    <div className="py-7 border-b border-[#E3E3E3]">
        <h1 className="text-[18px] font-bold">{title}</h1>
        <div className='my-5 font-semibold flex items-center justify-between'>
            <h1>{value ? `$${value[0]}` : "$0"}</h1>
            <h1>{value ? `$${value[1]}` : "$0"}</h1>
        </div>
      {/* <Slider
        // getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        // getAriaValueText={valuetext}
        min={1}
        max={5}
        step = {0.1}
      /> */}
      <Slider
      value={value[0]}
       max={5} 
       min={1} 
       step = {0.1}
       onChange={handleChange}
       />
    </div>
  );
}