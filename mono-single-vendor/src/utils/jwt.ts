import jsonwebtoken from "jsonwebtoken";
import { StringValue } from "../constants/types.ts";

interface TokenPayload {
  uid: string;
  email: string;
  role: string;
  expiry?: StringValue | number;
}

interface DecodedToken {
  uid: string;
  email: string;
  role: string;
}

async function createToken({
  uid,
  email,
  role,
  expiry,
}: TokenPayload): Promise<string> {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET NOT FOUND");

  if (!uid || !email || !role || !expiry)
    throw new Error(
      "uid, email, role, expiry are required for token generation!"
    );

  return jsonwebtoken.sign({ uid, email, role }, process.env.JWT_SECRET, {
    expiresIn: expiry,
  });
}

async function generateAccessToken({
  uid,
  email,
  role,
}: Omit<TokenPayload, "expiry">): Promise<string> {
  return createToken({ uid, email, role, expiry: "1h" });
}

async function generateRefreshToken({
  uid,
  email,
  role,
}: Omit<TokenPayload, "expiry">): Promise<string> {
  return createToken({ uid, email, role, expiry: 604800 * 2 }); // 2 Weeks
}

async function generateLoginTokens({
  uid,
  email,
  role,
}: Omit<TokenPayload, "expiry">): Promise<{
  accessToken: string;
  refreshToken: string;
}> {
  return {
    accessToken: await generateAccessToken({ uid, email, role }),
    refreshToken: await generateRefreshToken({ uid, email, role }),
  };
}

async function decryptToken(token: string): Promise<DecodedToken> {
  if (!process.env.JWT_SECRET || typeof process.env.JWT_SECRET !== "string") {
    throw new Error("JWT_SECRET NOT FOUND OR INVALID");
  }

  if (!token || typeof token !== "string") {
    throw new Error("TOKEN IS REQUIRED AND MUST BE A STRING");
  }

  try {
    const data = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET
    ) as DecodedToken;
    return { uid: data.uid, email: data.email, role: data.role };
  } catch (error: unknown) {
    console.error(error);
    throw new Error("Invalid or expired token");
  }
}

export {
  createToken,
  generateAccessToken,
  generateRefreshToken,
  generateLoginTokens,
  decryptToken,
};
