# Stage 1: Build the React application
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./
# If you are using yarn, uncomment the next line and comment out the npm install line
# COPY yarn.lock ./

# Install dependencies
# If you are using yarn, uncomment the next line and comment out the npm install line
# RUN yarn install --frozen-lockfile
RUN npm install

# Copy the .env file first
COPY .env ./

# Copy the rest of the application code
COPY . .

# Build the application
# The build command might differ based on your package.json scripts
RUN npm run build
# If you are using yarn, uncomment the next line and comment out the npm run build line
# RUN yarn build

# Stage 2: Serve the application using Nginx
FROM nginx:stable-alpine AS production

# Copy the build output from the build stage
# The source directory /app/dist might need to be adjusted
# if your Vite build output directory is different (e.g., /app/build)
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the environment script and make it executable
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

# Expose the desired port
EXPOSE 80

# Start Nginx when the container launches
CMD ["/bin/sh", "-c", "/docker-entrypoint.d/env.sh && nginx -g 'daemon off;'"]
