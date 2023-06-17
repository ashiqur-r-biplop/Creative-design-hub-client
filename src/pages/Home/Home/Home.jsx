import React, { createContext, useState } from "react";
import Header from "../Header/Header";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import PopularClasses from "../PopularClasses/PopularClasses";
import Testimonial from "../Testimonials/Testimonial";
import Comment from "../Comment/Comment";
import useTitle from "../../../Hook/UseTitle";
import Upcoming from "../UpCommingClass/Upcoming";
import TopStudent from "../TopStudent/TopStudent";
import Counting from "../Counting/Counting";

export const TestimonialContext = createContext(null);
const Home = () => {
  useTitle("Home");
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
        <Upcoming></Upcoming>
        <TopStudent></TopStudent>
        <Counting></Counting>
        <Testimonial></Testimonial>
        <Comment></Comment>
      </TestimonialContext.Provider>
    </div>
  );
};

export default Home;
