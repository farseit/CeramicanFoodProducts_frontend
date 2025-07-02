"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import axios from "axios";
import Link from "next/link";
import HighlightsProducts from "./HighlightsProducts";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const banners = [
  { id: 1, href: "products/product-info/3", image: "/img/Display/left.png" },
  { id: 2, href: "products/product-info/4", image: "/img/Display/right1.png" },
  { id: 3, href: "products/product-info/5", image: "/img/Display/right2.png" },
  { id: 4, href: "products/product-info/6", image: "/img/Display/left2.png" },
];

const Hero = () => {
  // const [heroBanners, setHeroBanners] = useState([]);
  // const fetchHeroBanner = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Banner/all`
  //     );
  //     setHeroBanners(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchHeroBanner();
  // }, []);

  // console.log(heroBanners);
  return (
    <section className="w-full pt-6 pb-0">
      <div className=" container mx-auto px-4 ">
        <div className=" ">
          <div>
            <Swiper
              style={{
                // "--swiper-navigation-color": "#192a56",
                "--swiper-navigation-size": "30px",
              }}
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="h-[200px] md:h-[300px] lg:h-[400px] "
            >
              {/* banner will be changed with heroBanners */}
              {banners.map((header) => (
                <SwiperSlide key={header.id}>
                  <Link href={header.href}>
                    <Image
                      src={header.image}
                      width={800}
                      height={400}
                      alt="Banner1"
                      className="w-full h-full rounded-lg object-cover"
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* Highlights products */}
          <HighlightsProducts />
        </div>
      </div>
    </section>
  );
};

export default Hero;

{
  /* <div className="lg:col-span-3  hidden lg:block">
          <Categories />
        </div> */
}
