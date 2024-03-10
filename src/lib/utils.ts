import { type ClassValue, clsx } from "clsx"
import path from "path"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(oath:string){
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}