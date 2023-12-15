import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateDaysDifference(dateString:any) {
  const dateObject:any = new Date(dateString);
  const currentDate:any = new Date();

  // Calculate the difference between the two dates in milliseconds
  const timeDifference = currentDate - dateObject;

  // Convert milliseconds to days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference === 0) {
    return 'today';
  } else if (daysDifference === 1) {
    return 'yesterday';
  } else {
    return `${daysDifference} days ago`;
  }
}