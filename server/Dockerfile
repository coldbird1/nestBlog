   # Use an official Node runtime as a parent image
   FROM node:16-alpine

   # Set the working directory in the container
   WORKDIR /usr/src/app

   # Copy package.json and package-lock.json
   COPY package*.json ./

   # Install dependencies
   RUN npm ci --only=production

   # Copy application files
   COPY . .

   # Expose port and run the app
   EXPOSE 3000
   CMD ["npm", "run", "start:prod"]