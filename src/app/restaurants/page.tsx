"use client";

export default function RestaurantsPage() {
  return (
    <div style={{ padding: 24, maxWidth: 700, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>Kimberly Restaurants</h1>
      <p style={{ marginBottom: 24 }}>Explore our selection of restaurants offering diverse cuisines and exceptional dining experiences in Coorg. More details coming soon!</p>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Contact</h2>
        <ul>
          <li><b>Phone:</b> +91 88670 60708</li>
          <li><b>Email:</b> restaurants@kimberlycoorg.com</li>
        </ul>
      </section>
    </div>
  );
}