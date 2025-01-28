export interface SeoFieldProperties {
  image: any;
  title: string;
  description: string;
}

export interface SEOHealthCheck {
  score: number;
  status: "green" | "yellow" | "red";
}
