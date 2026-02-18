export interface PrayerItem {
  id: number;
  pauta: string;
  versiculo: string;
}

export type Theme = "green" | "blue";
export type LayoutMode = "combined" | "sequential";
export type CopyState = "idle" | "copied" | "error";
