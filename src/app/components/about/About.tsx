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
            Giới thiệu
          </h2>
        </div>
        <div className="pb-10 pt-3">
          <div>
            <p className="pt-5 text-xl">
              Xe Hôm Nay mang đến dịch vụ thuê xe an toàn và đáng tin cậy, với
              tùy chọn có hoặc không có tài xế. Với hơn 5 năm hoạt động, chúng
              tôi tự hào đã phục vụ hơn 3000 khách hàng hài lòng. Đội ngũ nhân
              viên chuyên nghiệp, giàu kinh nghiệm của Xe Hôm Nay luôn sẵn sàng
              phục vụ bạn 24/7.
            </p>
            <p className="pt-5 text-xl">
              Chúng tôi cung cấp dịch vụ thuê xe đa dạng, từ dòng xe phổ thông
              đến cao cấp. Tất cả các xe đều được trang bị điều hòa, thiết bị
              hiện đại nhất, và theo yêu cầu đặc biệt của khách hàng, chúng tôi
              cung cấp hệ thống GPS, thiết bị Wi-Fi cùng nhiều tiện ích khác. Xe
              Hôm Nay còn cung cấp dịch vụ đưa đón tại các thành phố trong và
              ngoài, đảm bảo trải nghiệm tiện lợi và linh hoạt.
            </p>
            <p className="pt-5 text-xl">
              Chúng tôi mang đến các gói thuê xe dài hạn với giá ưu đãi và điều
              kiện đặc biệt. Ngoài ra, dịch vụ đưa đón sân bay (Tivat,
              Podgorica, Cilipi) cũng được cung cấp để đáp ứng mọi nhu cầu của
              bạn.
            </p>
            <p className="pt-5 text-xl">
              Tất cả các dịch vụ và trải nghiệm của Xe Hôm Nay được thiết kế để
              mang lại cho bạn một hành trình đáng nhớ, cùng với sự tiện nghi,
              an toàn và nhanh chóng trong cuộc sống hàng ngày.
            </p>
            <p className="text-xl font-bold pt-5">
              Điều gì làm nên sự khác biệt của Xe Hôm Nay?
            </p>
            <ul className="pt-5 text-xl ml-8">
              <li
                style={{
                  listStyleType: "circle",
                }}
              >
                Dịch vụ thuê xe trực tiếp tại Xe Hôm Nay
              </li>
            </ul>
          </div>
        </div>
      </Container>
      {/*about middle*/}
      <div className={styles.about_middle}>
        <div className="max-w-[1400px] relative mx-auto xl:px-24 lg:px-20 md:px-18 sm:px-5 px-4 z-50">
          <div className="pt-11">
            <h2 className="text-3xl font-bold text-white">Điều kiện thuê xe</h2>
          </div>
          <div className="pt-1 pb-4 border-b">
            <p className="text-base text-white">Điều kiện thuê xe:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-5">
            <div className="left">
              <div className="flex gap-3 pt-7">
                <CircleCheckBig color="red" />
                <p className="text-base text-white">Xe mới</p>
              </div>
              <div className="flex gap-3 pt-7">
                <CircleCheckBig color="red" />
                <p className="text-base text-white">
                  Phí thuê xe tối thiểu là một ngày (24 giờ)
                </p>
              </div>
              <div className="flex gap-3 pt-7">
                <CircleCheckBig color="red" />
                <p className="text-base text-white">
                  Tuổi thiểu nhất để thuê xe là 21 tuổi
                </p>
              </div>
              <div className="flex gap-3 pt-7">
                <CircleCheckBig color="red" />
                <p className="text-base text-white">
                  Phí thuê xe phải trả bằng tiền mặt hoặc thẻ tín dụng (VISA,
                  MASTER)
                </p>
              </div>
              <div className="flex gap-3 pt-7">
                <CircleCheckBig color="red" />
                <p className="text-base text-white">
                  Khoảng cách không giới hạn trong lãnh thổ
                </p>
              </div>
              <div className="flex gap-3 pt-7">
                <CircleCheckBig color="red" />
                <p className="text-base text-white">
                  Giá không bao gồm nhiên liệu
                </p>
              </div>
            </div>
            <div className="right">
              <div className="flex gap-3 pt-7">
                <CircleCheckBig color="red" />
                <p className="text-base text-white">
                  Khách hàng phải trả lại xe với cùng mức lượng nhiên liệu như
                  lúc nhận xe
                </p>
              </div>
              <div className="flex gap-3 pt-7">
                <CircleCheckBig color="red" />
                <p className="text-base text-white">
                  Không được phép vượt biên không có sự cho phép bằng văn bản
                </p>
              </div>
              <div className="flex gap-3 pt-7">
                <CircleCheckBig color="red" />
                <p className="text-base text-white">
                  Phí phạt cho việc đậu xe và giao thông là trách nhiệm của
                  khách hàng
                </p>
              </div>
              <div className="flex gap-3 pt-7">
                <CircleCheckBig color="red" />
                <p className="text-base text-white">
                  Trong trường hợp mất khóa hoặc giấy tờ, một khoản phạt của
                  5.000.000 VND phải được trả
                </p>
              </div>
              <div className="flex gap-3 pt-7">
                <CircleCheckBig color="red" />
                <p className="text-base text-white">
                  Giá thuê xe được cung cấp cho thuê dài hạn
                </p>
              </div>
              <div className="flex gap-3 pt-7">
                <CircleCheckBig color="red" />
                <p className="text-base text-white">
                  Chỉ người được chỉ định trong Hợp đồng thuê xe được phép lái
                  xe thuê
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
                <h2 className="mt-20 mb-7 font-bold text-4xl">Về chúng tôi</h2>
                <p className="text-xl">
                  Chúng tôi có nhiều xe, xe cao cấp và xe tiêu chuẩn. Bạn có thể
                  chọn, và chúng tôi sẽ làm toàn bộ thủ tục. Bạn sẽ nhận được
                  câu trả lời ngay lập tức cho thắc mắc của bạn, và bạn có thể
                  chọn giữa các mẫu xe mới nhất, Toyota, Volkswagen, Mercedes,
                  Škoda, Peugeot, Seat, Reno, dễ dàng và đơn giản, nhờ vào nền
                  tảng Xe Hôm Nay.
                </p>

                <Link href="/rent-car">
                  <Button className="mt-7 mb-16 bg-red-700 text-white rounded text-xl font-medium">
                    Xem thêm
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
