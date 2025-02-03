import { Request } from "express";

export function cookieExtractor(req: Request): string | null {
  const authHeaders = req.headers.authorization;

  if (authHeaders && authHeaders.startsWith("Bearer"))
    return authHeaders.split(" ")[1];

  if (req && req.cookies) return req.cookies["jwt"];

  return null;
}
