export interface MatchaLog {
  id: string;

  // Matcha identity
  name: string;
  brand?: string;
  origin?: string;

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
}