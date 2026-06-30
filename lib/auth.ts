import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function createAdminToken() {
  return jwt.sign(
    {
      admin: true,
    },
    SECRET,
    {
      expiresIn: "30d",
    }
  );
}

export function verifyAdminToken(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}