FROM node:18
RUN npm install -g pnpm
COPY ./domain ./domain
COPY ./inventory-project-sofka .
RUN pnpm install /app
EXPOSE 3001
CMD ["pnpm", "run", "start-command:dev"]