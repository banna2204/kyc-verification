import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const STAGGER = 0.035;

const TextRoll = ({ children, className = "", center = false }) => {
  const letters = children.split("");
  const controls = useAnimation();

  useEffect(() => {
   
    controls.start("hovered");
  }, [controls]);

  return (
    <motion.span
      initial="initial"
      animate={controls}   
      whileHover="hovered" 
      className={`relative block overflow-hidden ${className}`}
      style={{ lineHeight: 0.85 }}
    >
      {/* Top letters */}
      <div>
        {letters.map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (letters.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              key={i}
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
              transition={{ ease: "easeInOut", delay }}
              className="inline-block"
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </div>

      {/* Bottom letters */}
      <div className="absolute inset-0">
        {letters.map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (letters.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              key={i}
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 },
              }}
              transition={{ ease: "easeInOut", delay }}
              className="inline-block"
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};

export default TextRoll;