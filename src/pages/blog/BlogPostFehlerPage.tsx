// Batch 3b — Content lebt in src/data/blog-landing-content.ts (eine Quelle
// für Client UND Prerenderer). Diese Datei ist nur noch Layout-Verdrahtung;
// die Step-Karten behalten ihre bisherigen Icons.
import { BlogPostLayout } from "@/components/blog/BlogPostLayout";
import { LandingBlocks } from "@/components/blog/LandingBlocks";
import { MapPin, Smartphone, Calculator, Users, Megaphone } from "lucide-react";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { LANDING_POSTS } from "@/data/blog-landing-content";

const POST = LANDING_POSTS["5-fehler-lieferdienst-eroffnen"];

const STEP_ICONS = [MapPin, Calculator, Smartphone, Users, Megaphone];

export default function BlogPostFehlerPage() {
  return (
    <BlogPostLayout
      title={POST.meta.title}
      description={POST.meta.description}
      category={POST.meta.category}
      readingTime={POST.meta.readingTime}
      publishDate={POST.meta.publishDateDisplay}
      slug={POST.meta.slug}
    >
      <ScrollProgressBar />
      <ScrollToTopButton />
      <div className="space-y-6 text-white/65 text-base leading-relaxed">
        <LandingBlocks blocks={POST.blocks} stepIcons={STEP_ICONS} />
      </div>
    </BlogPostLayout>
  );
}
