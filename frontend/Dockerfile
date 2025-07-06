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

# Copy a custom Nginx configuration file (optional)
# If you want Nginx to listen on a different port *inside* the container,
# you'll need a custom nginx.conf.
# For example, if you want Nginx to listen on 8080 internally:
# 1. Create an nginx.conf file with:
#    server {
#        listen 8080;
#        server_name localhost;
#        root /usr/share/nginx/html;
#        index index.html index.htm;
#        location / {
#            try_files $uri $uri/ /index.html;
#        }
#    }
# 2. Uncomment the following line:
COPY nginx.conf /etc/nginx/conf.d/default.conf
# 3. Make sure the EXPOSE instruction below matches the port Nginx listens on.
# By default, Nginx listens on port 80.

# Expose the desired port.
# Change this to the port you want your container to expose.
# For example, to use port 8080:
EXPOSE 80
# If you didn't provide a custom nginx.conf for Nginx to listen on 8080 internally,
# Nginx will still listen on port 80 inside the container.
# The EXPOSE instruction is documentation for which port the application *intends* to use.
# You will then map this container port to a host port when running the container.

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
