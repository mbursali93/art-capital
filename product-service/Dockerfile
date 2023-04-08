FROM node:19

WORKDIR /app/product-service

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 7002

CMD ["ts-node", "server.ts"]