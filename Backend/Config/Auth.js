import { randomBytes } from "node:crypto";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { expo } from "@better-auth/expo";

export function createAuth(db) {
  return betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:5000",
    secret: process.env.BETTER_AUTH_SECRET,
    database: mongodbAdapter(db),
    trustedOrigins: [process.env.WEB_ORIGIN || "http://localhost:5173", "mobile://"],
    user: {
      modelName: "users",
      additionalFields: { username: { type: "string", input: false } },
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
    },
    databaseHooks: {
      user: { create: { before: async (user) => ({
        data: { ...user, username: `user_${randomBytes(8).toString("hex")}` },
      }) } },
    },
    plugins: [expo()],
  });
}
