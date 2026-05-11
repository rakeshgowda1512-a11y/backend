# Stage 1: Build the Frontend
FROM node:20-alpine as frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Setup the Backend & Final Image
FROM node:20-alpine
WORKDIR /app

# Copy Backend files
COPY backend/package*.json ./backend/
RUN cd backend && npm install --production

COPY backend/ ./backend/

# Copy built Frontend to Backend's public folder
COPY --from=frontend-build /app/frontend/dist ./backend/public

# Set Environment Variables
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Start the server
CMD ["node", "backend/server.js"]
