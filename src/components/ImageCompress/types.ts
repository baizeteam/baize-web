export interface ImageItem {
  id: string;
  originalFile: File;
  compressedFile?: File;
  originalSize: number;
  compressedSize?: number;
  compressRate?: number;
  compressTime?: number;
  status: "pending" | "compressing" | "completed" | "error";
  error?: string;
}
