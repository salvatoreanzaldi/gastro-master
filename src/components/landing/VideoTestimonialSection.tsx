import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useTranslation } from "react-i18next";

const YOUTUBE_IDS = ["JkkVyIFewO0", "Qv-YDj9gjPk", "Zx_UJJjQTso"];

const VideoTestimonialSection = () => {
  const { t } = useTranslation("common");

  const testimonials = (t("video.items", { returnObjects: true }) as any[]).map((item: any, i: number) => ({
    title: item.name,
    subtitle: item.person,
    quote: item.quote,
    videoId: YOUTUBE_IDS[i],
  }));

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
            {t("video.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground mb-4">
            {t("video.headline")}
          </h2>
          <p className="text-primary-foreground/60 text-lg max-w-xl mx-auto">
            {t("video.sub")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.videoId}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-2xl overflow-hidden border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm hover:border-cyan-brand/30 transition-all duration-500"
            >
              <div className="relative aspect-video bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${item.videoId}`}
                  title={`${item.title} – ${item.subtitle}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="p-5">
                <Quote className="w-4 h-4 text-cyan-brand/50 mb-2" />
                <p className="text-primary-foreground/70 text-sm leading-relaxed italic mb-3">
                  „{item.quote}"
                </p>
                <p className="text-primary-foreground font-bold text-sm">{item.title}</p>
                <p className="text-primary-foreground/50 text-xs">{item.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonialSection;
