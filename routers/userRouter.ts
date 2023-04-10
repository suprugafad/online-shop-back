import { Router } from "express";
import userController from "../controllers/userController";
const cors = require("cors");

const router = Router();

router.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;