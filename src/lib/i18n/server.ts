import { cookies } from "next/headers";
import { getMessages, t, type Messages } from "./get-messages";
import { isLocale, LOCALE_COOKIE, type Locale } from "./types";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : "fr";
}

export async function getServerMessages(): Promise<Messages> {
  return getMessages(await getServerLocale());
}

export async function getServerT() {
  const messages = await getServerMessages();
  return (path: string) => t(messages, path);
}
