"use client"

import { useEffect, useRef } from "react";

const dummyProducts = [
  { name: "Coffee Beans", desc: "Premium Arabica beans from Coorg.", price: "$15" },
  { name: "Espresso Mug", desc: "Ceramic mug for your daily espresso.", price: "$8" },
  { name: "T-Shirt", desc: "Soft cotton t-shirt with Kimberly branding.", price: "$20" },
  { name: "Gift Hamper", desc: "A curated selection of our best products.", price: "$40" },
];

export default function ProductsPage() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement|null>>([]);

  useEffect(() => {
    // Animate heading
    if (headingRef.current) {
      headingRef.current.style.opacity = "0";
      headingRef.current.style.transform = "translateY(-30px)";
      setTimeout(() => {
        if (headingRef.current) {
          headingRef.current.style.transition = "all 0.8s cubic-bezier(0.77,0,0.175,1)";
          headingRef.current.style.opacity = "1";
          headingRef.current.style.transform = "translateY(0)";
        }
      }, 100);
    }
    // Animate cards
    cardsRef.current.forEach((card, i) => {
      if (card) {
        card.style.opacity = "0";
        card.style.transform = "scale(0.95) translateY(30px)";
        setTimeout(() => {
          card.style.transition = "all 0.7s cubic-bezier(0.77,0,0.175,1)";
          card.style.opacity = "1";
          card.style.transform = "scale(1) translateY(0)";
        }, 400 + i * 180);
      }
    });
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "48px auto", padding: 24 }}>
      <h1 ref={headingRef} style={{ fontSize: 40, fontWeight: 700, textAlign: "center", marginBottom: 32, color: "#b91c1c", letterSpacing: 1 }}>
        Our Products
      </h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center" }}>
        {dummyProducts.map((prod, idx) => (
          <div
            key={prod.name}
            ref={el => {
              cardsRef.current[idx] = el;
            }}
            style={{
              width: 220,
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              padding: 24,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity: 0,
              transform: "scale(0.95) translateY(30px)",
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>{prod.name}</div>
            <div style={{ fontSize: 15, color: "#555", marginBottom: 16, textAlign: "center" }}>{prod.desc}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#b91c1c" }}>{prod.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}