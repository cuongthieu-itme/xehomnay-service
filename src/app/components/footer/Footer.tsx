import {
  Facebook,
  Instagram,
  MailOpenIcon,
  MapPin,
  PhoneCall,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import Container from "../shared/Container";
import Logo from "../shared/Logo";
import ContactFrom from "./ContactFrom";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className="bg-[#0d0101]">
      <Container>
        <div className={styles.footer}>
          <div className={styles.footer_left}>
            <Logo />
            <p className="mt-4 text-justify">
              Enjoy Rent a Car offers you a safe and reliable Xe Hôm Nay service
              with and without a driver. We have been operating in the territory
              of Montenegro for 5 years, with more than 3000 satisfied clients.
            </p>
            <p className="mt-4 text-justify">
              All our experiences and offers are created to make your
              unforgettable trip and everyday life in Montenegro easier, more
              comfortable, safer and faster with Enjoy Rent a Car.
            </p>
          </div>
          <div className={styles.footer_center}>
            <div className={styles.footer_center_top}>
              <h3>Contact information</h3>
              <div className={styles.info}>
                <Link href="" className="text-white flex gap-1">
                  <MapPin size={24} className="text-red-500" />
                  10/253 Nguyễn Khang, Yên Hòa, Hà Nội
                </Link>
                <Link
                  href={`mailto:admin@admin.com`}
                  className="text-white flex gap-1"
                >
                  <MailOpenIcon size={24} className="text-red-500" />
                  thuexe@todaytravel.vn
                </Link>
                <Link
                  href={`tel:085.234.2525`}
                  className="text-white flex gap-1"
                >
                  <PhoneCall size={24} className="text-red-500" />
                  085.234.2525
                </Link>
              </div>
            </div>
            <div className={styles.footer_center_bottom}>
              <h3>Follow Us</h3>
              <div className="flex pt-4 gap-2">
                <Link
                  href={""}
                  className="border border-red-500 p-1 rounded-[10px] text-white hover:bg-blue-700 hover:border-blue-700"
                  title="Facebook"
                  target="_blank"
                >
                  <Facebook size={24} />
                </Link>
                <Link
                  href={""}
                  className="border border-red-500 p-1 rounded-[10px] text-white hover:bg-sky-600 hover:border-sky-600"
                  title="Twitter"
                  target="_blank"
                >
                  <Twitter size={24} />
                </Link>
                <Link
                  href={""}
                  className="border border-red-500 p-1 rounded-[10px] text-white hover:bg-red-700 hover:border-red-700"
                  title="Instagram"
                  target="_blank"
                >
                  <Instagram size={24} />
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.footer_right}>
            <h3>Send us a message</h3>
            <ContactFrom />
          </div>
        </div>
        <div className={styles.copyright}>
          <p className="text-center text-white text-base">
            &copy; {new Date().getFullYear()} -{" "}
            <Link href={"/"} className="text-red-600 hover:underline">
              Team SDP4
            </Link>{" "}
            - {"  "}
            All rights reserved
          </p>
        </div>
      </Container>
    </footer>
  );
}
