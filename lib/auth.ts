import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";

const SESSION_SECRET = process.env.ADMIN_COOKIE_SECRET ?? "tsghee-dev-secret";
const SESSION_NAME = "tsghee_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

export function hashPassword(password: string, salt?: string) {
  const actualSalt = salt ?? randomBytes(16).toString("hex");
  const derived = scryptSync(password, actualSalt, 64).toString("hex");
  return `${actualSalt}:${derived}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, storedHash] = stored.split(":");
  if (!salt || !storedHash) return false;
  const derivedHash = scryptSync(password, salt, 64).toString("hex");
  try {
    return timingSafeEqual(Buffer.from(derivedHash, "hex"), Buffer.from(storedHash, "hex"));
  } catch {
    return false;
  }
}

export function createAdminSessionToken(adminId: string) {
  const expires = Date.now() + SESSION_TTL_SECONDS * 1000;
  const payload = `${adminId}|${expires}`;
  const signature = createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
  return Buffer.from(`${payload}|${signature}`).toString("base64");
}

export function verifyAdminSessionToken(token: string | null | undefined) {
  if (!token) return null;

  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [adminId, expiresString, signature] = decoded.split("|");
    if (!adminId || !expiresString || !signature) return null;

    const payload = `${adminId}|${expiresString}`;
    const expected = createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
    if (!timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(signature, "hex"))) {
      return null;
    }

    const expires = Number(expiresString);
    if (Number.isNaN(expires) || Date.now() > expires) {
      return null;
    }

    return adminId;
  } catch {
    return null;
  }
}

export function getAdminSessionCookieName() {
  return SESSION_NAME;
}

export function createAdminSessionCookie(adminId: string) {
  return {
    name: SESSION_NAME,
    value: createAdminSessionToken(adminId),
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: SESSION_TTL_SECONDS,
  };
}

export function clearAdminSessionCookie() {
  return {
    name: SESSION_NAME,
    value: "",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 0,
  };
}
