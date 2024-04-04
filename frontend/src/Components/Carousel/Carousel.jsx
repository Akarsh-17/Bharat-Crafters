import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.css';

const MyCarousel = () => {
  return (
    <div className="carousel-container">
      <Carousel showThumbs={false} showArrows={true} infiniteLoop={true}>
        <div className="carousel-item">Slide 1</div>
        <div className="carousel-item">Slide 2</div>
        <div className="carousel-item">Slide 3</div>
      </Carousel>
    </div>
  );
};

export default MyCarousel;
