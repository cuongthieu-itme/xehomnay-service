import { Button } from "@/components/ui/button";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";
import Container from "../shared/Container";
import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <section>
      <Container>
        <div className="pb-2">
          <h2 className="mt-16 pb-2 mb-5 border-b border-b-red-600 text-3xl font-bold">
            About us
          </h2>
        </div>
        <div className="pb-10 pt-3">
          <div>
            <p className="pt-5 text-xl">
              Enjoy Car Rental Enjoy Car Rental offers you a safe and reliable
              car rental service with and without a driver. We have been
              operating in the territory of Montenegro for 5 years, with more
              than 3000 satisfied clients. Enjoy Rent a Car offers you services,
              entrusted to a very experienced and professional staff that is
              available 24 hours a day.
            </p>
            <p className="pt-5 text-xl">
              We also offer car rental services from the lowest category to
              premium class. All vehicles are air conditioned, equipped with the
              highest level of equipment, and at the special request of clients
              we provide GPS system, WI-FI devices and much more. Enjoy Rent a
              Car, as part of its business, top services and top cars, offers
              return and pick-up services in other cities, both in Montenegro
              and abroad.
            </p>
            <p className="pt-5 text-xl">
              We offer long-term rentals at special prices and conditions. We
              also offer airport transfers (Tivat, Podgorica, Cilipi).
            </p>
            <p className="pt-5 text-xl">
              All our experiences and offers are created to make your
              unforgettable trip and everyday life in Montenegro easier, more
              comfortable, safer and faster with Enjoy Rent a Car.
            </p>
            <p className="text-xl font-bold pt-5">
              What makes Enjoy different?
            </p>
            <ul className="pt-5 text-xl ml-8">
              <li
                style={{
                  listStyleType: "circle",
                }}
              >
                Direct car rental in Montenegro
              </li>
            </ul>
          </div>
        </div>
      </Container>
      {/*about middle*/}
      <div className={styles.about_middle}>
        <div className="max-w-[1400px] relative mx-auto xl:px-24 lg:px-20 md:px-18 sm:px-5 px-4 z-50">
          <div className="pt-11">
            <h2 className="text-3xl font-bold text-white">Rental conditions</h2>
          </div>
          <div className="pt-1 pb-4 border-b">
            <p className="text-base text-white">
              The following rental conditions apply:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-5">
            <div className="left">
              <div className="flex gap-3 pt-7">
                <CircleCheckBig color="red" />
                <p className="text-base text-white">The vehicles are new</p>
              </div>
              <div className="flex gap-3 pt-7">
                <CircleCheckBig color="red" />
                <p className="text-base text-white">
                  The minimum rental fee is one day (24 h)
                </p>
              </div>
              <div className="flex gap-3 pt-7">
                <CircleCheckBig color="red" />
                <p className="text-base text-white">
                  The minimum age of the driver is 21 years
                </p>
              </div>
              <div className="flex gap-3 pt-7">
                <CircleCheckBig color="red" />
                <p className="text-base text-white">
                  Rental costs must be paid in cash or by credit card (VISA,
                  MASTER)
                </p>
              </div>
              <div className="flex gap-3 pt-7">
                <CircleCheckBig color="red" />
                <p className="text-base text-white">
                  Unlimited mileage for the territory of Montenegro
                </p>
              </div>
              <div className="flex gap-3 pt-7">
                <CircleCheckBig color="red" />
                <p className="text-base text-white">
                  Fuel is not included in the price
                </p>
              </div>
            </div>
            <div className="right">
              <div className="flex gap-3 pt-7">
                <CircleCheckBig color="red" />
                <p className="text-base text-white">
                  The customer is obliged to return the vehicle with the same
                  fuel level as during the takeover
                </p>
              </div>
              <div className="flex gap-3 pt-7">
                <CircleCheckBig color="red" />
                <p className="text-base text-white">
                  Crossing the state border is not allowed without the written
                  permission of Piano Rent a Car
                </p>
              </div>
              <div className="flex gap-3 pt-7">
                <CircleCheckBig color="red" />
                <p className="text-base text-white">
                  Penalties for parking and traffic are the responsibility of
                  the client
                </p>
              </div>
              <div className="flex gap-3 pt-7">
                <CircleCheckBig color="red" />
                <p className="text-base text-white">
                  In case of lost keys or documents, a fine of € 500.00 must be
                  paid
                </p>
              </div>
              <div className="flex gap-3 pt-7">
                <CircleCheckBig color="red" />
                <p className="text-base text-white">
                  Special prices are provided for long-term rent
                </p>
              </div>
              <div className="flex gap-3 pt-7">
                <CircleCheckBig color="red" />
                <p className="text-base text-white">
                  Only persons specified in the Car Rental Agreement may drive
                  the rented car
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*bottom section*/}
      <div className={styles.indexBottom}>
        <div className={styles.about_bg}>
          <Container>
            <div className={styles.max_width_about}>
              <div>
                <h2 className="mt-20 mb-7 font-bold text-4xl">About Us</h2>
                <p className="text-xl">
                  We have a large number of cars, premium and standard class.
                  It&apos;s up to you to choose, and we do the whole procedure.
                  You get an immediate answer to your doubts, and you can choose
                  between the latest models, Toyota, Volkswagen, Mercedes,
                  Škoda, Peugeot, Seat, Reno, easily and simply, thanks to the
                  Enjoy platform.
                </p>

                <Link href="/rent-car">
                  <Button className="mt-7 mb-16 bg-red-700 text-white rounded text-xl font-medium">
                    Read More
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
