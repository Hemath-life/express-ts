import { Router } from "express";
const routes = Router();

// import components
import UserController from '../components/user/index'

routes.get("/users", UserController.index);


export default routes;