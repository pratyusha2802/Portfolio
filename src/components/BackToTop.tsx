import { useEffect, useState } from "react";
import { useMagneticHover } from "../lib/useMagneticHover";

function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ref = useMagneticHover<HTMLButtonElement>();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`back-to-top magnetic${visible ? " is-visible" : ""}`}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      ref={ref}
    >
      ↑
    </button>
  );
}

export default BackToTop;
