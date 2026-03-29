import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  HOW_IT_WORKS_STEPS,
  SECTION_COPY,
} from "@site/src/data/animation-config";
import styles from "./HowItWorks.module.css";

export function HowItWorks() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Progress line fills as the section scrolls into view
  const lineScale = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  // Each step activates at a different scroll point
  const stepThresholds = HOW_IT_WORKS_STEPS.map((_, i) =>
    0.15 + (i / HOW_IT_WORKS_STEPS.length) * 0.5
  );

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <motion.h2
            className={styles.title}
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {SECTION_COPY.howItWorks}
          </motion.h2>
          <p className={styles.subtitle}>
            Scaffold, install, seed, and start
          </p>
        </div>

        <div className={styles.timeline}>
          {/* Connecting progress line */}
          <div className={styles.timelineLine}>
            <motion.div
              className={styles.progressLine}
              style={{
                scaleX: reducedMotion ? 1 : lineScale,
              }}
            />
          </div>

          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <StepItem
              key={step.title}
              step={step}
              index={i}
              scrollYProgress={scrollYProgress}
              threshold={stepThresholds[i]}
              reducedMotion={reducedMotion || false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepItem({
  step,
  index,
  scrollYProgress,
  threshold,
  reducedMotion,
}: {
  step: { title: string; command: string };
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  threshold: number;
  reducedMotion: boolean;
}) {
  // Determine if step is "active" based on scroll progress
  const opacity = useTransform(
    scrollYProgress,
    [threshold - 0.05, threshold],
    [0.4, 1]
  );

  return (
    <motion.div
      className={styles.step}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <motion.div
        className={`${styles.stepNumber} ${
          reducedMotion ? styles.stepNumberActive : ""
        }`}
        style={
          reducedMotion
            ? undefined
            : {
                opacity,
              }
        }
      >
        {index + 1}
      </motion.div>
      <div className={styles.stepTitle}>{step.title}</div>
      <div className={styles.stepTerminal}>$ {step.command}</div>
    </motion.div>
  );
}
