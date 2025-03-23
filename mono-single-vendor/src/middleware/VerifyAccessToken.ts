import { Request, Response, NextFunction } from "express";
import { decryptToken } from "../utils/jwt.ts";

interface AuthenticatedRequest extends Request {
  locals?: {
    uid: string;
    email: string;
    role: string;
  };
}

async function VerifyAccessTokenMiddleWare(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let token = req.headers.authorization;

    if (!token) {
      throw new Error("ACCESS TOKEN NOT FOUND!");
    }

    token = token.replace("Bearer ", "");
    const data = await decryptToken(token);

    req.locals = data; // Attaching decoded token data to `locals`
    next();
  } catch (error) {
    res.status(401).json({
      message: (error as Error).message || "Unauthorized access",
      data: null,
    });
  }
}

export { VerifyAccessTokenMiddleWare };
