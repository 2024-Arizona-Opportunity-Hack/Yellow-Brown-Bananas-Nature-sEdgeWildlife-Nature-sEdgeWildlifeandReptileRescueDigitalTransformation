import deer from "../components/assets/image/image.png";
import Section from "./Section";
import { BackgroundBirds, BottomLine, Gradient } from "./Hero";
import { ScrollParallax } from "react-just-parallax";
import { useRef } from "react";

const Hero = () => {
  const parallaxRef = useRef(null);

  return (
    <Section
      className="pt-[13rem] -mt-[5.25rem] flex flex-col items-center justify-center"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="aboutme"
    >
      <div className="container relative mx-auto flex flex-col items-center justify-center" ref={parallaxRef}>
        {/* Heading centered */}
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
            <h1 className="text-5xl font-bold text-gray-900 mb-10 text-center">
                Nature’s Edge Wildlife and Reptile Rescue
            </h1>
        </div>


        {/* Image centered */}
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient flex justify-center">
            <div className="relative bg-transparent/35 rounded-[1rem] flex justify-center">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />
              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490] mx-auto">
                <img
                  src={deer}
                  className="w-full scale-[1.5] translate-y-[1%] md:scale-[1] md:-translate-y-[1%] lg:-translate-y-[23%] mx-auto"
                  width={1240}
                  height={400}
                  alt="Deer"
                />

                <ScrollParallax isAbsolutelyPositioned>
                    <ul className="absolute -left-[8.5rem] bottom-[7.5rem] px-5 py-2 bg-white/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex w-[20rem] text-gray-900">      
                        Nature’s Edge Wildlife and Reptile Rescue is a 501(c)(3) non-profit wildlife 
                        rehabilitation facility and reptile rescue. We are state and federally permitted wildlife rehabilitators.
                    </ul>
                    <ul className="absolute -right-[8.5rem] bottom-[2rem] px-5 py-2 bg-white/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex w-[20rem] text-gray-900">      
                        We rehab all native reptiles, bats, birds of prey and mammals on a limited basis and will help with transport of other wildlife 
                        to permitted rehabilitators. We also conduct outreach education programs around DFW
                    </ul>
                </ScrollParallax>

                <ScrollParallax isAbsolutelyPositioned />
              </div>
            </div>
          </div>
          <Gradient />
          <BackgroundBirds />
        </div>
      </div>
      <ScrollParallax />
      <BottomLine />
    </Section>
  );
};

export default Hero;
