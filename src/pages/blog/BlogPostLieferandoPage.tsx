// Batch 3b — Content lebt in src/data/blog-landing-content.ts (eine Quelle
// für Client UND Prerenderer). Diese Datei ist nur noch Layout-Verdrahtung;
// die Problem-Karten behalten ihre bisherigen Icons/Farbvarianten.
import { BlogPostLayout } from "@/components/blog/BlogPostLayout";
import { LandingBlocks, type ItemVisual } from "@/components/blog/LandingBlocks";
import { TrendingDown, AlertCircle, Calculator } from "lucide-react";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { LANDING_POSTS } from "@/data/blog-landing-content";

const POST = LANDING_POSTS["warum-lieferando-verzichten"];

const PROBLEM_VISUALS: ItemVisual[] = [
  { Icon: TrendingDown, boxClass: "bg-red-500/12 border-red-500/20", iconClass: "text-red-400" },
  { Icon: AlertCircle, boxClass: "bg-orange-500/12 border-orange-500/20", iconClass: "text-orange-400" },
  { Icon: Calculator, boxClass: "bg-yellow-500/12 border-yellow-500/20", iconClass: "text-yellow-400" },
];

export default function BlogPostLieferandoPage() {
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
        <LandingBlocks blocks={POST.blocks} itemVisuals={PROBLEM_VISUALS} />
      </div>
    </BlogPostLayout>
  );
}
