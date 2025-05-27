"use client";

export default function EventsPage() {
  return (
    <div style={{ padding: 24, maxWidth: 700, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>Events at Kimberly</h1>
      <p style={{ marginBottom: 24 }}>Stay tuned for upcoming events at Kimberly Coorg Cafe. Check back soon for updates on live music, food festivals, and community gatherings!</p>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Contact</h2>
        <ul>
          <li><b>Phone:</b> +91 88670 60708</li>
          <li><b>Email:</b> info@kimberlycoorg.com</li>
        </ul>
      </section>
    </div>
  );
}