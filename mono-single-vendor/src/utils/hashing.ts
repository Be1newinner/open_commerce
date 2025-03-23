import argon2 from "argon2";

async function hashing(text: string): Promise<string> {
  if (!text) throw new Error("INPUT IS REQUIRED!");

  try {
    return await argon2.hash(text);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Hashing failed! Reason: ${error.message}`);
    }
    throw new Error("Hashing failed due to an unknown error.");
  }
}

async function verifyHash(plainText: string, hashed: string): Promise<boolean> {
  if (!plainText || !hashed)
    throw new Error("PLAIN_TEXT and HASHED are required!");

  try {
    return await argon2.verify(hashed, plainText);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Hash verification failed! Reason: ${error.message}`);
    }
    throw new Error("Hash verification failed due to an unknown error.");
  }
}

export { hashing, verifyHash };
