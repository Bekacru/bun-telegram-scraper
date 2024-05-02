# Bun Telegram Chat Live Scraper

This is a simple telegram chat scraper implementation using [Gram JS](https://gram.js.org/) and bun. You can listen to new message in a chat.

## Usage

1. Clone the repository
2. Install the dependencies: `bun install`
3. Get your API_ID and API_HASH from [Telegram](https://my.telegram.org/),
4. Change .env.example to .env and fill the API_ID and API_HASH.
5. Run the setup script to login: `bun setup login`
6. Copy the session string and paste it in .env
7. Run with watcher `bun dev`
8. Run without watcher `bun start`
