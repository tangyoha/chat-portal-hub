FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Install serve package globally
RUN npm install -g serve

# Expose port for direct node access
EXPOSE 3000

# Start the application in production mode
CMD ["serve", "-s", "dist", "-l", "3000"] 