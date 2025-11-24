import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const NextAuth(authConfig).auth;

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}