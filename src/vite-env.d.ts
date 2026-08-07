/// <reference types="vite/client" />
/// <reference types="vite-imagetools/client" />

// Build-Zeitstempel, per Vite `define` injiziert (siehe vite.config.ts).
// Cache-Buster für die nicht-gehashten Locale-JSONs.
declare const __BUILD_ID__: string;
