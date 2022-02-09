FROM node:14.16.1 as build
WORKDIR /app

COPY ./client/package.json ./
RUN npm install
COPY ./client ./
RUN npm run build

FROM node:14.16.1
WORKDIR /app
COPY ./server /app
COPY --from=build /app/build /app/public


RUN npm install

EXPOSE 3001
ENTRYPOINT ["node", "index.js"]
