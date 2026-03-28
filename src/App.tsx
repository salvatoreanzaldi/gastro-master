import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const WebshopPage                = lazy(() => import("@/pages/WebshopPage"));
const AppPage                    = lazy(() => import("@/pages/AppPage"));
const WebseitePage               = lazy(() => import("@/pages/WebseitePage"));
const KassePage                  = lazy(() => import("@/pages/KassePage"));
const TransaktionsumlagePage     = lazy(() => import("@/pages/TransaktionsumlagePage"));
const Impressum                  = lazy(() => import("@/pages/Impressum"));
const Datenschutz                = lazy(() => import("@/pages/Datenschutz"));
const AGB                        = lazy(() => import("@/pages/AGB"));
const Kontakt                    = lazy(() => import("@/pages/Kontakt"));
const LieferserviceGruendenPage  = lazy(() => import("@/pages/LieferserviceGruendenPage"));
const FranchisePage              = lazy(() => import("@/pages/FranchisePage"));
const RestaurantPage             = lazy(() => import("@/pages/RestaurantPage"));
const LieferdienstPage           = lazy(() => import("@/pages/LieferdienstPage"));
const CafeBaeckereiPage          = lazy(() => import("@/pages/CafeBaeckereiPage"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/produkte/webshop"            element={<WebshopPage />} />
              <Route path="/produkte/app"                element={<AppPage />} />
              <Route path="/produkte/bestellapp"         element={<AppPage />} />
              <Route path="/produkte/webseite"           element={<WebseitePage />} />
              <Route path="/produkte/kassensystem"        element={<KassePage />} />
              <Route path="/produkte/transaktionsumlage" element={<TransaktionsumlagePage />} />
              <Route path="/loesungen/lieferservice-gruenden" element={<LieferserviceGruendenPage />} />
              <Route path="/loesungen/franchise"         element={<FranchisePage />} />
              <Route path="/loesungen/restaurant"        element={<RestaurantPage />} />
              <Route path="/loesungen/lieferdienst"      element={<LieferdienstPage />} />
              <Route path="/loesungen/cafe-baeckerei"    element={<CafeBaeckereiPage />} />
              <Route path="/impressum"                   element={<Impressum />} />
              <Route path="/datenschutz"                 element={<Datenschutz />} />
              <Route path="/agb"                         element={<AGB />} />
              <Route path="/kontakt"                     element={<Kontakt />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
