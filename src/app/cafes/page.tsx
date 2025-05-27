"use client";

export default function CafesPage() {
  return (
    <div style={{ padding: 24, maxWidth: 700, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>Kimberly Coorg Cafe</h1>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>📍 Location & Contact</h2>
        <ul>
          <li><b>Address:</b> Survey 116/2, Ward 11, Block 13, Rajaseat Road, Stuart Hill, Madikeri, Karnataka 571201, India</li>
          <li><b>Phone:</b> +91 88670 60708</li>
          <li><b>Nearby Landmark:</b> Beside Raja's Seat</li>
        </ul>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>🕒 Operating Hours</h2>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: 4 }}>Day</th>
              <th style={{ border: "1px solid #ccc", padding: 4 }}>Opening Hours</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ border: "1px solid #ccc", padding: 4 }}>Monday</td><td style={{ border: "1px solid #ccc", padding: 4 }}>7:00 AM – 9:30 PM</td></tr>
            <tr><td style={{ border: "1px solid #ccc", padding: 4 }}>Tuesday</td><td style={{ border: "1px solid #ccc", padding: 4 }}>7:00 AM – 9:30 PM</td></tr>
            <tr><td style={{ border: "1px solid #ccc", padding: 4 }}>Wednesday</td><td style={{ border: "1px solid #ccc", padding: 4 }}>7:30 AM – 9:30 PM</td></tr>
            <tr><td style={{ border: "1px solid #ccc", padding: 4 }}>Thursday</td><td style={{ border: "1px solid #ccc", padding: 4 }}>9:00 AM – 9:30 PM</td></tr>
            <tr><td style={{ border: "1px solid #ccc", padding: 4 }}>Friday</td><td style={{ border: "1px solid #ccc", padding: 4 }}>9:00 AM – 9:30 PM</td></tr>
            <tr><td style={{ border: "1px solid #ccc", padding: 4 }}>Saturday</td><td style={{ border: "1px solid #ccc", padding: 4 }}>7:30 AM – 10:00 PM</td></tr>
            <tr><td style={{ border: "1px solid #ccc", padding: 4 }}>Sunday</td><td style={{ border: "1px solid #ccc", padding: 4 }}>7:30 AM – 10:30 PM</td></tr>
          </tbody>
        </table>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>🍽️ Cuisine & Offerings</h2>
        <ul>
          <li><b>Cuisines:</b> Chinese, Indian, Irish</li>
          <li><b>Beverages:</b> Coffee, Tea, Homemade Wines</li>
          <li><b>Specialties:</b> Naadi Kaapi (local specialty), English and Continental breakfast dishes</li>
          <li><b>Price Range:</b> ₹850 – ₹2,100 per person</li>
        </ul>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>🌟 Ratings & Reviews</h2>
        <ul>
          <li><b>Google:</b> 4.8/5 (based on 1,073 reviews)</li>
          <li><b>Tripadvisor:</b> 5.0/5 (based on 40 reviews)</li>
          <li><b>Zomato:</b> Dining - 3.8/5; Delivery - 3.8/5</li>
        </ul>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>📝 Customer Feedback</h2>
        <ul>
          <li><b>Positive Highlights:</b>
            <ul>
              <li>Praised for its ambience with double-height seating and city views.</li>
              <li>Noted for high-quality coffee and a variety of snacks.</li>
              <li>Recognized for friendly service and cleanliness.</li>
            </ul>
          </li>
          <li><b>Areas of Improvement:</b>
            <ul>
              <li>Some customers reported issues with service delays and billing discrepancies.</li>
              <li>Mixed reviews on food taste and quality, with some dishes described as bland or not meeting expectations.</li>
            </ul>
          </li>
        </ul>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>🔗 Online Presence</h2>
        <ul>
          <li><a href="https://www.tripadvisor.in/Restaurant_Review-g641714-d26309518-Reviews-Kimberly_Coorg_Cafe-Madikeri_Kodagu_Coorg_Karnataka.html" target="_blank" rel="noopener noreferrer">Tripadvisor: Kimberly Coorg Cafe</a></li>
          <li><a href="https://www.zomato.com/coorg/kimberly-coorg-cafe-madikeri" target="_blank" rel="noopener noreferrer">Zomato: Kimberly Coorg Cafe</a></li>
          <li><a href="https://instagram.com/kimberlycoorg" target="_blank" rel="noopener noreferrer">Instagram: @kimberlycoorg</a></li>
        </ul>
      </section>
    </div>
  );
}