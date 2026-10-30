import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

/** Page wrapper: soft fade/slide in on mount, out on route change. */
export function Page({ children, className = "container" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Fades/slides children in once they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = "div",
  ...rest
}) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.55, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Standard page intro: eyebrow, big title, lead paragraph. */
export function PageHeader({ eyebrow, title, lead, children }) {
  return (
    <header className="page-header">
      {eyebrow && (
        <motion.span
          className="page-eyebrow"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h1
        className="page-title"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
      >
        {title}
      </motion.h1>
      {lead && (
        <motion.p
          className="page-lead"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.12 }}
        >
          {lead}
        </motion.p>
      )}
      {children}
    </header>
  );
}
