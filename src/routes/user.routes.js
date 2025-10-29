import {Router} from "express";
import {createUser} from "../controllers/user.controller.js";
import {userSchema} from "../../utils/validators.js";
import {validate} from "../middleware/validate.js";

const router = Router();

router.post("/", validate(userSchema), createUser);

export default router;
