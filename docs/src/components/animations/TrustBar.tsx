import { useEffect, useRef, Fragment } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";
import { TRUST_STATS } from "@site/src/data/animation-config";
import styles from "./TrustBar.module.css";

export function TrustBar() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {TRUST_STATS.map((stat, i) => (
          <Fragment key={stat.label}>
            {i > 0 && <div className={styles.divider} />}
            <CountUpStat label={stat.label} target={stat.value} />
          </Fragment>
        ))}
      </div>
    </section>
  );
}

function CountUpStat({ label, target }: { label: string; target: number }) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionVal = useMotionValue(reducedMotion ? target : 0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));

  useEffect(() => {
    if (isInView && !reducedMotion) {
      animate(motionVal, target, { duration: 1.5, ease: "easeOut" });
    }
  }, [isInView, motionVal, target, reducedMotion]);

  return (
    <div ref={ref} className={styles.stat}>
      <motion.span className={styles.statValue} aria-live="polite">
        {rounded}
      </motion.span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}
