import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { tagColors } from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTagColor = (i: number) => tagColors[i % tagColors.length]
