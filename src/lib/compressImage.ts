// ────────────────────────────────────────────────────────────────────────────
// COMPRESIÓN DE IMÁGENES (lado del navegador)
// Reduce el peso de las fotos (típicamente 3–12 MB desde el celular) a un
// objetivo (~1 MB) redimensionando y recomprimiendo a JPEG. Así la subida es
// rápida y nunca falla por exceder el límite del servidor.
// ────────────────────────────────────────────────────────────────────────────

type CompressOptions = {
  /** Tamaño objetivo en MB. Por defecto 1 MB. */
  maxSizeMB?: number
  /** Lado máximo (ancho o alto) en píxeles. Por defecto 1600. */
  maxDimension?: number
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), 'image/jpeg', quality))
}

export async function compressImage(
  file: File,
  { maxSizeMB = 1, maxDimension = 1600 }: CompressOptions = {},
): Promise<File> {
  // Solo procesamos imágenes; cualquier otra cosa se devuelve igual.
  if (!file.type.startsWith('image/')) return file

  const maxBytes = maxSizeMB * 1024 * 1024
  // Si ya pesa menos del objetivo, no la tocamos.
  if (file.size <= maxBytes) return file

  let bitmap: ImageBitmap
  try {
    // 'from-image' respeta la orientación EXIF (fotos del celular salen derechas).
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' } as ImageBitmapOptions)
  } catch {
    // El navegador no pudo decodificarla (p. ej. HEIC): devolvemos el original.
    return file
  }

  // Dimensiones iniciales escaladas para no exceder maxDimension.
  let scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height))
  let blob: Blob | null = null

  // Reintentos: baja calidad y, si hace falta, también dimensiones.
  for (let attempt = 0; attempt < 6; attempt++) {
    const width = Math.max(1, Math.round(bitmap.width * scale))
    const height = Math.max(1, Math.round(bitmap.height * scale))

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      bitmap.close?.()
      return file
    }
    ctx.drawImage(bitmap, 0, 0, width, height)

    // Calidad decreciente en cada intento: 0.85, 0.7, 0.55, ...
    const quality = Math.max(0.4, 0.85 - attempt * 0.15)
    blob = await canvasToBlob(canvas, quality)

    if (blob && blob.size <= maxBytes) break
    // Aún muy grande: reducimos dimensiones un 20% para el siguiente intento.
    scale *= 0.8
  }

  bitmap.close?.()

  // Si por alguna razón no se generó, o quedó más grande que el original, usamos el original.
  if (!blob || blob.size >= file.size) return file

  const baseName = file.name.replace(/\.[^.]+$/, '') || 'foto'
  return new File([blob], `${baseName}.jpg`, {
    type: 'image/jpeg',
    lastModified: Date.now(),
  })
}
