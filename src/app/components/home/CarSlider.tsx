/* eslint-disable @next/next/no-img-element */
"use client";
import { convertPrice } from "@/lib/price";
import { carSliderData } from "@/lib/utils";
import { Button } from "@mantine/core";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const CarSlider = () => {
  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={true}
      responsive={responsive}
      ssr={true}
      infinite={true}
      autoPlay={false}
      autoPlaySpeed={5000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType={"desktop"}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {carSliderData.map((car, i) => (
        <div className="relative text-center md:text-left" key={i}>
          <img
            src={car.image}
            alt={car.name}
            className="w-full px-4 md:px-0 h-48 md:h-96 object-cover"
          />
          <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 w-full">
            <h3 className="text-white text-3xl font-bold">{car?.name}</h3>
            <h4 className="text-red-600 text-xl font-bold">{car.system}</h4>
          </div>
          <div className="px-4 mt-16 md:mt-0 md:px-0 mb-10 flex items-center justify-center md:justify-start">
            <Button
              variant="gradient"
              className=" text-white text-xl py-2 px-10 border border-white rounded"
            >
              Đặt ngay
            </Button>
            <Button className="bg-transparent text-xl text-white py-2 px-4 border border-white rounded ml-2">
              Từ {convertPrice(car.price)} /ngày
            </Button>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CarSlider;
