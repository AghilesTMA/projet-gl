import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) {
      res.status(403).json({ msg: "forbidden!" });
      return;
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET!,
      <JwtPayload>(
        error: VerifyErrors | null,
        decoded: JwtPayload | undefined
      ) => {
        if (error) {
          console.log(error);
          res.status(401).json({ msg: "unauthorized!" });
          return;
        }
        if (
          decoded &&
          typeof decoded == "object" &&
          "id" in decoded &&
          typeof decoded.id == "string" &&
          "type" in decoded &&
          typeof decoded.type == "string"
        ) {
          req.id = decoded.id;
          req.type = decoded.type;
        }
        next();
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error happened!" });
    return;
  }
};
