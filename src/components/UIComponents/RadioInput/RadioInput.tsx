import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtonsGroup({options,setValue,value}:any) {
    const handleCheck = (option:string) => {
        setValue({...value, selectedOption: option})
    }
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        {options.length > 0 && (
            options.map((option:any,index:number)=>{
                return (
                    <FormControlLabel key={index} value={option.value} control={<Radio />} label={option.label} onClick={()=>{handleCheck(option.value)}} />
                )
            })
        )}
      </RadioGroup>
    </FormControl>
  );
}
