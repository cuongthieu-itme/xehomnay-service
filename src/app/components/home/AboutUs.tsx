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
              <h2 className="mt-20 mb-7 font-bold text-4xl">Về chúng tôi</h2>
              <p className="text-xl">
                Tại Xe Hôm Nay, chúng tôi mang đến dịch vụ thuê xe an toàn, đáng
                tin cậy và linh hoạt, với tùy chọn có hoặc không có tài xế. Với
                hơn 5 năm kinh nghiệm hoạt động tại Montenegro, chúng tôi tự hào
                đã phục vụ hơn 3000 khách hàng hài lòng. Dịch vụ của Xe Hôm Nay
                được vận hành bởi đội ngũ nhân viên chuyên nghiệp, giàu kinh
                nghiệm và luôn sẵn sàng hỗ trợ bạn 24/7. Hãy để chúng tôi đồng
                hành cùng bạn, mang lại trải nghiệm di chuyển thoải mái và trọn
                vẹn nhất!
              </p>

              <Link href="/about">
                <Button className="mt-7 mb-16 bg-red-700 text-white rounded text-xl font-medium">
                  Xem thêm
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
