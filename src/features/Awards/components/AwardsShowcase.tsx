import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import type { AwardApp } from "../data/mockAwards";
import Button from "../../../components/ui/Button";
import { RiArrowRightUpLine } from "react-icons/ri";
import Navbar from "../../../components/layout/Navbar";
import { LogoWhite } from "../../../assets";

interface AwardsShowcaseProps {
  awards: AwardApp[];
}

const AwardsShowcase: React.FC<AwardsShowcaseProps> = ({ awards }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const index = Math.min(
      Math.floor(latest * awards.length),
      awards.length - 1
    );
    setActiveIndex(index);
  });

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-bodyBg">
      <div className="sticky top-0 h-screen w-full flex flex-col  overflow-hidden">
        <Navbar />
        <div className="sticky top-0 h-screen w-full max-w-[1300px] mx-auto flex flex-col md:flex-row overflow-hidden">
          {/* Section 1: Title */}
          <div className="w-full md:w-1/4 h-[20vh] md:h-full flex flex-col justify-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-textColor leading-tight">
                Awards <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-mainColor">
                  & Honors
                </span>
              </h1>
              <h2 className="text-textColorWeak text-sm font-medium uppercase tracking-widest mt-4">
                In Last 7 Days
              </h2>
            </motion.div>
          </div>

          {/* Section 2: Stacked Cards */}
          <div className="w-full md:w-1/2 h-[50vh] md:h-full flex items-center justify-center relative perspective-1000">
            <div className="relative w-[370px] h-[460px] max-xl:w-[350px] max-xl:h-[80%]">
              {awards.map((award, index) => {
                // Calculate visual stacking
                // We want the active card to be front and center
                // Cards after it should be stacked behind
                // Cards before it should be gone or faded

                return (
                  <Card
                    key={award.id}
                    award={award}
                    index={index}
                    total={awards.length}
                    progress={smoothProgress}
                  />
                );
              })}
            </div>
          </div>

          {/* Section 3: Project Info */}
          <div className="w-full md:w-1/4 h-[30vh] md:h-full flex flex-col justify-center p-8 md:p-12 z-10 bg-black/50 backdrop-blur-sm md:bg-transparent">
            <div className="relative h-40">
              {awards.map((award, index) => (
                <motion.div
                  key={award.id}
                  className="absolute inset-0 flex flex-col justify-center"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: index === activeIndex ? 1 : 0,
                    x: index === activeIndex ? 0 : 20,
                    pointerEvents: index === activeIndex ? "auto" : "none",
                  }}
                  transition={{ duration: 0.0 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className=" font-bold uppercase tracking-wider text-sm">
                      APPGRADE
                    </span>
                    <span className="text-textColorWeak">•</span>
                    <span className="text-textColorWeak text-sm whitespace-nowrap">
                      {award.category} Award
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-textColor mb-1">
                    {award.developer}
                  </h3>
                  <a
                    href="#"
                    className="text-textColorWeak hover:text-textColor text-sm mb-6 block transition-colors"
                  >
                    {award.name}.com
                  </a>

                  <Button
                    label="Visit Site"
                    icon={<RiArrowRightUpLine className="min-w-fit" />}
                    className="bg-cardBg rounded-full pr-8 pl-4 py-3 w-max font-bold"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({
  award,
  index,
  total,
  progress,
}: {
  award: AwardApp;
  index: number;
  total: number;
  progress: any;
}) => {
  // Determine the position in the stack relative to the active index
  // We want a "deck" effect where cards are stacked behind the current one

  // Transform progress (0-1) to a value that represents which card is in focus (0 to total-1)
  const cardProgress = useTransform(progress, [0, 1], [0, total - 1]);

  // Calculate offset for this specific card
  // If cardProgress is 0, card 0 is active.
  // If cardProgress is 1, card 1 is active.

  const y = useTransform(cardProgress, (v) => {
    const diff = index - v;
    // If diff is 0, it's the active card -> y=0

    if (diff < 0) {
      // Card has passed, move it up and out
      return diff * -500;
    }

    // Cards waiting in the stack
    // Make them peek out more visibly from behind
    return diff * -40; // Increased from -15 to -40
  });

  const scale = useTransform(cardProgress, (v) => {
    const diff = index - v;
    if (diff < 0) return 1; // Passed cards stay scale 1 (but move away)

    // Waiting cards get smaller but not too small so we can see them
    return 1 - diff * 0.05;
  });

  const opacity = useTransform(cardProgress, (v) => {
    const diff = index - v;
    if (diff < -0.5) return 0; // Fade out passed cards
    if (diff > 5) return 0; // Show more cards in stack (was 3)
    return 1;
  });

  // Dynamic background color based on index for visual variety if image fails or as border
  const colors = ["#8B5CF6", "#EC4899", "#3B82F6", "#10B981", "#F59E0B"];
  const bgColor = colors[index % colors.length];

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        zIndex: total - index,
      }}
      className="absolute inset-0 rounded-[36px] transition-opacity duration-300 overflow-hidden shadow-2xl origin-bottom"
    >
      <div
        className={`w-full h-full relative p-6 flex flex-col justify-between`}
        style={{ backgroundColor: bgColor }}
      >
        {/* Header on Card */}
        <div className="flex justify-between items-start z-10">
          <img src={LogoWhite} className="h-6 font-bold text-white text-xl" />
        </div>

        {/* Content on Card */}
        <div className="z-10 pt-10 pb-2 flex-1 flex flex-col">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white/80 mb-3 leading-tight">
              {award.category} Award.
              <br />
              <div className="flex flex-col gap-1 mt-2 text-white/70 text-sm font-medium">
                12 June, 2025
              </div>
            </h2>
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">{award.name}.</h3>

          <div className="flex flex-col gap-1 text-white/70 text-sm font-medium">
            <div className="flex items-center gap-2">
              By:
              <div className="flex items-center gap-2">
                <img
                  src={award.logo}
                  alt="logo"
                  className="size-6 rounded-full bg-white/10"
                />
                {award.developer}
              </div>
            </div>
          </div>
        </div>
        {/* Background Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent dark:from-black/10 to-black/30 dark:to-black/60 z-0" />
        {/* We can use the actual image as a subtle texture or background if desired, but the reference has a solid color card look.
                    Let's mix it: Solid color card with subtle image blend.
                */}
      </div>
    </motion.div>
  );
};

export default AwardsShowcase;
