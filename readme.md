## setup for typescript with express

1. npm init --yes
2. npm install express dotenv
3. npm i -D typescript @types/express @types/node
    - After we install `typescript`, we get access to the command line TypeScript compiler through the tsc command. More on that below.
4. npx tsc --init
5. in tsconfig.json
  insert
``` json
    {
  "compilerOptions": {
    "target": "es2016",
// target: Allows us to specify the target JavaScript version that the compiler will output

    "module": "commonjs",
    // module: Allows us to use a module manager in the compiled JavaScript code. CommonJS is supported and is a standard in Node.js
    "strict": true,
// strict: An option that enables strict type-checking options

    "esModuleInterop": true,
// esModuleInterop: Allows us to compile ES6 modules to CommonJS modules

    "skipLibCheck": true,
// skipLibCheck: If set to true, skips type-checking of default library declaration files

    "forceConsistentCasingInFileNames": true
// forceConsistentCasingInFileNames: When set to true, enables case sensitive file naming
  }
}
```
6. npm install -D concurrently nodemon
7. package.json 
``` json
{
  "scripts": {
    "build": "npx tsc",
    "start": "node dist/index.js",
    "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/app.js\""
  }
}
```