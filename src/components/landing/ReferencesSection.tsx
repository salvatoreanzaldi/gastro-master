import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

const ReviewCard = ({ item, i }: { item: any; i: number }) => (
  <div className={`rounded-2xl p-6 md:p-8 border h-full ${i === 0 ? 'bg-gradient-navy text-primary-foreground border-cyan-brand/30' : 'bg-surface-light border-border'}`}>
    <Quote className={`w-8 h-8 mb-4 ${i === 0 ? 'text-cyan-brand' : 'text-muted-foreground/30'}`} />
    <p className={`mb-6 leading-relaxed ${i === 0 ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{item.quote}</p>
    <div className="flex items-center gap-1 mb-3">
      {[...Array(5)].map((_, j) => (
        <Star key={j} className="w-4 h-4 text-amber fill-current" />
      ))}
    </div>
    <div className={`font-bold ${i === 0 ? 'text-primary-foreground' : 'text-foreground'}`}>{item.name}</div>
    <div className={`text-sm ${i === 0 ? 'text-primary-foreground/50' : 'text-muted-foreground'}`}>{item.type}</div>
  </div>
);

const ReferencesSection = () => {
  const { t } = useTranslation("common");
  const items = (t("references.items", { returnObjects: true }) as any[]);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => { api.off("select", onSelect); };
  }, [api]);

  useEffect(() => {
    if (!api) return;
    let paused = false;
    const id = setInterval(() => { if (!paused) api.scrollNext(); }, 5000);
    const pause = () => { paused = true; setTimeout(() => { paused = false; }, 8000); };
    api.on("pointerDown", pause);
    return () => { clearInterval(id); api.off("pointerDown", pause); };
  }, [api]);

  return (
    <section className="section-padding bg-background" id="referenzen">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            {t("references.badge")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t("references.headline")}
          </p>
        </motion.div>

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <Carousel opts={{ loop: true }} setApi={setApi} className="relative mx-auto max-w-sm">
            <CarouselContent className="-ml-3">
              {items.map((item, i) => (
                <CarouselItem key={item.name} className="pl-3">
                  <div className="px-1 py-1">
                    <ReviewCard item={item} i={i} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <button onClick={() => api?.scrollPrev()}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-9 h-9 rounded-full bg-background/90 border border-border shadow-lg flex items-center justify-center text-foreground active:scale-95 transition-transform"
              aria-label="Vorheriger">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => api?.scrollNext()}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 w-9 h-9 rounded-full bg-background/90 border border-border shadow-lg flex items-center justify-center text-foreground active:scale-95 transition-transform"
              aria-label="Nächster">
              <ChevronRight className="w-5 h-5" />
            </button>
          </Carousel>
          <div className="flex justify-center gap-2 mt-5">
            {items.map((_, i) => (
              <button key={i} onClick={() => api?.scrollTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? "bg-cyan-brand w-5" : "bg-foreground/20"}`}
                aria-label={`Slide ${i + 1}`} />
            ))}
          </div>
        </div>

        {/* Desktop: Grid (unverändert) */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <ReviewCard item={item} i={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReferencesSection;
