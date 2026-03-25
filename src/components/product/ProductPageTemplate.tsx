import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ProductHero from "./ProductHero";
import ProductBentoGrid, { type BentoTile } from "./ProductBentoGrid";
import ProductSocialProof from "./ProductSocialProof";
import ProductCTA from "./ProductCTA";

export interface ProductPageConfig {
  hero: {
    badge: string;
    headline: string;
    subline: string;
    ctaLabel: string;
    mockupSrc?: string;
  };
  bento: {
    headline?: string;
    sub?: string;
    tiles: BentoTile[];
  };
  socialProof?: {
    label?: string;
    logos?: { src: string; alt: string }[];
  };
  cta: {
    headline: string;
    sub: string;
    buttonLabel: string;
  };
}

interface ProductPageTemplateProps {
  config: ProductPageConfig;
}

const ProductPageTemplate = ({ config }: ProductPageTemplateProps) => (
  <div className="min-h-screen" style={{ backgroundColor: "#0A264A" }}>
    <Navbar />
    <ProductHero {...config.hero} />
    <ProductBentoGrid
      headline={config.bento.headline}
      sub={config.bento.sub}
      tiles={config.bento.tiles}
    />
    <ProductSocialProof
      label={config.socialProof?.label}
      logos={config.socialProof?.logos}
    />
    <ProductCTA {...config.cta} />
    <Footer />
  </div>
);

export default ProductPageTemplate;
