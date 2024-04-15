FROM node:16-alpine as  development

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:16-alpine as staging

WORKDIR /app

COPY package*.json ./
COPY .env.example .env
RUN npm install --only=staging
RUN npm install -g sequelize-cli
COPY --from=development /app/database ./database

WORKDIR /app/database
RUN sequelize db:create --env development
RUN sequelize db:migrate --env development

WORKDIR /app
COPY --from=development /app/node_modules ./node_modules

COPY --from=development /app/build .

CMD ["node",  "./server/server.js"]
 
EXPOSE 80
