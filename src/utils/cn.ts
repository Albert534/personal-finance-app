import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function cn(...inputs: unknown[]) {
	return twMerge(clsx(inputs));
}
