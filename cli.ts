/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Command } from "commander";
import prompts from "prompts";
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { z } from "zod";
import { logger } from "./utils";

const schema = z.object({
  forceSms: z.boolean().optional(),
});

export const Telegram = new Command()
  .name("login")
  .description("This wil setup telegram session for you")
  .option("--force-sms", "Force SMS for verification code")
  .action(async (opts) => {
    const data = schema.parse(opts);
    const apiId = process.env.TELEGRAM_API_ID;
    const apiHash = process.env.TELEGRAM_API_HASH;
    if (!apiId || !apiHash) {
      logger.error("Please add API Id and API Hash on the root .env file.");
      process.exit(1);
    }
    const client = new TelegramClient(
      new StringSession(""),
      parseInt(apiId),
      apiHash,
      { connectionRetries: 5 }
    );
    await client.start({
      phoneNumber: async () =>
        (
          await prompts({
            type: "text",
            name: "phoneNumber",
            message: "Please Input Your Phone Number: ",
          })
        ).phoneNumber,
      password: async () =>
        (
          await prompts({
            type: "text",
            name: "password",
            message: "Please Input Your Password: ",
          })
        ).password,
      phoneCode: async (isCodeViaApp) =>
        (
          await prompts({
            type: "text",
            name: "code",
            message: "Please Input the code: ",
            hint: isCodeViaApp
              ? "Verification code has been sent to your telegram app"
              : "Verification code has been sent to your phone",
          })
        ).code,
      onError: (err) => logger.error(err),
      forceSMS: data.forceSms,
    });
    logger.success("Done!");
    logger.info(
      `Save the string below in the root .env file\n\nTELEGRAM_SESSION=${
        client.session.save() as unknown as string
      }`
    );
  });

function main() {
  const program = new Command().name("setup cli");
  program.addCommand(Telegram);
  program.parse();
}

main();
