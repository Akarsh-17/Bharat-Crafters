import React from 'react'
import './Sections.css'

//example data 

const cardData = [
  { id: 1, title: 'Card 1', description: 'Description 1', image: 'image' },
  { id: 2, title: 'Card 2', description: 'Description 2', image: 'image' },
  { id: 3, title: 'Card 3', description: 'Description 3', image: 'image' },
  { id: 4, title: 'Card 4', description: 'Description 4', image: 'image' },
];

const Sections = () => {
  return (
    <div className="section-containers">
      <div className="section-container">
        <div className="section-header">Search by Categories</div>

        <div className="section-container-item">
          {cardData.map((card, index) => {
            return (<div className="product-cards">
              <div className="card-header">{card.title}</div>
              <div className="card-image">{card.image}</div>
              <div className="card-description">{card.description}</div>

            </div>)
          })}

        </div>

      </div>
      <div className="section-container">
    <div className="section-header">Search by Categories</div>

      <div className="section-container-item">
        {cardData.map((card, index) => {
          return (<div className="product-cards">
            <div className="card-header">{card.title}</div>
            <div className="card-image">{card.image}</div>
            <div className="card-description">{card.description}</div>

          </div>)
        })}

            </div> 

      </div>
      <div className="section-container">
    <div className="section-header">Search by Categories</div>

      <div className="section-container-item">
        {cardData.map((card, index) => {
          return (<div className="product-cards">
            <div className="card-header">{card.title}</div>
            <div className="card-image">{card.image}</div>
            <div className="card-description">{card.description}</div>

          </div>)
        })}

            </div> 

      </div>
    </div>
  )
}

export default Sections
