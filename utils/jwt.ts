import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";


const SECRET_KEY = process.env.JWT_SECRET || "";

export const generateToken = (payload: object) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};


export async function verifyToken(token: string | undefined) {
  const SECRET_KEY = process.env.JWT_SECRET;
  try {
    if (!token) throw new Error("no token");
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(SECRET_KEY)
    );
    console.log(payload);
  } catch (error) {
    console.error("Invalid token", error);
  }
}
