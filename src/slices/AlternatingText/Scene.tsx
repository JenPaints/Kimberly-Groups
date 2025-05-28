"use client";
import { Environment } from "@react-three/drei";
import { useRef, useState } from "react";
import { Group } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import StaticLogo from "@/components/StaticLogo"; // You'll need to create this component
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Scene() {
  const logoRef = useRef<Group>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);
  
  // Track current logo index - start with 3.jpeg (index 0 in reordered array)
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  
  const bgColors = ["#FAFAF9", "#FAFAF9", "#FAFAF9"];
  
  // Define your 3 logo images here (relative to public folder)
  // Order: 3.jpeg (start) -> 2.jpeg (right to left) -> 1.jpeg (left to right) -> repeat
  const logos = [
    "/3.JPEG", // Index 0 - Starting logo
    "/2.JPEG", // Index 1 - Right to left movement
    "/1.JPEG"  // Index 2 - Left to right movement
  ];

  useGSAP(
    () => {
      if (!logoRef.current) return;

      const sections = gsap.utils.toArray(".alternating-section");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".alternating-text-view",
          endTrigger: ".alternating-text-container",
          pin: true,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      sections.forEach((_, index) => {
        if (!logoRef.current) return;
        
        const isOdd = index % 2 !== 0;
        const xPosition = isDesktop ? (isOdd ? "-1" : "1") : 0;
        const yRotation = isDesktop ? (isOdd ? ".4" : "-.4") : 0;
        
        // Calculate which logo to show - cycle through all 3 logos
        const logoIndex = index % logos.length;
        
        if (index === 0) {
          // Set initial logo without animation
          scrollTl.call(() => {
            setCurrentLogoIndex(logoIndex);
          });
          return;
        }
        
        scrollTl
          .to(logoRef.current.position, {
            x: xPosition,
            ease: "circ.inOut",
            delay: 0.5,
          })
          .to(
            logoRef.current.rotation,
            {
              y: yRotation,
              ease: "back.inOut",
            },
            "<",
          )
          .to(".alternating-text-container", {
            backgroundColor: gsap.utils.wrap(bgColors, index),
          })
          .call(() => {
            // Change logo when animation reaches this point
            setCurrentLogoIndex(logoIndex);
          });
      });
    },
    { dependencies: [isDesktop] },
  );

  return (
    <group
      ref={logoRef}
      position-x={isDesktop ? 1 : 0}
      rotation-y={isDesktop ? -0.3 : 0}
    >
      <StaticLogo src={logos[currentLogoIndex]} />
      <Environment files={"/hdr/lobby.hdr"} environmentIntensity={1.5} />
    </group>
  );
}