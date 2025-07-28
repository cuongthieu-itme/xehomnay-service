import Container from "../shared/Container";

export default function ContactPage() {
  return (
    <section>
      <Container>
        {" "}
        <div className="pb-2">
          <h2 className="mt-16 pb-2 mb-3 border-b border-b-red-600 text-3xl font-bold">
            Contact
          </h2>
        </div>
        <div className="pb-10 pt-2">
          <div>
            <p className="pt-2 text-xl">
              Visit us at our branch office on the roundabout in Kotor. The old
              town, post office and bus station are within a 5-minute walk from
              our location.
            </p>
            <p className="pt-2 text-xl font-medium">
              Working hours are every day from 08:00h to 16:00h.
            </p>
          </div>
        </div>
      </Container>
      <div className="pt-2 pb-2">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.345480383908!2d90.36326507402873!3d23.806310886630072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0d7668f38db%3A0x6cb6824a39fe443f!2sMirpur%20Stadium!5e0!3m2!1sen!2sbd!4v1725441388577!5m2!1sen!2sbd"
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
