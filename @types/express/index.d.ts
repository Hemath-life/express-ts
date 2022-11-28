/* eslint-disable @typescript-eslint/no-explicit-any */
// Src/types/express/index.d.ts

import { Language, User } from '../custom';

// To make the file a module and avoid the TypeScript error
export {};

declare global {
    namespace Express {
        export interface Request {
            language?: Language;
            user?: User;
        }
        export interface Response {
            success(data: any): Response;
            serverError(code: number, data: any): Response;
            displayError(code: number, data: any): Response;
            unauthorized(data: any): Response;
        }
    }
}
// Place this file in the src/types/express folder. Typescript uses the .d.ts declaration files to load type information about a library written in JavaScript. Here, the index.d.ts global module will be used by TypeScript to extend the Express Request type globally.
