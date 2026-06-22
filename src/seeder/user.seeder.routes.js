import * as seedController from "./user.seeder.controller.js";
import { Router } from "express";

const router = Router();

router.post("/", seedController.seedUsers);

export default router;
