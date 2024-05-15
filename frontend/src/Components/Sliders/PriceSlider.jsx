import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


export default function PriceSlider({ value, onChange }) {
  const handleChange = (event, newValue) => {
    onChange(event, newValue);
  };

  return (
    <>
    <div className="slider-content">
    </div>

      <Box
        sx={{
          width: '90%',
          '& .MuiSlider-root': { height: 8, color: '#c15b3c' },
          '& .MuiSlider-track': { backgroundColor: '#c15b3c' },
          '& .MuiSlider-rail': { backgroundColor: 'rgb(153, 151, 151)' },
          '& .MuiSlider-thumb': {
            backgroundColor: '#c15b3c',
            boxShadow: '0px 0px 5px 0px #c15b3c',
          },
          '& .MuiSlider-mark': { color: 'transparent' },
          '& .MuiSlider-markLabel': { color: 'rgb(153, 151, 151)' },
          '& .MuiSlider-valueLabel': {
            backgroundColor: 'whitesmoke',
            color: 'black',
          },
        }}
      >
        <Slider
          aria-label="Small steps"
          value={value}
          onChange={handleChange}
          step={500}
          marks
          min={100}
          max={8000}
          valueLabelDisplay="auto"
        />
      </Box>
      <div className="slider-description">Below Rs. <span className='price-range-value'>{value}</span></div>

    </>
  );
}
