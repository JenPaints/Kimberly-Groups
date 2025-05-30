"use client";

import { asText, Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";
import type { JSX } from "react";

import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";

import { TextSplitter } from "@/components/TextSplitter";
import Navbar from "@/components/Navbar"; 
import Scene from "./Scene";
import { Bubbles } from "./Bubbles";
import { useStore } from "@/hooks/useStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";


gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const ready = useStore((state) => state.ready);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);
  const isMobile = useMediaQuery("(max-width: 767px)", false);

  useGSAP(
    () => {
      if (!ready && isDesktop) return;

      const introTl = gsap.timeline();

      if (isMobile) {
        // Mobile-specific intro animation
        introTl
          .set(".hero", { opacity: 1 })
          .from(".hero-header-word", {
            scale: 1.5,
            opacity: 0,
            rotateX: 90,
            transformOrigin: "center bottom",
            ease: "back.out(1.7)",
            stagger: 0.2,
          })
          .from(".hero-subheading", {
            opacity: 0,
            y: 20,
            scale: 0.9,
          }, "-=0.3")
          .from(".hero-body", {
            opacity: 0,
            y: 15,
            scale: 0.95,
          })
          .from(".hero-button", {
            opacity: 0,
            scale: 0.8,
            rotation: 5,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)"
          })
          .from(".mobile-hint", {
            opacity: 0,
            y: 10,
            duration: 0.8
          });
      } else {
        // Desktop animation (original)
        introTl
          .set(".hero", { opacity: 1 })
          .from(".hero-header-word", {
            scale: 3,
            opacity: 0,
            ease: "power4.in",
            delay: 0.3,
            stagger: 1,
          })
          .from(
            ".hero-subheading",
            {
              opacity: 0,
              y: 30,
            },
            "+=.8",
          )
          .from(".hero-body", {
            opacity: 0,
            y: 10,
          })
          .from(".hero-button", {
            opacity: 0,
            y: 10,
            duration: 0.6,
          });
      }

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      scrollTl
        .fromTo(
          "body",
          {
            backgroundColor: "#FAFAF9",
          },
          {
            backgroundColor: "#FEF3C7",
            overwrite: "auto",
          },
          1,
        )
        .from(".text-side-heading .split-char", {
          scale: 1.3,
          y: 40,
          rotate: -25,
          opacity: 0,
          stagger: 0.1,
          ease: "back.out(3)",
          duration: 0.5,
        })
        .from(".text-side-body", {
          y: 20,
          opacity: 0,
        });
    },
    { dependencies: [ready, isDesktop, isMobile] },
  );

  return (
    <>
      {/* Add Navbar here */}
      <Navbar />
      {/* Coffee bean SVG overlay background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden"
        style={{background:"none"}}
      >
        <img
          src="/labels/beans-bg.png"
          alt="Coffee bean background"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
          style={{zIndex:0}}
        />
      </div>
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="hero opacity-0 relative z-10"
      >
        {isDesktop && (
          <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
            <Scene />
            <Bubbles count={300} speed={2} repeat={true} />
          </View>
        )}

        <div className="grid">
          <div className="grid h-screen place-items-center">
            <div className="grid auto-rows-min place-items-center text-center">
              <h1 className="hero-header text-5xl font-black uppercase leading-[.8] text-yellow-700 md:text-[4rem] lg:text-[7rem]">
                <TextSplitter
                  text={asText(slice.primary.heading)}
                  wordDisplayStyle="block"
                  className="hero-header-word"
                />
              </h1>
              <div className="hero-subheading mt-6 text-4xl font-semibold text-sky-950 lg:text-4xl">
                <PrismicRichText field={slice.primary.subheading} />
              </div>
              <div className="hero-body text-2xl font-normal text-sky-950 text-center md:text-justify">
                <PrismicRichText field={slice.primary.body} />
              </div>
              <Button
                buttonLink={slice.primary.button_link}
                buttonText={slice.primary.button_text}
                className="hero-button mt-12"
              />
            </div>
          </div>

          <div className="text-side relative z-[80] grid h-screen items-center gap-4 md:grid-cols-2">
            <PrismicNextImage
              className="w-full md:hidden"
              field={slice.primary.cans_image}
            />
            <div>
              <h2 className="text-side-heading text-balance text-6xl font-black uppercase text-sky-950 lg:text-8xl">
                <TextSplitter text={asText(slice.primary.second_heading)} />
              </h2>
              <div className="text-side-body mt-4 max-w-2xl text-balance text-2xl font-normal text-sky-950">
                <PrismicRichText field={slice.primary.second_body} />
              </div>
            </div>
          </div>
        </div>
      </Bounded>
    </>
  );
};

export default Hero;
