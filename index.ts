import { TelegramClient } from "telegram";
import type { NewMessageEvent } from "telegram/events";
import { NewMessage } from "telegram/events";
import { StringSession } from "telegram/sessions";
import { z } from "zod";
import { logger } from "./utils";

const env = z
  .object({
    TELEGRAM_API_ID: z.string().transform((v) => parseInt(v)),
    TELEGRAM_API_HASH: z.string(),
    TELEGRAM_SESSION: z.string(),
  })
  .parse(process.env);

const session = new StringSession(env.TELEGRAM_SESSION);
const client = new TelegramClient(
  session,
  env.TELEGRAM_API_ID,
  env.TELEGRAM_API_HASH,
  { connectionRetries: 5 }
);

const chats: string[] = [];

/**
 * You can handle the messages here
 * @see https://gram.js.org/
 */
async function handleMessages(event: NewMessageEvent) {
  const channelId = event.message.chatId?.toString();
  const channelUsername = (event.message.chat as { username: string }).username;
  if (
    (channelId && chats.includes(channelId)) ||
    chats.includes(channelUsername)
  ) {
    // Do something with the message
  }
}

client.addEventHandler(handleMessages, new NewMessage({ incoming: true }));

client.connect().catch((e) => {
  logger.error(e);
});
