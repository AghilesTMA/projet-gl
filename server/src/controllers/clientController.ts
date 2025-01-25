import { sql } from "drizzle-orm";
import { db } from "../db";
import { Request, Response } from "express";
import { selectClient, selectStore, selectUser } from "../db/schema";
import {
  changePasswordReq,
  resetPasswordReq,
  updateClientReq,
  updateStoreReq,
  updateUserReq,
} from "../types/zod";
import { compare, genSalt, hash } from "bcrypt";
import { redisClient } from "../db/redisClient";
import crypto from "crypto";
import "../db/redisClient";
import { transporter } from "../utils/transporter";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { id: myId, type } = req;
    const client = await db.transaction(async (tx) => {
      try {
        if (type == "user") {
          const userArr = await tx.execute(sql`
            SELECT
            "clients"."userName" AS "userName",
            "clients"."email" AS "email",
            "clients"."image" AS "image",
            "users"."dateOfBirth" AS "dateOfBirth",
            "users"."fullName" AS "fullName",
            "clients"."created_at" AS "created_at"
            FROM "clients"
            INNER JOIN "users" ON "clients"."id" = "users"."clientId"
            WHERE "clients"."id" = ${myId}
          `);
          if (userArr.length < 1) {
            res.status(404).json({ msg: "User not found!" });
            return;
          }
          return { ...userArr[0] };
        }
        if (type == "store") {
          const storesArr = await tx.execute(sql`
            SELECT
            "clients"."userName" AS "userName",
            "clients"."email" AS "email",
            "clients"."image" AS "image",
            "clients"."created_at" AS "created_at",
            "stores"."storeTitle" AS "storeTitle",
            "stores"."address" AS "address",
            "stores"."isSponsored" AS "isSponsored",
            "stores"."wilaya" AS "wilaya",
            "stores"."comune" AS "comune",
            "stores"."lan" AS "lan",
            "stores"."lat" AS "lat"
            FROM "clients"
            INNER JOIN "stores" ON "clients"."id" = "stores"."clientId"
            WHERE "clients"."id" = ${myId}
          `);
          if (storesArr.length < 1) {
            res.status(404).json({ msg: "User not found!" });
            return;
          }
          return { ...storesArr[0] };
        }
      } catch (error) {
        throw error;
      }
    });
    res
      .status(200)
      .json({ msg: "profile fetched succussfully!", profile: client });
  } catch (error) {
    console.log(error);
    res.status(500).json("server error happened!");
    return;
  }
};

export const getProfileByName = async (req: Request, res: Response) => {
  try {
    const { userName } = req.params;
    const client = await db.transaction(async (tx) => {
      try {
        const clientPartArr: selectClient[] = await tx.execute(sql`
          select * from "clients"
          where "userName" = ${userName}
          `);
        if (clientPartArr.length < 1) return;
        const {
          id: Id,
          updated_at,
          role,
          password,
          ...client
        } = clientPartArr[0];
        if (role == "user") {
          const userPartArr: selectUser[] = await tx.execute(sql`
              select * from "users"
              where "clientId" = ${Id}
            `);
          const { id, updated_at, clientId, created_at, ...user } =
            userPartArr[0];
          console.log({ ...client, ...user });
          if (userPartArr.length < 1) return;
          return { ...client, ...user };
        }
        if (role == "store") {
          const storePartArr: selectStore[] = await tx.execute(sql`
              select * from "stores"
              where "clientId" = ${Id}
            `);
          const { id, clientId, created_at, updated_at, ...store } =
            storePartArr[0];
          if (storePartArr.length < 1) return;
          return { ...client, ...store };
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    });
    if (!client) {
      res.status(404).json({ msg: "Clinet not found!!" });
      return;
    }
    res
      .status(200)
      .json({ msg: "profile fetched succussfully!", profile: client });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error happened!" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const {
      userName,
      email,
      image,
      dateOfBirth,
      fullName,
      lan,
      lat,
      wilaya,
      comune,
      storeTitle,
      address,
    } = req.body;
    updateClientReq.parse({ userName, email, image });
    if (req.type == "user") {
      updateUserReq.parse({ dateOfBirth, fullName });
    }
    if (req.type == "store") {
      updateStoreReq.parse({ lan, lat, wilaya, comune, storeTitle, address });
    }

    const client = await db.transaction(async (tx) => {
      try {
        const clientPartArr = await tx.execute(sql`
          UPDATE "clients"
          SET
            "userName" = COALESCE(${userName || null}, "userName"),
            "email" = COALESCE(${email || null}, "email"),
            "image" = COALESCE(${image || null}, "image")
          WHERE "id" = ${req.id}
          RETURNING "userName","email","image","created_at";
        `);
        const client = clientPartArr[0];
        if (req.type == "user") {
          const userPartArr = await tx.execute(sql`
            UPDATE "users"
            SET
              "dateOfBirth" = COALESCE(${dateOfBirth || null}, "dateOfBirth"),
              "fullName" = COALESCE(${fullName || null}, "fullName")
            WHERE "clientId" = ${req.id}
            RETURNING "dateOfBirth","fullName";
          `);
          const user = userPartArr[0];
          return { ...client, ...user };
        }
        if (req.type == "store") {
          const storePartArr = await tx.execute(sql`
            UPDATE "stores"
            SET
              "storeTitle" = COALESCE(${storeTitle || null}, "storeTitle"),
              "address" = COALESCE(${address || null}, "address"),
              "wilaya" = COALESCE(${wilaya || null}, "wilaya"),
              "comune" = COALESCE(${comune || null}, "comune"),
              "lan" = COALESCE(${lan || null}, "lan"),
              "lat" = COALESCE(${lat || null}, "lat")
            WHERE "clientId" = ${req.id}
            RETURNING "storeTitle","address","wilaya","comune","lan","lat";
          `);
          const store = storePartArr[0];
          return { ...client, ...store };
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    });

    res
      .status(200)
      .json({ msg: "profile updated successfully!", profile: client });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error!" });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body;
    changePasswordReq.parse({ oldPassword, newPassword });
    const dbPassword: { password: string }[] = await db.execute(sql`
      SELECT "password" FROM "clients"
      WHERE "id" = ${req.id}
    `);
    const passMatch = await compare(oldPassword, dbPassword[0].password);
    if (!passMatch) {
      res.status(403).json({ msg: "Wrong password!!" });
      return;
    }

    const salt = await genSalt(10);
    const updatedPass = await hash(newPassword, salt);
    await db.execute(sql`
      UPDATE "clients"
          SET
            "password" = ${updatedPass}
          WHERE "id" = ${req.id}
    `);
    res.status(200).json({ msg: `Password was updated successfully!` });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error happened!!" });
    return;
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const clientArr: selectClient[] = await db.execute(sql`
      SELECT * FROM "clients"
      WHERE "id" = ${id}
    `);
    if (clientArr.length < 1) {
      res.status(404).json({ msg: "User not found!" });
      return;
    }
    const token = crypto.randomBytes(32).toString("hex");
    const hash = crypto.createHash("sha256");
    hash.update(token);
    const hashedToken = hash.digest("hex");
    await redisClient.setEx(String(id), 60 * 10, hashedToken);

    const info = await transporter.sendMail({
      from: `${process.env.MY_EMAIL}`,
      to: `${clientArr[0].email}`,
      subject: "Forgot Password Token",
      text: `
        An email from: DZ-ESTATE
        subject: Forgot password Token
        Content:
        Your token is:
        ${token}
      `,
    });

    if (!info) {
      res.status(400).json({
        msg: "email wasn't sent make sure this email is valid or try later",
      });
      return;
    }

    res.status(200).json({
      msg: `Token has been sent to ur email address, token will expire after 10mins`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error happened!" });
    return;
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { newPassword, token } = req.body;
    resetPasswordReq.parse({ newPassword, token });

    const hashed = crypto.createHash("sha256");
    hashed.update(token);
    const hashedToken = hashed.digest("hex");

    const redisToken = await redisClient.get(String(req.id)).catch((err) => {
      console.log(err);
    });

    if (!redisToken) {
      res.status(498).json({ msg: "Your token is expired!" });
      return;
    }

    const tokensMatch = hashedToken == redisToken;
    if (!tokensMatch) {
      res.status(498).json({ msg: "Your token in invalid!" });
      return;
    }

    const salt = await genSalt(10);
    const newHashedPass = await hash(newPassword, salt);

    await db.execute(sql`
      UPDATE "clients"
        SET
          "password" = ${newHashedPass}
        WHERE "id" = ${req.id}
    `);
    await redisClient.del(String(req.id));

    res.status(200).json({ msg: "Password has been updated succussfully!!" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error happened!" });
    return;
  }
};