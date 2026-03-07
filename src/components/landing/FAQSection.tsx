import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Wie schnell kann ich starten?", a: "In der Regel ist dein Shop innerhalb weniger Wochen live. Wir übernehmen Setup, Design und Einrichtung für dich." },
  { q: "Muss ich sofort zahlen?", a: "Nein. Dein erster Beitrag wird erst fällig, wenn dein System live ist. Vorher entstehen keine Kosten." },
  { q: "Unterstützt ihr bei PayPal und Stripe?", a: "Ja, wir helfen dir bei der kompletten Einrichtung deiner Zahlungsanbieter – inklusive Verifizierung." },
  { q: "Wie läuft der Support?", a: "Per WhatsApp, Telefon oder E-Mail. Du hast einen persönlichen Ansprechpartner, kein anonymes Ticketsystem." },
  { q: "Bin ich lange gebunden?", a: "Nein. Du kannst jederzeit mit 3 Monaten Frist kündigen. Kein Langzeit-Lock-in." },
  { q: "Was ist beim Wechsel von einem anderen Anbieter?", a: "Wir machen dir den Wechsel so einfach wie möglich – inklusive 50 % Rabatt, solange dein altes Abo noch läuft." },
  { q: "Kann ich später ein Kassensystem dazunehmen?", a: "Ja, jederzeit. Gastro Master bietet alles aus einer Hand – Shop, App und Kasse." },
];

const FAQSection = () => (
  <section className="section-padding bg-surface-light" id="faq">
    <div className="container-tight max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Häufige Fragen</h2>
        <p className="text-muted-foreground text-lg">Offene Fragen? Hier findest du Antworten – oder ruf uns einfach an.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
      >
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-background border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow">
              <AccordionTrigger className="text-left text-foreground font-semibold py-5 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FAQSection;
