// Src/types/custom.ts

export const SUPPORTED_LANGUAGES = ['en', 'es', 'it'];
// This syntax is equals to "en" | "es" | "it"
export type Language = typeof SUPPORTED_LANGUAGES[number];

export type User = {
    id: number;
    name: string;
    surname: string;
    authenticationToken: string | null;
};
