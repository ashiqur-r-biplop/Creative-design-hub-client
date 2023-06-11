import React, { useContext, useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
import { TestimonialContext } from "../Home/Home";

import "@smastrom/react-rating/style.css";
import { Rating, Star } from "@smastrom/react-rating";
const myStyles = {
  itemShapes: Star,
  activeFillColor: "#32c770",
  inactiveFillColor: "#d8d8d8",
};

const Testimonial = () => {
  const { setRefetch, reFetch } = useContext(TestimonialContext);
  const [reviewData, setReviewData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/myComment")
      .then((res) => res.json())
      .then((data) => setReviewData(data));
  }, [reFetch]);
  return (
    <div className="container mx-auto">
      {" "}
      <h1 className="text-center text-2xl md:text-4xl lg:text-5xl font-semibold my-5 md:mt-20 mb-12">
        Our <span className="text-[#1dcdbc]">Testimonial</span>
      </h1>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviewData.map((review, i) => (
          <SwiperSlide key={i} className="py-5 mx-auto text-center">
            <div className="flex flex-col justify-center items-center">
              <div className="rounded-full w-20 h-20 mx-auto">
                <img className="rounded-full" src={review?.Photo} alt="" />
              </div>
              <p>{review?.name}</p>
              <Rating
                style={{ maxWidth: 100 }}
                className="ms-2"
                value={review?.ratings}
                itemStyles={myStyles}
                readOnly
              />
              <p className="md:w-1/2 px-9 md:px-0 mx-auto">{review?.comments}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
