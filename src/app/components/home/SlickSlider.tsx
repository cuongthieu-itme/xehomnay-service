/* eslint-disable @next/next/no-img-element */
"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import { ghCurrencySymbol } from "@/const";
import Link from "next/link";
import "slick-carousel/slick/slick-theme.css";
import { convertPrice } from "@/lib/price";
const SlickSlider = ({ cars }: any) => {
  let settings = {
    dots: true,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    autoplay: false,
    speed: 500,
    autoplaySpeed: 2000,
    // cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {cars?.map((car: any, i: number) => (
          <div key={i} className="item">
            <div className="block w-full h-[420px] bg-white ml-auto mr-auto border border-gray-300 rounded-[20px] full_card">
              <div className="w-[40%] bg-[#cc0505] h-[25px] flex justify-center items-center price_border">
                <p className="text-white text-sm">
                  {convertPrice(car?.pricePerDay)}/Ngày
                </p>
              </div>
              <div className="ml-auto mr-auto pt-2 w-full max-w-[300px]">
                <img
                  src={car?.images[0]?.imageUrl}
                  alt="car"
                  className="w-full h-[200px] object-center max-w-[300px] object-contain "
                />
              </div>
              <div className="pl-5 pr-5">
                <div className="text-xl text-black pt-4">{car?.name}</div>
                <div className="text-xs red_color pb-2 capitalize">
                  {car?.transmission}
                </div>
                <div className="flex justify-between text-black text-sm pt-2">
                  <div>Kiểu dáng</div>
                  <div>{car?.bodyType}</div>
                </div>
                <div className="bg-[#e6e6e6] w-full h-[1px]"></div>
                <div className="flex justify-between text-black text-sm pt-2">
                  <div>Màu xe</div>
                  <div>{car?.color}</div>
                </div>
                <div className="bg-[#e6e6e6] w-full h-[1px]"></div>
                <div className="flex justify-between text-black text-sm pt-2">
                  <div>Sức chứa hành lý</div>
                  <div>{car?.bagsCapacity}</div>
                </div>
                <div className="bg-[#e6e6e6] w-full h-[1px]"></div>
                <div className="flex justify-between text-black text-xs pt-2">
                  <div>Điều hòa</div>
                  <div>{car?.acAvailable === true ? "Có" : "Không"}</div>
                </div>

                <div className="pt-5 hidden details_btn">
                  <Link href={`cars/${car?.slug}`} className="w-full">
                    <button className="bg-white text-[#cc0505] border border-red-600 rounded-[10px] flex justify-center items-center text-sm cursor-pointer w-full font-semibold h-[40px]">
                      Xem chi tiết
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlickSlider;
