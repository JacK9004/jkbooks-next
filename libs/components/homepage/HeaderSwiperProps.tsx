// components/StaticHeaderSwiper.tsx

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'; // Import Swiper styles
import { Autoplay } from 'swiper';

// Static image URLs
const staticImages = [
  '/img/banner/banner.jpeg',
  '/img/banner/banner5.jpg',
  '/img/banner/banner6.jpg',
  '/img/banner/banner2.webp',
  // '/img/banner/banner3.jpeg',
  '/img/banner/banner4.jpg', 
 
];

const StaticHeaderSwiper: React.FC = () => {
  return (
    <Swiper
      className="static-header-swiper"
      slidesPerView={'auto'}
      centeredSlides={true}
      spaceBetween={25}
      autoplay={{
        delay: 5000, // Delay in ms between slides
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
    >
      {staticImages.map((image, index) => (
        <SwiperSlide key={`static-${index}`} className="static-header-slide">
          <img src={image} alt={`Static Image ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default StaticHeaderSwiper;
