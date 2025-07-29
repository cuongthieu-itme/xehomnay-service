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
              Xe Hôm Nay mang đến cho bạn dịch vụ thuê xe an toàn và đáng tin
              cậy, có hoặc không có tài xế. Với hơn 5 năm hoạt động tại
              Montenegro, chúng tôi tự hào đã phục vụ hơn 3000 khách hàng hài
              lòng.
            </p>
            <p className="mt-4 text-justify">
              Tất cả các dịch vụ và trải nghiệm của chúng tôi được thiết kế để
              giúp chuyến đi của bạn trở nên đáng nhớ, đồng thời mang lại sự
              tiện nghi, an toàn và nhanh chóng cho cuộc sống hàng ngày tại
              Montenegro cùng Xe Hôm Nay.
            </p>
          </div>
          <div className={styles.footer_center}>
            <div className={styles.footer_center_top}>
              <h3>Thông tin liên hệ</h3>
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
              <h3>Liên hệ với chúng tôi</h3>
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
            <h3>Gửi tin nhắn</h3>
            <ContactFrom />
          </div>
        </div>
        <div className={styles.copyright}>
          <p className="text-center text-white text-base">
            &copy; {new Date().getFullYear()} -{" "}
            <Link href={"/"} className="text-red-600 hover:underline">
              TTC
            </Link>{" "}
            - {"  "}
            All rights reserved
          </p>
        </div>
      </Container>
    </footer>
  );
}
