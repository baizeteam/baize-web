export interface ImageItem {
  id: string;
  fileName: string;
  /** 压缩完成并生成 previewBlob 后会释放，以降低内存 */
  originalFile?: File;
  /** 缩小后的原图预览，用于列表 / 对比 */
  previewBlob?: Blob;
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
