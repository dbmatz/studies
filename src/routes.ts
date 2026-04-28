import { Router } from "express";
import { userController } from "./infra/http/containers/user.container";

const router = Router();

router.get("/", (req, res) => {
  return res.status(201).send({ periquito: "australiano" });
});
router.post("/user", (req, res) => userController.createUser(req, res));

export { router };
