export interface ImageItem {
  id: string;
  originalFile: File;
  compressedFile?: File;
  originalSize: number;
  compressedSize?: number;
  compressRate?: number;
  compressTime?: number;
  /** 实际用于本次压缩的质量（1-100） */
  quality?: number;
  status: "pending" | "compressing" | "completed" | "error";
  error?: string;
}
