import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

/**
 * Batch 8: `forceMount` — der Antworttext bleibt IMMER im DOM.
 *
 * Ohne forceMount hängt Radix den Inhalt beim Zuklappen aus. Zugeklappt stand
 * die Antwort dann nur im prerenderten HTML und im FAQPage-Schema, nicht im
 * gerenderten DOM (gemessen: 0 von 6 Antworten je Vergleichsseite).
 *
 * forceMount allein reicht NICHT: Radix setzt dann kein `hidden` mehr, der
 * Inhalt stünde offen da. Deshalb übernimmt CSS das Einklappen —
 * `data-[state=closed]:h-0` hält die Höhe stabil bei 0 (auch nachdem die
 * Keyframe-Animation durchgelaufen ist) und `invisible` nimmt den Text aus
 * dem Screenreader-Fluss, ohne ihn aus dem DOM zu entfernen.
 */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    forceMount
    className="overflow-hidden text-sm transition-all data-[state=closed]:h-0 data-[state=closed]:invisible data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
