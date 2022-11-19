## What is 'declare global' in Typescript ?

-   This is not dependent on compiler settings. declare global is used inside a file that has import or export to declare things in the global scope. This is necessary in files that contain import or export since such files are considered modules, and anything declared in a module is in the module scope.

-   Using declare global in a file that is not a module (that is contains no import/export) is an error since everything in such a file is in the global scope anyway.

## What is namespace in ts ?

-   modules are much better then namespaces
-   `internal modules` are namespaces. `external modules` are modules
-   Place this file in the src/types/express folder. Typescript uses the .d.ts declaration files to load type information about a library written in JavaScript. Here, the index.d.ts global module will be used by TypeScript to extend the Express Request type globally.
