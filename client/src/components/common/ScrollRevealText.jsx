import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Char = ({ char, progress, range }) => {
  const color = useTransform(progress, range, ['#e0e3e8', '#1E2530']);
  return <motion.span style={{ color }}>{char}</motion.span>;
};

const ScrollRevealText = ({ lines = [], className = '' }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 82%', 'end 40%']
  });

  const totalChars = lines.reduce((acc, line) => acc + line.length, 0);
  let globalIndex = 0;

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, lineIdx) => {
        const chars = Array.from(line);
        return (
          <span key={lineIdx} className="block">
            {chars.map((char, charIdx) => {
              const start = globalIndex / totalChars;
              const end = (globalIndex + 1) / totalChars;
              globalIndex++;
              return (
                <Char
                  key={charIdx}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
        );
      })}
    </div>
  );
};

export default ScrollRevealText;
