import  jwt  from "jsonwebtoken";

export const createToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET);
};
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET);
};
