import HeroContainer from "../shared/HeroContainer";
import CarReserveFrom from "./CarReserveFrom";
import CarSlider from "./CarSlider";

const HeroSection = () => {
  return (
    <section className="indexTop relative md:mt-[60px] ">
      <div className="background_Image">
        <HeroContainer>
          <div className="max_width relative">
            <div className="indexTop_Left z-10 relative">
              <h1 className="text-4xl mt-20 px-4 md:px-0 font-bold text-white">
                Chúc bạn có chuyến đi vui vẻ.
              </h1>
              <CarSlider />
            </div>
            <div className="indexTop_Right px-4 md:px-0">
              <CarReserveFrom />
            </div>
          </div>
        </HeroContainer>
      </div>
    </section>
  );
};

export default HeroSection;
