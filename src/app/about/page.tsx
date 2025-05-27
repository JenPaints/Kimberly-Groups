"use client";

export default function AboutPage() {
  return (
    <div style={{ padding: 24, maxWidth: 700, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>About Kimberly Coorg Cafe</h1>
      <p style={{ marginBottom: 24 }}>
        Kimberly Coorg Cafe is a beloved destination in Madikeri, Karnataka, known for its inviting ambience, high-quality coffee, and diverse menu. Our mission is to provide a memorable experience for every guest, whether you're here for a hearty breakfast, a relaxing cup of coffee, or to explore our real estate and event offerings.
      </p>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Our Story</h2>
        <p>
          Established beside the iconic Raja's Seat, Kimberly Coorg Cafe has become a local favorite for both residents and visitors. We pride ourselves on friendly service, cleanliness, and a menu that celebrates both local and international flavors.
        </p>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Contact Us</h2>
        <ul>
          <li><b>Address:</b> Survey 116/2, Ward 11, Block 13, Rajaseat Road, Stuart Hill, Madikeri, Karnataka 571201, India</li>
          <li><b>Phone:</b> +91 88670 60708</li>
          <li><b>Email:</b> info@kimberlycoorg.com</li>
        </ul>
      </section>
    </div>
  );
}