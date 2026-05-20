/**
 * Utility to resolve product images.
 * If the image data is a base64-encoded URL or local path string, decodes it.
 * Otherwise, wraps it in the data URI scheme for raw base64 binary images.
 */
export const getProductImage = (imgBase64) => {
  if (!imgBase64) return "";
  try {
    const decoded = atob(imgBase64);
    if (decoded.startsWith("/images") || decoded.startsWith("http") || decoded.startsWith("./images")) {
      return decoded;
    }
  } catch (e) {
    // If atob fails, it means it's not a standard base64 path string or is invalid base64, 
    // so we fall through to rendering it as a base64 binary image.
  }
  return `data:image/png;base64,${imgBase64}`;
};
