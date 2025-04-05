import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currency: string = 'Rp'): string {
  const formattedNumber = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${currency}${formattedNumber}`;
}
