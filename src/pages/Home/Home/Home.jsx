import React, { createContext, useState } from "react";
import Header from "../Header/Header";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import PopularClasses from "../PopularClasses/PopularClasses";
import Testimonial from "../Testimonials/Testimonial";
import Comment from "../Comment/Comment";
import useTitle from "../../../Hook/UseTitle";

export const TestimonialContext = createContext(null);
const Home = () => {
  useTitle("Home")
  const [reFetch, setRefetch] = useState(true);

  const info = {
    setRefetch,
    reFetch,
  };
  return (
    <div>
      <Header></Header>
      <PopularClasses></PopularClasses>
      <PopularInstructor></PopularInstructor>
      <TestimonialContext.Provider value={info}>
        <Testimonial></Testimonial>
        <Comment></Comment>
      </TestimonialContext.Provider>
    </div>
  );
};

export default Home;
