import Users from "../models/Users.js";
import { verifyToken } from "../helpers/jwt.js";

export const authentication = async (req, res, next) => {
  const { access_token } = req.headers;
  if (!access_token) {
    return res.status(401).json({ msg: "Mohon Untuk Login Terlebih Dahulu!!" });
  }
  const payload = verifyToken(access_token);
  const user = await Users.findOne({
    where: {
      id: payload.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User Tidak Di Temukan" });
  req.userId = user.id;
  req.name = user.name;
  next();
};

export const authorization = async (req, res, next) => {
  const { access_token } = req.headers;
  if (!access_token) {
    return res.status(401).json({ msg: "Mohon Untuk Login Terlebih Dahulu!!" });
  }
  const payload = verifyToken(access_token);
  const result = await Users.findByPk(req.params.id);
  if (!result) return res.status(404).json({ msg: "User Tidak Di Temukan" });
  if (result.id == payload.id) {
    next();
  } else {
    return res.status(401).json({ msg: "Unauthorized" });
  }
};
