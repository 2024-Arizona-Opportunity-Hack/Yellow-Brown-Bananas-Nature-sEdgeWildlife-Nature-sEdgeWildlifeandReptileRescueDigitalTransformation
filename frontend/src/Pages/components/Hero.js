import { useEffect, useState } from "react";
import { MouseParallax } from "react-just-parallax";

import PlusSvg from "./assets/svg/PlusSvg";
import BirdSvg from "./assets/svg/BirdSvg"

// import {PlusSvg} from "../assets/svg/PlusSvg"

export const Gradient = () => {
  return (
    <>
      <div
        className="relative z-1 h-6 mx-2.5 bg-gradient-to-r from-green-600 via-blue-900 to-green-900 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-8"
      />
      <div
        className="relative z-1 h-6 mx-6 bg-gradient-to-r from-green-600 via-blue-900 to-green-900 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-20"
      />
    </>
  );
  
};

export const BottomLine = () => {
  return (
    <>
      <div className="hidden absolute top-[55.25rem] left-10 right-10 h-0.25 bg-n-6 pointer-events-none xl:block" />

      <PlusSvg className="hidden absolute top-[54.9375rem] left-[2.1875rem] z-2 pointer-events-none xl:block" />

      <PlusSvg className="hidden absolute top-[54.9375rem] right-[2.1875rem] z-2 pointer-events-none xl:block" />
    </>
  );
};



export const BackgroundBirds = ({ parallaxRef }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute -top-[42.375rem] left-1/2 w-[78rem] aspect-square border border-n-2/5 rounded-full -translate-x-1/2 md:-top-[38.5rem] xl:-top-[32rem]">
      {/* <img
      src={clouds}
      alt="Background Clouds"
      className="absolute inset-0 w-full h-full object-cover opacity-5"
    /> */}
      <MouseParallax strength={0.08} parallaxContainerRef={parallaxRef}>

      
      <BirdSvg
        className={`absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-out ${
          mounted ? "translate-y-0 opacity-50" : "translate-y-10 opacity-0"
        }`}
      />

      <BirdSvg
        className={`absolute top-1/4 right-1/3 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-out ${
          mounted ? "translate-y-0 opacity-50" : "translate-y-10 opacity-0"
        }`}
      />

      <BirdSvg
        className={`absolute top-1/3 left-1 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-out ${
          mounted ? "translate-y-0 opacity-50" : "translate-y-10 opacity-0"
        }`}
      />

      <BirdSvg
        className={`absolute top-1/2 right-1 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-out ${
          mounted ? "translate-y-0 opacity-50" : "translate-y-10 opacity-0"
        }`}
      />

      </MouseParallax>
    </div>
  );
};

