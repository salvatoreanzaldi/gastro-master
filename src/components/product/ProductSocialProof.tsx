import { motion } from "framer-motion";

// Representative customer logos (franchise/brand logos work well on dark bg)
import logoBurgerBrothers from "@/assets/logo-burger-brothers.png";
import logoTake from "@/assets/logo-take.png";
import logoEtManus from "@/assets/logo-et-manus.png";
import logoBigOneBite from "@/assets/Logo - Big One Bite.png";
import logoPomPom from "@/assets/Logo - Pom Pom.png";

const defaultLogos = [
  { src: logoBurgerBrothers, alt: "Burger Brothers" },
  { src: logoTake,           alt: "Take The Good Food" },
  { src: logoEtManus,        alt: "Et Manus" },
  { src: logoBigOneBite,     alt: "Big One Bite" },
  { src: logoPomPom,         alt: "Pom Pom Chicken" },
];

interface SocialProofLogo { src: string; alt: string }

interface ProductSocialProofProps {
  label?: string;
  logos?: SocialProofLogo[];
}

const ProductSocialProof = ({
  label = "Vertrauen von 100+ Gastronomen",
  logos = defaultLogos,
}: ProductSocialProofProps) => (
  <section className="bg-[#091A33] border-y border-white/[0.07] py-10 px-5 md:px-8 lg:px-16">
    <div className="container-tight">
      <p className="text-center text-white/35 text-xs uppercase tracking-[0.2em] mb-8 font-semibold">
        {label}
      </p>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="grid grid-cols-5 gap-2 md:gap-10 items-center"
      >
        {logos.slice(0, 5).map((logo) => (
          <div key={logo.alt} className="flex items-center justify-center">
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-7 sm:h-10 md:h-12 w-full object-contain opacity-40 hover:opacity-65 transition-opacity duration-300"
            />
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ProductSocialProof;
