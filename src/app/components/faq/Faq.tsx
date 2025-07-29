import Container from "../shared/Container";

export default function FaqPage() {
  return (
    <section>
      <Container>
        <div className="pb-2">
          <h2 className="mt-16 pb-2 mb-3 border-b border-b-red-600 text-3xl font-bold">
            Câu Hỏi Thường Gặp - Xe Hôm Nay
          </h2>
        </div>
        <div className="pb-10 pt-2">
          <div>
            <p className="pt-2 text-xl">
              Khi lần đầu sử dụng dịch vụ thuê xe của Xe Hôm Nay, nhiều khách
              hàng thường có những thắc mắc về quy trình, điều kiện thuê xe hoặc
              các dịch vụ đi kèm. Mỗi công ty thuê xe có những đặc điểm riêng,
              và chúng tôi ở đây để giải đáp các câu hỏi phổ biến nhất, giúp bạn
              an tâm trải nghiệm dịch vụ của Xe Hôm Nay.
            </p>
          </div>
        </div>
        <div className="pt-2 pb-10">
          <h3 className="text-2xl text-red-700 font-semibold">
            1. Hợp đồng thuê xe của Xe Hôm Nay bao gồm những gì?
          </h3>
          <p className="pt-3 text-base">
            Khi nhận xe, bạn sẽ ký hợp đồng thuê xe, trong đó nêu rõ các điều
            khoản đã thỏa thuận, bao gồm giá thuê, thông tin chi tiết về xe,
            thông tin tài xế (nếu có) và thông tin người hoặc công ty thanh
            toán. Sau khi ký hợp đồng, bạn được phép sử dụng xe và chịu trách
            nhiệm với xe trong suốt thời gian thuê.
          </p>
          <h3 className="text-2xl text-red-700 font-semibold">
            2. Tôi cần những giấy tờ gì để thuê xe?
          </h3>
          <p className="pt-3 text-base">
            Để thuê xe tại Xe Hôm Nay, bạn cần cung cấp giấy phép lái xe hợp lệ,
            chứng minh nhân dân hoặc hộ chiếu, và một phương thức thanh toán
            (tiền mặt hoặc thẻ). Đối với khách hàng quốc tế, có thể yêu cầu thêm
            giấy phép lái xe quốc tế tùy theo quy định.
          </p>
          <h3 className="text-2xl text-red-700 font-semibold">
            3. Xe của Xe Hôm Nay có những loại nào?
          </h3>
          <p className="pt-3 text-base">
            Chúng tôi cung cấp đa dạng các dòng xe, từ xe phổ thông tiết kiệm
            đến xe cao cấp sang trọng. Tất cả xe đều được trang bị điều hòa,
            thiết bị hiện đại, và có thể đi kèm GPS, Wi-Fi theo yêu cầu để đảm
            bảo trải nghiệm thoải mái nhất.
          </p>
          <h3 className="text-2xl text-red-700 font-semibold">
            4. Xe Hôm Nay có dịch vụ đưa đón sân bay không?
          </h3>
          <p className="pt-3 text-base">
            Có, chúng tôi cung cấp dịch vụ đưa đón sân bay tại các sân bay lớn
            như Tivat, Podgorica và Cilipi. Dịch vụ này được thiết kế để đảm bảo
            sự tiện lợi và đúng giờ cho hành trình của bạn.
          </p>
          <h3 className="text-2xl text-red-700 font-semibold">
            5. Làm thế nào để thuê xe dài hạn?
          </h3>
          <p className="pt-3 text-base">
            Xe Hôm Nay cung cấp các gói thuê xe dài hạn với giá ưu đãi đặc biệt.
            Bạn chỉ cần liên hệ với chúng tôi để thảo luận về nhu cầu cụ thể,
            thời gian thuê và các điều kiện phù hợp.
          </p>
          <h3 className="text-2xl text-red-700 font-semibold">
            6. Tôi có thể thuê xe ở một thành phố và trả xe ở thành phố khác
            không?
          </h3>
          <p className="pt-3 text-base">
            Có, Xe Hôm Nay cung cấp dịch vụ nhận và trả xe linh hoạt tại nhiều
            thành phố. Vui lòng thông báo trước để chúng tôi sắp xếp phù hợp với
            lịch trình của bạn.
          </p>
        </div>
      </Container>
    </section>
  );
}
