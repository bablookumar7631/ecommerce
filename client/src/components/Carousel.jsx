import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

const Carousel = () => {

  const caroImage = [
    {
      thumbnail: './images/c1.webp'
    },
    {
      thumbnail: './images/c2.webp'
    },
    {
      thumbnail: './images/c3.webp'
    },
    {
      thumbnail: './images/c4.webp'
    },
    {
      thumbnail: './images/c5.webp'
    },
    {
      thumbnail: './images/c6.webp'
    }
  ]
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }} // autoplay with a 2.5s delay
        loop={true} // infinite loop
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
        className="mySwiper"
      >
        {
        caroImage.map((img, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={img.thumbnail} alt={`carousel-image-${index}`} />
            </SwiperSlide>
          )
        })
        }
      </Swiper>
    </>
  )
}

export default Carousel
