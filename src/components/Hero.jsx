import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useState } from "react";

import Button from "./Button";
import pahadMain from "../assets/pahad-main.mp4";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const handleVideoLoad = (e) => {
    setLoadedVideos((prev) => prev + 1);
    if (e.target) {
      e.target.currentTime = 10;
    }
  };

  useEffect(() => {
    if (loadedVideos === 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = () => pahadMain;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-black">
          {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-zinc-950"
      >
        <div>
          <video
            id="hero-video"
            src={getVideoSrc()}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center scale-[1.3]"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-zinc-300">
          GD PR<b>O</b>D
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-white">
              cr<b>e</b>ate
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-zinc-100">
              Bringing Ideas to Life <br /> Through Cinematic Visuals
            </p>

            <Button
              id="watch-showreel"
              title="View Showreel"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-white text-black hover:bg-zinc-200 transition-colors flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-white mix-blend-difference">
        GD PR<b>O</b>D
      </h1>
    </div>
  );
};

export default Hero;
