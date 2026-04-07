import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Nach oben scrollen"
      className={`
        fixed bottom-6 right-4 z-50 w-10 h-10 rounded-full
        bg-cyan-brand/90 text-white shadow-lg shadow-cyan-brand/25
        flex items-center justify-center
        transition-all duration-300
        active:scale-90
        sm:hidden
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
};

export default ScrollToTopButton;
