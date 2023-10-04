FROM node:18
RUN npm install -g pnpm
COPY ./domain ./domain
COPY ./inventory-query .
RUN pnpm install /app
EXPOSE 3001
CMD ["pnpm", "run", "start-query:dev"]