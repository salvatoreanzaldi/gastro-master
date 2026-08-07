import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useLangPath } from "@/components/LanguageLayout";
import multicolorImg from "@/assets/hardware/kiosk/kiosk-multicolor.png";
import doublescreenSchwarzImg from "@/assets/hardware/kiosk/doublescreen-schwarz.png";
import doublescreenWeissImg from "@/assets/hardware/kiosk/doublescreen-weiss.png";
import wand156Img from "@/assets/hardware/kiosk/wand-kiosk-15-6-zoll.png";
import wand215Img from "@/assets/hardware/kiosk/wand-kiosk-21-5-zoll.png";
import outdoorImg from "@/assets/hardware/kiosk/outdoor-kiosk.png";

interface HardwareSectionProps {
  variant: "multicolor" | "doublescreen" | "wallmount" | "outdoor";
}

/**
 * Kiosk-Hardware-Varianten-Sektionen (nur auf der Kiosk-Seite).
 * Texte kommen aus kiosk.json → hardwareSections.* (alle 6 Sprachen) —
 * vorher waren sie hier hartcodiert auf Deutsch und blieben auf EN/IT/…
 * unübersetzt. Links laufen über useLangPath (lokalisierte Slugs).
 */
const HardwareSection = ({ variant }: HardwareSectionProps) => {
  const { t } = useTranslation("kiosk");
  const lp = useLangPath();

  // DE-kanonischer Link-Ziel-Slug je Variante (Description-Inline-Link).
  // wallmount zeigte vorher auf /loesungen/baeckerei — die Route existiert
  // nicht (404); korrekt ist /loesungen/cafe-baeckerei.
  const linkTarget = {
    multicolor: "/produkte/add-ons/kiosk",
    doublescreen: "/produkte/pakete/kassensystem",
    wallmount: "/loesungen/cafe-baeckerei",
    outdoor: "/loesungen/restaurant",
  }[variant];

  const k = (key: string) => t(`hardwareSections.${variant}.${key}`);
  const description = (
    <Trans
      t={t}
      i18nKey={`hardwareSections.${variant}.description`}
      components={[
        <strong />,
        <Link to={lp(linkTarget)} className="text-blue-600 hover:underline font-medium" />,
      ]}
    />
  );

  const images = {
    multicolor: [{ src: multicolorImg, alt: k("alt1") }],
    doublescreen: [
      { src: doublescreenSchwarzImg, alt: k("alt1"), label: k("label1") },
      { src: doublescreenWeissImg, alt: k("alt2"), label: k("label2") },
    ],
    wallmount: [
      { src: wand156Img, alt: k("alt1"), label: k("label1") },
      { src: wand215Img, alt: k("alt2"), label: k("label2") },
    ],
    outdoor: [{ src: outdoorImg, alt: k("alt1") }],
  }[variant];

  if (variant === "multicolor") {
    return (
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 max-w-4xl">{k("title")}</h2>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-10">{k("subtitle")}</p>

          {/* Image - Full Width */}
          <img
            src={images[0].src}
            alt={images[0].alt}
            className="w-full rounded-xl shadow-lg mb-10 object-cover"
            loading="lazy"
          />

          {/* Text Below Image */}
          <div className="text-base text-gray-700 leading-relaxed max-w-4xl">
            <p className="text-lg">{description}</p>
          </div>
        </motion.div>
      </section>
    );
  }

  if (variant === "outdoor") {
    return (
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{k("title")}</h2>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-10">{k("subtitle")}</p>

          {/* Two Column Layout - Text Left, Image Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-base text-gray-700 leading-relaxed"
            >
              <p className="text-lg">{description}</p>
            </motion.div>

            {/* Image Right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center justify-center"
            >
              <img
                src={images[0].src}
                alt={images[0].alt}
                className="w-full max-w-md rounded-xl shadow-lg object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>
    );
  }

  // Doublescreen & Wallmount layout
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 max-w-4xl">{k("title")}</h2>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 mb-10">{k("subtitle")}</p>

        {/* Description ABOVE Images */}
        <div className="text-base text-gray-700 leading-relaxed max-w-4xl mb-12">
          <p className="text-lg">{description}</p>
        </div>

        {/* Images Grid - Compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center"
            >
              {/* Image Card */}
              <div className="w-full max-w-sm">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full rounded-xl shadow-md border border-gray-200 object-cover hover:shadow-lg transition-shadow"
                  loading="lazy"
                />
              </div>

              {/* Label Below Image */}
              {"label" in img && img.label && (
                <p className="text-center text-sm font-semibold text-gray-800 mt-4">{img.label}</p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HardwareSection;
