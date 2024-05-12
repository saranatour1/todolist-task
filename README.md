## Todo List Technical Task

### How to Use:

Ensure you have Node.js version > 18, Docker, and pnpm installed as your package manager.

**Steps:**

1. Clone this repository and navigate into the directory.
2. Add a .env file to packages/database and apps/web, and add the appropriate environmental variables there.
3. Run pnpm i followed by pnpm dev(insuring that the database is running), and ensure that the docker instance is running.
4. To migrate the database, navigate to packages/database and run the command pnpmx prisma migratre dev --name init.
5. Return to the root directory.
6. re-run pnpm dev.
7. Visit port 3000 in your browser to view the app. That's it!
