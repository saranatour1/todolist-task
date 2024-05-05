# Use the official lightweight Node.js 20 image.
# https://hub.docker.com/_/node
FROM node:20-slim AS dev

# Install pnpm
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml (or yarn.lock/package-lock.json) files first to leverage Docker cache
COPY package.json pnpm-lock.yaml* ./

# Install project dependencies
RUN pnpm install

# Copy the rest of your application's code
COPY . .

# Expose port 3000 to access server
EXPOSE 3000

# Command to run the development server
CMD ["pnpm", "dev"]