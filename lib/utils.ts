export function cn(...classes: Array<string | false | null | undefined>) { return classes.filter(Boolean).join(' '); }
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com').replace(/\/$/, '');
