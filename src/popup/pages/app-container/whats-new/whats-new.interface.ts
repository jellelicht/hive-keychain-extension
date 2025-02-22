export interface Feature {
  anchor: string;
  image: string;
  title: string;
  description: string;
  extraInformation: string;
}

export interface Features {
  [locale: string]: Feature[];
}

export interface WhatsNewContent {
  url: string;
  version: string;
  features: Features;
}
