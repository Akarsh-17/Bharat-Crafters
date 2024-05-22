import React from 'react'
import Carousel from './Carousel/Carousel.jsx'
import Columns from './Columns/Columns.jsx'
import Sections from './Sections/Sections.jsx'

const Display = ({CategoryDataArray}) => {
  return (
    <>
      <Carousel/>
      <Columns CategoryDataArray={CategoryDataArray}/>
      <Sections/>
    </>
  )
}

export default Display

