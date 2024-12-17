"use client";
import Image from "next/image";
import zenithGrayLogo from "../../assets/Images/zenithGrayLogo.png";
import ChartImageOne from "../../assets/Images/chart-image-one.svg";
import ChartImageTwo from "../../assets/Images/chart-image-two.svg";
import ChartImageThree from "../../assets/Images/chart-image-three.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export const BannerLogin = () => {
  return (
    <div className="bg-[#2D60FF] hidden xl:block w-[50%] h-[740px] relative rounded-tr-[30px] rounded-br-[30px]">
      {/* Logo Zenith original */}
      <Image
        className="absolute left-[83%] top-[3%]"
        src={zenithGrayLogo}
        alt="Zenith Logo"
      />

      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("Slide mudou!")}
        onSwiper={(swiper) => console.log(swiper)}
        className='mt-40'
        modules={[Autoplay]}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        speed={600}
        loop={true}
        loopAdditionalSlides={0}
      >
        <SwiperSlide>
          <div className="relative w-full h-[400px]">
            <Image
              src={ChartImageOne}
              alt="Image Banner One"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-[400px]">
            <Image
              src={ChartImageTwo}
              alt="Image Banner Two"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-[400px]">
            <Image
              src={ChartImageThree}
              alt="Image Banner Two"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div >
  );
};
