import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import image1 from '../../../Images/pexels-nur-andi-ravsanjani-gusma-2422574.jpg';
import image3 from '../../../Images/pexels-quang-nguyen-vinh-2166456.jpg';
import image5 from '../../../Images/pexels-teona-swift-6850455.jpg';
import './Carousel.css';
import { Link } from 'react-router-dom';

const images = [
  {
    image_url: image1,
    shop: "Shop in ",
    category: "Tribal Art and Craft",
    link: '/category/664248bab5430a55f6a9de46'
  },
  {
    image_url: image3,
    shop: "Shop in ",
    category: "Handicrafts",
    link: '/category/661947db4600ec0608f385da'
  },
  {
    image_url: image5,
    shop: "Shop in ",
    category: "Village industry products",
    link: "/category/66424919b5430a55f6a9de52"
  }
];

const MyCarousel = () => {
  return (
    <div className="carousel-container">
      <Carousel
        showThumbs={false}
        showArrows={false}
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        autoPlay={true}
      >
        {images.map((image, index) => {
          return (
            <div className="carousel-image-container" key={index}>
              <img src={image.image_url} alt={`carousel-${index}`} className="carousel-images" />
              <div className="carousel-image-overlay">
                <Link to={image.link} className="overlay-link">
                  <div className="overlay-shop-in">{image.shop}</div>
                  <div className="overlay-category-links">{image.category}</div>
                </Link>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
