## Todo List Technical Task

### How to Use:

Ensure you have Node.js version > 18, Docker, and pnpm installed as your package manager.

**Steps:**

1. Clone this repository and navigate into the directory.
2. Add a `.env` file to `packages/database` and `apps/web`, and add the appropriate environmental variables there.
3. To migrate the database, navigate to `packages/database` and run the command `prisma migrate dev --name init`.
4. Run `pnpm i` followed by `pnpm dev`.
5. Visit port 3000 in your browser to view the app. That's it!
