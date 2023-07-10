FROM node:18-alpine

WORKDIR /var/www

COPY package.json ./

RUN npm install

COPY . .

ENV PORT=5000

CMD [ "node", "dist/main"]

