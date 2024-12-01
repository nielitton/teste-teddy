FROM node:22.11.0

RUN npm i -g @nestjs/cli

COPY package*.json ./

RUN npm install

RUN npm run migration:run

COPY . .

RUN npm run build

EXPOSE 10000

CMD ["npm", "run", "start:prod"]
