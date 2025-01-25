import { Request, Response } from "express";
import {
  signupReq,
  signupReqUser,
  signupReqStore,
  loginReq,
} from "../types/zod";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { hash, genSalt, compare } from "bcrypt";
import { db } from "../db";
import { sql } from "drizzle-orm";
import { clintsTable, selectClient, storeTable, userTable } from "../db/schema";
import { cookieOptions } from "../config";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, type } = req.body;
    loginReq.parse({ email, password, type });

    const client: selectClient[] = await db.execute(sql`
        SELECT * FROM "clients"
        WHERE email = ${email}
      `);

    if (client.length < 1) {
      res.status(404).json({ msg: "User not found!" });
      return;
    }
    
    const passwordMatch = await compare(password, client[0].password);
    if (!passwordMatch) {
      res.status(403).json({ msg: "Wrong password!" });
      return;
    }

    const token = jwt.sign(
      {
        id: client[0].id,
        email: client[0].email,
        userName: client[0].userName,
        image: client[0].image,
        type: client[0].role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "3d",
      }
    );

    res.cookie("jwt", token, cookieOptions);

    res.status(200).json({
      msg: {
        userName: client[0].userName,
        email: client[0].email,
        image: client[0].image,
      },
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error happened!" });
    return;
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const {
      type,
      userName,
      email,
      password,
      image,
      fullName,
      dateOfBirth,
      storeTitle,
      wilaya,
      comune,
      lat,
      lan,
      address,
    } = req.body;

    signupReq.parse({ type, userName, email, password, image });
    if (type == "user") {
      signupReqUser.parse({ fullName, dateOfBirth });
    }
    if (type == "store") {
      signupReqStore.parse({ storeTitle, wilaya, comune, lat, lan, address });
    }

    const salt = await genSalt(10);
    const hashedPass = await hash(password, salt);

    const client: { id: string }[] = await db.execute(sql`
        INSERT INTO ${clintsTable} ("userName", "email", "password", "image","role") values(
          ${userName},
          ${email},
          ${hashedPass},
          ${image},
          ${type}
        )
        RETURNING (id)
      `);

    if (type == "user") {
      const user: { id: string }[] = await db.execute(sql`
        INSERT INTO ${userTable} ("clientId", "fullName", "dateOfBirth") values(
          ${client[0].id},
          ${fullName},
          ${dateOfBirth}
        )
        RETURNING (id)
      `);
      console.log(user);
    }
    if (type == "store") {
      const store: { id: string }[] = await db.execute(sql`
        INSERT INTO ${storeTable} ("clientId", "address", "isSponsored","lan","lat","storeTitle","wilaya","comune") values(
          ${client[0].id},
          ${address},
          ${false},
          ${lan},
          ${lat},
          ${storeTitle},
          ${wilaya},
          ${comune}
        )
        RETURNING (id)
      `);
      console.log("store", store);
    }

    const token = jwt.sign(
      {
        id: client[0].id,
        email: email,
        userName: userName,
        image: image,
        type,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "3d",
      }
    );
    res.cookie("jwt", token, cookieOptions);
    res.status(200).json({ user: client[0].id });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
    return;
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const cookie = req.cookies;
    if (!cookie?.jwt) {
      res.sendStatus(204);
      return;
    }
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV !== "development",
    });
    res.status(200).json({ msg: "cookie cleared" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error happened!" });
  }
};

export const verifyLogin = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.sendStatus(204);
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
          res.status(403).json({ msg: "Forbidden!" });
          return;
        }
        if (
          decoded &&
          typeof decoded == "object" &&
          "id" in decoded &&
          "userName" in decoded &&
          "image" in decoded &&
          "email" in decoded &&
          "type" in decoded
        )
          res.status(200).json({
            msg: "User logged in",
            data: {
              userName: decoded.userName,
              email: decoded.email,
              image: decoded.image,
            },
          });
        return;
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error happened!" });
    return;
  }
};
