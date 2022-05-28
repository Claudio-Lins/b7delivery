import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/css'
import Image from 'next/image'

export function Banner() {
  return (
    <>
      <div className="mx-6">
        <Swiper
          slidesPerView={1}
          style={{ margin: '0 auto' }}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <div className="flex justify-center">
              <img
                src="/banners/banner1.png"
                width={380}
                height={190}
                alt="banner"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="flex justify-center">
              <img
                src="/banners/banner2.png"
                width={380}
                height={190}
                alt="banner"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  )
}
