import { Button } from "@/components/ui/button";
import Link from "next/link";
import Container from "../shared/Container";

const AboutUs = () => {
  return (
    <section className="indexBottom">
      <div className="about_bg">
        <Container>
          <div className="max_width_about">
            <div>
              <h2 className="mt-20 mb-7 font-bold text-4xl">About Us</h2>
              <p className="text-xl">
                Enjoy Car Rental Enjoy Car Rental offers you a safe and reliable
                car rental service with and without a driver. We have been
                operating in the territory of Montenegro for 5 years, with more
                than 3000 satisfied clients. Enjoy Rent a Car offers you
                services, entrusted to a very experienced and professional staff
                that is available 24 hours a day.
              </p>

              <Link href="/about">
                <Button className="mt-7 mb-16 bg-red-700 text-white rounded text-xl font-medium">
                  Read More
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default AboutUs;
