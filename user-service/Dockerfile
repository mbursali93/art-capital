FROM node:19

WORKDIR /app/user-service

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 7001

CMD ["npm", "run", "nodemon"]