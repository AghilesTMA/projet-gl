import "express";

declare module "express" {
  export interface Request {
    id?: string;
    type?: string;
  }
}

export type cookieOpt = {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax" | "none" | "strict";
  maxAge: number;
};
