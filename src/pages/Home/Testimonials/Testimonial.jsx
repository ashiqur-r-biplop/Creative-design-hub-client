import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { TestimonialContext } from "../Home/Home";
import "@smastrom/react-rating/style.css";
import { Rating, Star } from "@smastrom/react-rating";
import AOS from "aos";
import "aos/dist/aos.css";
const myStyles = {
  itemShapes: Star,
  activeFillColor: "#267E23",
  inactiveFillColor: "#d8d8d8",
};

const Testimonial = () => {
  AOS.init();
  const { setRefetch, reFetch } = useContext(TestimonialContext);
  const [reviewData, setReviewData] = useState([]);
  useEffect(() => {
    fetch("https://creativa-design-hub-server-site.vercel.app/myComment")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setReviewData(data)
      });
  }, [reFetch]);
  return (
    <div className="container mx-auto">
      {" "}
      <h1 className="section-title"  data-aos="fade-down-left">
        Our <span className="text-[#267E23]">Testimonial</span>
      </h1>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviewData.map((review, i) => (
          <SwiperSlide key={i} className="py-5 mx-auto text-center">
            <div className="flex flex-col justify-center items-center">
              <div className="rounded-full w-20 h-20 mx-auto">
                <img className="rounded-full" src={review?.Photo} alt="" />
              </div>
              <p className="font-semibold">{review?.name}</p>
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
