
// TypeScript Express Logo
// The Request object is used by Express to provide data about the HTTP request to the controllers of a Node.js server. Therefore, all data from the request available at the application layer depends on this object.

// You might need to elaborate on the data you received in the HTTP request and provide the controllers with custom info. In JavaScript, you can simply define new properties in the Request object and use them when needed. In TypeScript, you need to extend the Request type if you want to define custom properties.

// Let’s now learn what Request is in Express, and delve into the reasons why extending the Request type in TypeScript can be useful. Then, let’s see how you can take advantage of the extended Request object through an Express demo application built in TypeScript.

// TL;DR: Let’s learn how to extend the Request type in TypeScript to make its instances store custom data you can use at the controller level.

// What is the Request object in Express?
// Why extend Request?
// Extending the Express Request type in TypeScript
// Prerequisites
// Adding custom properties to the Request type
// Using the extended Request object
// Testing the extended Request
// What is the Request object in Express?
// The Request object represents the HTTP request performed by the client to an Express server. In other words, an Express server can read the data received from the client through Request instances. Therefore, Request has several properties to access all the information contained in the HTTP request, but the most important ones are:

// query: this object contains a property for each query string parameter present in the URL of the request:
// app.get("/users", (req: Request, res: Response) => {
//   // on GET "/users?id=4" this would print "4"
//   console.log(req.query.id)
// });
// params: this object contains the parameters defined in the API URL according to the Express routing convention:
// app.get("/users/:id", (req: Request, res: Response) => {
//   // on GET "/users/1" this would print "1"
//   console.log(req.params.id)
// });
// body: this object contains key-value pairs of data submitted in the body of the HTTP request:
// app.get("/users", (req: Request<never, never, { name: string; surname: string }, never>, res: Response) => {
//   const { name, surname } = req.body

//   // ...
// })
// headers: this object contains a property for each HTTP header sent by the request.
// cookies: when using the cookie-parser Express middleware, this object contains a property for each cookie sent by the request
// Why extend Request?
// Express controllers can access all the data contained in an HTTP request with the Request object. This does not mean that the Request object is the only way to interact with the controllers. On the contrary, Express also supports middlewares. Express middlewares are functions that can be used to add application-level or router-level functionality.

// The middleware functions are associated with the endpoints at the router level as follows:

// const authenticationMiddleware = require("../middlewares/authenticationMiddleware")
// const FooController = require("../controllers/foo")

// app.get(
//   "/helloWorld",
//   FooController.helloWorld, // (req, res) => { res.send("Hello, World!") }
//   // registering the authenticationMiddleware to the "/helloWorld" endpoint
//   authenticationMiddleware,
// )
// Note that middleware functions are executed before the controller function containing the business logic of the API is called. Learn more about how they work and what the Express middlewares can offer here.

// What is important to notice here is that middlewares can modify the Request object, adding custom information to make it available at the controller level. For example, let’s say you want to make your APIs available only to users with a valid authentication token. To achieve this, you can define a simple authentication middleware as follows:

// import { Request, Response, NextFunction } from "express"

// export function handleTokenBasedAuthentication(req: Request, res: Response, next: NextFunction) {
//   const authenticationToken = req.headers["authorization"]

//   if (authenticationToken !== undefined) {
//     const isTokenValid = // verifying if authenticationToken is valid with a query or an API call...

//     if (isTokenValid) {
//       // moving to the next middleware
//       return next()
//     }
//   }

//   // if the authorization token is invalid or missing returning a 401 error
//   res.status(401).send("Unauthorized")
// }
// When the authentication token received in the Authorization header of the HTTP request is valid, this value is uniquely associated with a user of your service. In other words, the authentication token allows you to identify the user who is making the request, which is very important to know. For example, the business logic at the controller level may change depending on the user’s role.

// If several controller-level functions need to know who the user who performed the API call is, you have to replicate the logic required to retrieve the user from the Authorization header in multiple places. Instead, you should extend the Request object with a user property and give it a value in the authentication middleware.

// Notice that the Express Request type in TypeScript does not involve a user property. This means that you cannot simply extend the Request object as follows:

// import { Request, Response, NextFunction } from "express"

// export function handleTokenBasedAuthentication(req: Request, res: Response, next: NextFunction) {
//   const authenticationToken = req.headers["authorization"]

//   if (authenticationToken !== undefined) {
//     const isTokenValid = // verifying if authenticationToken is valid with a query or an API call...

//     if (isTokenValid) {
//       const user = // retrieving the user info based on authenticationToken  

//       req["user"] = user // ERROR: Property 'user' does not exist on type 'Request'

//       // moving to the next middleware
//       return next()
//     }
//   }

//   // if the authorization token is invalid or missing returning a 401 error
//   res.status(401).send("Unauthorized")
// }
// This would lead to the following error:

// Property 'user' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
// Similarly, you can use an extended Request to avoid type casting at the controller level and make your codebase cleaner and robust. Let’s assume your backend application supports only three languages: English, Spanish, and Italian. In other terms, you already know that the Content-Language HTTP headers can only accept en, es, and it. When the header is omitted or contains an invalid value, you want the English language to be used as default.

// Keep in mind that req.headers["Content-Language"] returns a string | string[] | undefined type. This means that if you want to use Content-Language header value as a string, you have to cast it as follows:

// const language = (req.headers["content-language"] || "en") as string | undefined
// Filling your code with this logic is not an elegant solution. Instead, you should use a middleware to extend Request as below:

// import { Request, Response, NextFunction } from "express"

// const SUPPORTED_LANGUAGES = ["en", "es", "it"]
// // this syntax is equals to "en" | "es" | "it"
// export type Language = typeof SUPPORTED_LANGUAGES[number] 

// export function handleCustomLanguageHeader(req: Request, res: Response, next: NextFunction) {
//   const languageHeader = req.headers["content-language"]

//   // default language: "en"
//   let language: Language = SUPPORTED_LANGUAGES[0]

//   if (typeof languageHeader === "string" && SUPPORTED_LANGUAGES.includes(languageHeader)) {
//     language = languageHeader
//   }

//   // extending the Request object with a language property of type Language...

//   return next()
// }
// These were just two examples, but there are several other scenarios where extending Request with custom data can save you time and make your codebase more elegant and maintainable.

// Extending the Express Request type in TypeScript
// Adding extra fields to the Express Request type definition only takes a few lines of code. Let’s see how to achieve it and take advantage of the extended object through a demo application based on the middlewares presented earlier.

// Clone the GitHub repository that supports the article and launch the sample backend application locally with the following commands:

// git clone https://github.com/Tonel/extend-express-request-ts-demo
// cd extend-express-request-ts-demo
// npm i
// npm start
// Keep following the article to learn how to take advantage of the extended Express Request type in TypeScript.

// Prerequisites
// You need these prerequisites to replicate the article’s goal:

// express >= 4.x
// @types/express >= 4.x
// typescript >= 4.x
// If you do not have an Express project in Typescript, you can learn how to set up an Express and TypeScript project from scratch here.

// Adding custom properties to the Request type
// All you have to do to extend the Request type is define an index.d.ts file as follows:

// // src/types/express/index.d.ts

// import { Language, User } from "../custom";

// // to make the file a module and avoid the TypeScript error
// export {}

// declare global {
//   namespace Express {
//     export interface Request {
//       language?: Language;
//       user?: User;
//     }
//   }
// }
// Place this file in the src/types/express folder. Typescript uses the .d.ts declaration files to load type information about a library written in JavaScript. Here, the index.d.ts global module will be used by TypeScript to extend the Express Request type globally.

// The Language and User custom types are defined in the src/types/custom.ts file as below:

// // src/types/custom.ts

// export const SUPPORTED_LANGUAGES = ["en", "es", "it"]
// // this syntax is equals to "en" | "es" | "it"
// export type Language = typeof SUPPORTED_LANGUAGES[number]

// export type User = {
//     id: number,
//     name: string,
//     surname: string,
//     authenticationToken : string | null
// }
// These types will be used in the handleCustomLanguageHeader() and handleTokenBasedAuthentication() middleware functions, respectively. Let’s see how.

// Using the extended Request object
// Now, let’s learn how you can employ the extended Request object. First, let’s complete the middleware functions introduced earlier. This is what authentication.middleware.ts looks like:

// // src/middlewares/authentication.middleware.ts 

// import { Request, Response, NextFunction } from "express"
// import { User } from "../types/custom"

// // in-memory database
// const users: User[] = [
//     {
//         id: 1,
//         name: "Maria",
//         surname: "Williams",
//         authenticationToken: "$2b$08$syAMV/CyYt.ioZ3w5eT/G.omLoUdUWwTWu5WF4/cwnD.YBYVjLw2O",
//     },
//     {
//         id: 2,
//         name: "James",
//         surname: "Smith",
//         authenticationToken: null,
//     },
//     {
//         id: 3,
//         name: "Patricia",
//         surname: "Johnson",
//         authenticationToken: "$2b$89$taWEB/dykt.ipQ7w4aTPGdo/aLsURUWqTWi9SX5/cwnD.YBYOjLe90",
//     },
// ]

// export function handleTokenBasedAuthentication(req: Request, res: Response, next: NextFunction) {
//     const authenticationToken = req.headers["authorization"]

//     if (authenticationToken !== undefined) {
//         // using the in-memory sample database to verify if authenticationToken is valid
//         const isTokenValid = !!users.find((u) => u.authenticationToken === authenticationToken)

//         if (isTokenValid) {
//             // retrieving the user associated with the authenticationToken value
//             const user = users.find((u) => u.authenticationToken === authenticationToken)

//             req.user = user

//             // moving to the next middleware
//             return next()
//         }
//     }

//     // if the authorization token is invalid or missing returning a 401 error
//     res.status(401).send("Unauthorized")
// }