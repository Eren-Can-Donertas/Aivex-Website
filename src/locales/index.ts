export { en } from './en';
export { tr } from './tr';
export type { Translations } from './en';

import { en } from './en';
import { tr } from './tr';

export const locales = { en, tr } as const;
