/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_ADSENSE_CLIENT_ID?: string;
  readonly VITE_GOOGLE_ADSENSE_SLOT_HEADER?: string;
  readonly VITE_GOOGLE_ADSENSE_SLOT_FEED?: string;
  readonly VITE_GOOGLE_ADSENSE_SLOT_FOOTER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
