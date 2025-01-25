import { z } from "zod";

export const signupReq = z.object({
  type: z.enum(["store", "user"]),
  userName: z.string(),
  email: z.string().email({ message: "must be email" }),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 characters" }),
  image: z.string(),
});

export const signupReqUser = z.object({
  fullName: z.string(),
  dateOfBirth: z.string(),
});

export const signupReqStore = z.object({
  storeTitle: z.string(),
  wilaya: z.string(),
  comune: z.string(),
  address: z.string(),
  lan: z.number(),
  lat: z.number(),
});

export const loginReq = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const updateClientReq = z.object({
  email: z.string().email().optional(),
  userName: z.string().optional(),
  image: z.string().optional(),
});

export const updateUserReq = z.object({
  fullName: z.string().optional(),
  dateOfBirth: z.string().optional(),
});

export const updateStoreReq = z.object({
  storeTitle: z.string().optional(),
  address: z.string().optional(),
  wilaya: z.string().optional(),
  comune: z.string().optional(),
  lan: z.number().optional(),
  lat: z.number().optional(),
});

export const changePasswordReq = z.object({
  oldPassword: z
    .string()
    .min(8, { message: "password must be at least 8 characters" }),
  newPassword: z
    .string()
    .min(8, { message: "password must be at least 8 characters" }),
});

export const resetPasswordReq = z.object({
  token: z.string(),
  newPassword: z
    .string()
    .min(8, { message: "password must be at least 8 characters" }),
});

export const createChatReq = z.object({
  to: z.string(),
});

export const sendMessageReq = z.object({
  chatId: z.string(),
  content: z.string(),
});
