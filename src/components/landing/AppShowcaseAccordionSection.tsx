import { useState } from "react";
import { useTranslation } from "react-i18next";

import screenshotStartbild from "@/assets/screenshots/Take - Startbild 2.png";
import screenshotBestellart from "@/assets/screenshots/Take - Bestellart 2.png";
import screenshotFilialen from "@/assets/screenshots/Take - Filialen 2.png";
import screenshotMenu from "@/assets/screenshots/Take - Menu 2.png";
import screenshotBenutzerkonto from "@/assets/screenshots/Take - Benutzerkonto 2.png";

const AppShowcaseAccordionSection = () => {
  const { t } = useTranslation("common");
  const [activeIndex, setActiveIndex] = useState(0);

  const arr = (key: string) => {
    const v = t(key, { returnObjects: true });
    return Array.isArray(v) ? v : [];
  };

  const screens = arr("appShowcase.screens") as any[];

  const screenshotMap: Record<string, string> = {
    "Startbild": screenshotStartbild,
    "Bestellart": screenshotBestellart,
    "Filialen": screenshotFilialen,
    "Menü": screenshotMenu,
    "Benutzerkonto": screenshotBenutzerkonto,
  };

  if (screens.length === 0) return null;

  const accordionItems = screens.map((screen) => ({
    id: screen.label,
    title: screen.label,
    imageUrl: screenshotMap[screen.label],
    description: screen.description,
  }));

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">
            {t("appShowcase.badge")} (A/B Variante)
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            {t("appShowcase.headline")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Interaktive Accordion-Ansicht der App-Funktionen
          </p>
        </div>

        {/* Image Accordion */}
        <div className="flex items-center justify-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 overflow-x-auto p-4 w-full">
              {accordionItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`
                    relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer
                    transition-all duration-700 ease-in-out
                    h-[400px] md:h-[500px]
                    ${index === activeIndex ? "w-[280px] md:w-[350px]" : "w-[50px] md:w-[60px]"}
                  `}
                  onMouseEnter={() => handleItemHover(index)}
                >
                  {/* Screenshot Image */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://placehold.co/400x500/2d3748/ffffff?text=Screenshot";
                    }}
                  />

                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/30"></div>

                  {/* Caption Text */}
                  <span
                    className={`
                      absolute text-white text-sm md:text-base font-semibold
                      transition-all duration-300 ease-in-out
                      whitespace-nowrap
                      ${
                        index === activeIndex
                          ? "bottom-6 left-1/2 -translate-x-1/2 rotate-0" // Active: horizontal, center-bottom
                          : "bottom-20 left-1/2 -translate-x-1/2 rotate-90" // Inactive: vertical
                      }
                    `}
                  >
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
        </div>

        {/* Description Grid below (mobile view) */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-4xl mx-auto">
          {accordionItems.map((item) => (
            <div key={item.id} className="text-center">
              <p className="text-xs md:text-sm font-semibold text-foreground mb-1">
                {item.title}
              </p>
              <p className="text-xs text-muted-foreground leading-tight">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppShowcaseAccordionSection;
