import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function encodeToken(token:string):string{
  return btoa(token);
}

export function decodeToken(token:string):string{
  return atob(token);
}