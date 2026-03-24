import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import testimonialKojo from "@/assets/testimonial-kojo-sushi.jpg";
import testimonialIlSorriso from "@/assets/testimonial-il-sorriso.jpg";
import testimonialNevada from "@/assets/testimonial-nevada-burger.jpg";
import testimonial61Burger from "@/assets/testimonial-61-burger.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonialImgs = [testimonialKojo, testimonialIlSorriso, testimonialNevada, testimonial61Burger];

const VideoTestimonialSection = () => {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const testimonials = t.video.items.map((item, i) => ({
    img: testimonialImgs[i],
    title: item.name,
    subtitle: item.person,
    quote: item.quote,
  }));

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const getVisible = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(testimonials[(current + i) % testimonials.length]);
    }
    return items;
  };

  const visible = getVisible();

  return (
    <section className="section-padding bg-gradient-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        background: "radial-gradient(ellipse at 60% 40%, hsl(196, 100%, 40%), transparent 50%)"
      }} />
      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">
            {t.video.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground mb-4">
            {t.video.headline}
          </h2>
          <p className="text-primary-foreground/60 text-lg max-w-xl mx-auto">
            {t.video.sub}
          </p>
        </motion.div>

        {/* Desktop: 3 cards */}
        <div className="hidden md:block">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={current}
              initial={{ opacity: 0, x: direction * 120 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -120 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid md:grid-cols-3 gap-6"
            >
              {visible.map((item, i) => (
                <TestimonialCard key={`${current}-${i}`} t={item} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile: 1 card */}
        <div className="md:hidden">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={current}
              initial={{ opacity: 0, x: direction * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -80 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <TestimonialCard t={testimonials[current]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={prev} className="w-10 h-10 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur-sm flex items-center justify-center text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? "bg-cyan-brand w-6" : "bg-primary-foreground/20 hover:bg-primary-foreground/40"}`}
              />
            ))}
          </div>
          <button onClick={next} className="w-10 h-10 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur-sm flex items-center justify-center text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ t }: { t: { img: string; title: string; subtitle: string; quote: string } }) => (
  <div className="group relative rounded-2xl overflow-hidden border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm hover:border-cyan-brand/30 transition-all duration-500">
    <div className="relative aspect-video overflow-hidden">
      <img src={t.img} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-primary-foreground/20 backdrop-blur-md border border-primary-foreground/20 flex items-center justify-center group-hover:bg-cyan-brand/30 group-hover:border-cyan-brand/40 group-hover:scale-110 transition-all duration-500">
          <Play className="w-6 h-6 text-primary-foreground ml-0.5" fill="currentColor" />
        </div>
      </div>
      <div className="absolute bottom-3 left-4 right-4">
        <h3 className="text-primary-foreground font-bold text-base">{t.title}</h3>
        <p className="text-primary-foreground/70 text-sm">{t.subtitle}</p>
      </div>
    </div>
    <div className="p-5">
      <Quote className="w-4 h-4 text-cyan-brand/50 mb-2" />
      <p className="text-primary-foreground/70 text-sm leading-relaxed italic">
        „{t.quote}"
      </p>
    </div>
  </div>
);

export default VideoTestimonialSection;
