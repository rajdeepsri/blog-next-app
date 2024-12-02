import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { BUCKET_NAME, MAX_SIZE_MB, tagColors } from './constants'
import { createClient } from '@supabase/supabase-js'
import { format } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate1 = (date: Date) => format(date, 'dd MMM yyyy')

// to make sure no two colors are same within the post
export const shuffleArray = () => {
  const shuffledColors = [...tagColors]
  for (let i = shuffledColors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledColors[i], shuffledColors[j]] = [shuffledColors[j], shuffledColors[i]]
  }
  return shuffledColors
}

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
)

export const uploadImage = async (file: File) => {
  if (!file.type.startsWith('image/')) {
    return { success: false, error: 'Only image files are allowed.', publicUrl: null }
  }

  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return { success: false, error: `File size exceeds ${MAX_SIZE_MB}MB.`, publicUrl: null }
  }

  const uniqueFileName = `images/${Date.now()}-${file.name}`
  const { data, error } = await supabaseClient.storage
    .from(BUCKET_NAME)
    .upload(uniqueFileName, file)

  if (error) {
    return { success: false, error: error.message, publicUrl: null }
  }

  const { data: uploadedFile } = await supabaseClient.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path)

  return { success: true, error: null, publicUrl: uploadedFile.publicUrl }
}

export const deleteImage = async (imageUrl: string) => {
  try {
    console.log('yes this ran')
    const filePath = imageUrl.split('/').slice(-2).join('/')
    const { error } = await supabaseClient.storage.from(BUCKET_NAME).remove([filePath])

    if (error) {
      return { success: false, error: error.message }
    }
    return { success: true }
  } catch (err) {
    return { success: false, error: (err as Error).message }
  }
}
