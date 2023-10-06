FROM node:18
RUN npm install -g pnpm
COPY ./domain ./domain
COPY ./web-socket .
RUN pnpm install /app
EXPOSE 3003
CMD ["pnpm", "run", "start-socket:dev"]