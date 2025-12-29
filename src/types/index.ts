export interface MatchaLog {
  id: string;

  // Matcha identity
  name: string;
  brand: string;
  origin?: string;
  priceAmount?: number;
  priceCurrency?: "USD" | "JPY";
  quantityGrams?: number;

  // Flavour Ratings
  umami: number;
  sweetness: number;
  bitterness: number;

  // Tasting Notes
  notes: string[];

  // Ratios
  powderGrams: number;
  waterMl?: number;
  milkMl?: number;

  createdAt: string;

  // Photos
  canPhoto?: string;
  drinkPhotos?: string[];

  // Repurchase?
  wouldRepurchase?: boolean;
}
