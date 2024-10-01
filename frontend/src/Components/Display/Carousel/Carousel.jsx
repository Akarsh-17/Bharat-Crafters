import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import image1 from '../../../Images/pexels-nur-andi-ravsanjani-gusma-2422574.jpg'
import image3 from '../../../Images/pexels-quang-nguyen-vinh-2166456.jpg'
import image5 from '../../../Images/pexels-teona-swift-6850455.jpg'
import './Carousel.css';
import { Link } from 'react-router-dom';

const images = [
  { image_url: image1,
    shop: "Shop in ",
    category: "Hand Painted"
  },
  { image_url: image3,
    shop: "Shop in ",
    category: "Clay-Decor and Outdoor"

  },
  { image_url: image5,
    shop: "Shop in ",
    category: "Clothes"

  }
];



const MyCarousel = () => {
  return (
    <div className="carousel-container">
      <Carousel showThumbs={false} showArrows={false} infiniteLoop={true} showIndicators={false} showStatus={false} autoPlay={true}>
        {
          images.map((image, index) => {
            return (
              <div className="carousel-image-container" key={index}>
                <img src={image.image_url} key={index} className='carousel-images'></img>
                <div className="carousel-image-overlay">
                  <Link className='overlay-link'><div className="overlay-shop-in">{image.shop}</div>
                  <div class="overlay-category-links">{image.category}</div>
                  </Link>
                
                  
                </div>
              </div>
            )
          })
        }
      </Carousel>
    </div>
  );
};

export default MyCarousel;
