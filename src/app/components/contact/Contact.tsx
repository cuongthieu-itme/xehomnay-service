import Container from "../shared/Container";

export default function ContactPage() {
  return (
    <section>
      <Container>
        <div className="pb-2">
          <h2 className="mt-16 pb-2 mb-3 border-b border-b-red-600 text-3xl font-bold">
            Liên Hệ Với Xe Hôm Nay
          </h2>
        </div>
        <div className="pb-10 pt-2">
          <div>
            <p className="pt-2 text-xl">
              Ghé thăm văn phòng của Xe Hôm Nay tại khu vực vòng xuyến Kotor,
              Montenegro. Từ đây, bạn chỉ mất 5 phút đi bộ để đến khu phố cổ,
              bưu điện hoặc bến xe buýt, vô cùng thuận tiện.
            </p>
            <p className="pt-2 text-xl font-medium">
              Giờ làm việc: Mỗi ngày từ 08:00 đến 16:00.
            </p>
          </div>
        </div>
      </Container>
      <div className="pt-2 pb-2">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.263470247761!2d105.79514427613756!3d21.022141380625445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab5b11165781%3A0x728544fffce35ed6!2zTmfDtSAyNTMgxJAuIE5ndXnhu4VuIEtoYW5nLCBZw6puIEhvw6AsIEPhuqd1IEdp4bqleSwgSMOgIE7hu5lpLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1753719025024!5m2!1sen!2s"
          width="100%"
          height="450"
          style={{
            border: 0,
          }}
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}
