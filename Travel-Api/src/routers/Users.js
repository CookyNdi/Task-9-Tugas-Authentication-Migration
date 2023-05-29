import express from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/Users.js";
import { authentication, authorization } from "../middlewares/AuthUser.js";
const router = express.Router();

router.get("/users", authentication, getUsers);
router.get("/users/:id", authentication, getUserById);
router.post("/users", createUser);
router.patch("/users/:id", authentication, authorization, updateUser);
router.delete("/users/:id", authentication, authorization, deleteUser);

export default router;
