# Bun Telegram Realtime Scraper

This is a simple telegram chat scraper implementation using [Gram JS](https://gram.js.org/) and bun. Instead of being a one-time scraper, it actively listens to the chat in real-time. This can be useful if you need to continuously scrape information from telegram channels/groups for any purpose.

> Warning: If you're planning to use this for a production environment, please make sure to follow the telegram guidelines and respect the privacy of the users. And use your non primary account for this purpose.

## Usage

1. Clone the repository
2. Install the dependencies: `bun install`
3. Get your API_ID and API_HASH from [Telegram](https://my.telegram.org/),
4. Change .env.example to .env and fill the TELEGRAM_API_ID and TELEGRAM_API_HASH.
5. Run the setup script to login: `bun setup login`
6. Copy the session string and paste it in .env
7. Add list of chat ids or usernames in the chats array in index.ts.
8. Run with watcher `bun dev`
9. Run without watcher `bun start`
