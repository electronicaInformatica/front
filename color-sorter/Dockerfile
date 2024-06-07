# Build stage
FROM node:alpine AS build-stage

# Define the working directory in the container
WORKDIR /app

# Copy the necessary configuration files to install dependencies
COPY package.json package-lock.json ./

# Install the dependencies, including old peer dependencies if needed
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the application for production
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the build from the previous stage
COPY --from=build-stage /app/.next /usr/share/nginx/html

# Expose the port that nginx will use
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
