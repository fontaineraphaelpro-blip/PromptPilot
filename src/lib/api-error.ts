import { NextResponse } from "next/server";

export function apiError(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

export function safeErrorMessage(error: unknown, fallback: string): string {
  if (process.env.NODE_ENV === "development" && error instanceof Error) {
    return error.message;
  }
  return fallback;
}
