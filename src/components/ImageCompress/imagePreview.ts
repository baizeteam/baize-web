const PREVIEW_SIZE = 720;

/** 生成缩小预览，便于释放原图 File 后仍能对比 / 展示缩略图 */
export async function createPreviewBlob(
  file: Blob,
  maxSize = PREVIEW_SIZE,
): Promise<Blob | null> {
  if (file.type === "image/svg+xml") {
    return file.slice(0, file.size, file.type);
  }

  try {
    const bitmap = await createImageBitmap(file, {
      resizeWidth: maxSize,
      resizeHeight: maxSize,
      resizeQuality: "medium",
    });
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close();
      return null;
    }
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();

    return await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(
        resolve,
        file.type === "image/png" ? "image/png" : "image/jpeg",
        0.8,
      ),
    );
  } catch {
    return null;
  }
}

export async function createThumbBlob(file: Blob): Promise<Blob | null> {
  return createPreviewBlob(file, 96);
}
