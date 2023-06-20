import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import CountUp from "react-countup";
import { FcMoneyTransfer } from "react-icons/fc";
import { TestimonialContext } from "../Home/Home";

const Counting = () => {
  const [count, setCount] = useState({});
  const { reFetch } = useContext(TestimonialContext);
  useEffect(() => {
    fetch("https://creativa-design-hub-server-site.vercel.app/overView")
      .then((res) => res.json())
      .then((data) => setCount(data));
  }, [reFetch]);
  return (
    <>
      <div className="lg:relative">
        <div className="counting-section lg:h-screen text-white z-0"></div>
        <div className="flex justify-center items-center z-10 lg:absolute lg:top-[40%] mx-auto w-full lg:h-1/6">
          <div className="container mx-auto h-full">
            <div
              className="bg-white h-full lg:flex items-center justify-center py-5 px-5 text-center rounded-lg"
              data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="1500"
            >
              <div className="">
                <div className="lg:flex items-center w-full text-3xl font-bold">
                  <p className="flex items-center justify-center">
                    <span className="text-5xl">
                      <FcMoneyTransfer />
                    </span>{" "}
                    <span className="ps-5 lg:flex block items-center text-center">
                      Revenue <span className="hidden lg:block lg:pe-2">:</span>
                    </span>
                  </p>
                  <CountUp start={0} end={count?.Revenue} delay={2}>
                    {({ countUpRef }) => (
                      <div>
                        <span ref={countUpRef} />
                      </div>
                    )}
                  </CountUp>
                </div>
              </div>
              <div className="divider lg:divider-horizontal"></div>
              <div className="">
                <div className="lg:flex items-center w-full text-3xl">
                  <p className="ps-5 lg:flex items-center w-full text-center">
                    Active User{" "}
                    <span className="hidden lg:block lg:pe-2">: </span>
                  </p>
                  <CountUp start={0} end={count?.activeUser} delay={2}>
                    {({ countUpRef }) => (
                      <div>
                        <span ref={countUpRef} />
                      </div>
                    )}
                  </CountUp>
                </div>
              </div>
              <div className="divider lg:divider-horizontal"></div>
              <div className="">
                <div className="lg:flex items-center w-full text-3xl">
                  <p className="ps-5 lg:flex items-center w-full text-center">
                    Active Student{" "}
                    <span className="hidden lg:block lg:pe-2">: </span>
                  </p>
                  <CountUp start={0} end={count?.activeStudent} delay={2}>
                    {({ countUpRef }) => (
                      <div>
                        <span ref={countUpRef} />
                      </div>
                    )}
                  </CountUp>
                </div>
              </div>
              <div className="divider lg:divider-horizontal"></div>
              <div className="">
                <div className="lg:flex items-center w-full text-3xl">
                  <p className="ps-5 lg:flex items-center w-full text-center">
                    Review <span className="hidden lg:block lg:pe-2">: </span>
                  </p>
                  <CountUp start={0} end={count?.Review} delay={2}>
                    {({ countUpRef }) => (
                      <div>
                        <span ref={countUpRef} />
                      </div>
                    )}
                  </CountUp>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Counting;
