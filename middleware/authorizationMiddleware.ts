import { TokenExpiredError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { secret } from "../config/secrets";
import {UserRole} from "../enums/userRoleEnum";
const jwt = require("jsonwebtoken");

const checkRoleInToken = (userRole: UserRole, roles: UserRole[], res: Response) => {
  let hasRole = false;

    if (roles.includes(userRole)) {
      hasRole = true;
    }

  if (!hasRole) {
    return res.status(403).json({ message: "You have not access" });
  }
}

const authorizationMiddleware = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") {
      next();
    }

    const token = req.cookies.token;

    try {
      if (!token) {
        return res.status(200).json({message: "Authorization token is missing or invalid"});
      }
      const { role } = jwt.verify(token, secret);
      checkRoleInToken(role, roles, res);
      next();
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        console.log("expired")
        const payload = jwt.decode(token);
        const newToken = jwt.sign({
          id: payload.id,
          role: payload.role,
        }, secret, { expiresIn: "1d" });
        console.log(newToken);
        res.cookie('token', newToken, {
          httpOnly: true,
          secure: false,
        });
        checkRoleInToken(payload.role, roles, res);
        next();
      }
    }
  }
};

export default authorizationMiddleware;