import Container from "../shared/Container";
import SlickSlider from "./SlickSlider";

const CarSection = ({ cars }: any) => {
  return (
    <section className="mb-10 relative">
      <Container>
        <h2 className="mt-16 mb-5 pb-5 font-bold text-3xl border-b-[1px] border-red-700">
          Our Cars
        </h2>
      </Container>
      {/* slick slider */}
      <SlickSlider cars={cars} />
    </section>
  );
};

export default CarSection;
